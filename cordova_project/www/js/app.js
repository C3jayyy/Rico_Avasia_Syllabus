$(document).ready(function () {
  var templateData = {
    name: "Jonny",
  };
  $.Mustache.options.warnOnMissingTemplates = true;
  $.Mustache.load("./template/template.html").done(function () {
    let currentUser = JSON.parse(localStorage.getItem("user"));
    const API_BASE =
      "http://192.168.254.181/RICO_AVASIA_SYLLABUS/day4/api/auth/";

    function updateActiveNav() {
      const currentHash = window.location.hash;

      $(".nav-link").removeClass("active");

      $('.nav-link[href="' + currentHash + '"]').addClass("active");
    }

    $(window).on("hashchange", function () {
      updateActiveNav();
    });

    function smoothScrollTo(section) {
      const target = $("#" + section);

      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 70,
          },
          800,
        );
      }
    }

    $(document).on("click", "a[data-scroll]", function (e) {
      e.preventDefault();

      const targetSection = $(this).data("scroll");

      $(".navbar-collapse").collapse("hide");

      if (window.location.hash !== "#/home") {
        pendingScroll = targetSection;
        window.location.hash = "#/home";
      } else {
        smoothScrollTo(targetSection);
      }
    });
    $(document).on("click", ".nav-link", function () {
      $(".navbar-collapse").collapse("hide");
    });
    $(document).on("click", "a", function (e) {
      if (this.hash !== "" && !this.hash.startsWith("#/")) {
        e.preventDefault();

        var hash = this.hash;
        $("html, body").animate(
          {
            scrollTop: $(hash).offset().top,
          },
          800,
          function () {
            window.location.hash = hash;
          },
        );
      }
    });

    $(document).on("click", "#update-btn", function () {
      const isEditing = $(this).text().trim() === "Save Changes";

      if (!isEditing) {
        $("#edit-fullname, #edit-nickname, #edit-birthday, #edit-contact").prop(
          "disabled",
          false,
        );

        $(this).text("Save Changes");
      } else {
        $.ajax({
          url: API_BASE + "update",
          type: "POST",
          dataType: "json",
          data: {
            full_name: $("#edit-fullname").val(),
            nick_name: $("#edit-nickname").val(),
            birthday: $("#edit-birthday").val(),
            contact_number: $("#edit-contact").val(),
          },
          success: function (res) {
            if (res.status === "success") {
              alert("Profile updated!");

              $(
                "#edit-fullname, #edit-nickname, #edit-birthday, #edit-contact",
              ).prop("disabled", true);
              $("#update-btn").text("Edit Profile");
            } else {
              alert("Update failed!");
            }
          },
        });
      }
    });

    $(document).on("click", "#logout-btn", function (e) {
      e.preventDefault();

      $.ajax({
        url: API_BASE + "logout",
        type: "POST",
        dataType: "json",
        xhrFields: {
          withCredentials: true,
        },
        success: function (res) {
          if (res.status === "success") {
            currentUser = null;
            localStorage.removeItem("user");
            window.location.hash = "#/login";
          } else {
            alert("Logout failed.");
          }
        },
        error: function (xhr) {
          alert("Status: " + xhr.status);
          alert("Response: " + xhr.responseText);
        },
      });
    });

    function renderLayout() {
      $("#canvas").html($.Mustache.render("layout"));
    }
    function clearPanel() {
      // You can put some code in here to do fancy DOM transitions, such as fade-out or slide-in.
    }

    Path.map("#/login").to(function () {
      $("#canvas").html($.Mustache.render("login-page", templateData));

      $("#login-form").off("submit");

      $("#login-form").on("submit", function (e) {
        e.preventDefault();

        $.ajax({
          url: API_BASE + "login",
          type: "POST",
          dataType: "json",
          xhrFields: {
            withCredentials: true,
          },
          data: {
            username: $("#username").val().trim(),
            password: $("#password").val(),
          },
          success: function (response) {
            console.log("LOGIN SUCCESS:", response);
            alert("SUCCESS CALLBACK");

            if (response.status === "success") {
              currentUser = response.user;
              localStorage.setItem("user", JSON.stringify(currentUser));
              window.location.hash = "#/home";
            } else {
              alert("Login failed: " + response.message);
            }
          },
          error: function (xhr, status, error) {
            console.log("LOGIN ERROR:", xhr.responseText);
            alert("ERROR CALLBACK");
          },
        });
      });
    });

    Path.map("#/signup")
      .to(function () {
        $("#canvas").html($.Mustache.render("sign-up-page", templateData));
        $("#sign-up-form")
          .off("submit")
          .on("submit", function (e) {
            e.preventDefault();
            const formData = new FormData(this);

            $.ajax({
              url: API_BASE + "signup",
              type: "POST",
              data: formData,
              dataType: "json",
              xhrFields: {
                withCredentials: true,
              },
              processData: false,
              contentType: false,
              success: function (response) {
                if (response.status === "success") {
                  window.location.hash = "#/login";
                } else {
                  alert(response.message);
                }
              },
              error: function (error) {
                console.log(error);
              },
            });
          });
      })
      .enter(clearPanel);

    Path.map("#/home").to(function () {
      $.ajax({
        url: API_BASE + "check",
        type: "GET",
        dataType: "json",
        xhrFields: {
          withCredentials: true,
        },
        beforeSend: function () {
          $("#canvas").html("<p>Loading...</p>");
        },
        success: function (res) {
          if (res.status !== "success") {
            window.location.hash = "#/login";
            return;
          }

          // Always update user from server
          currentUser = res.user;
          localStorage.setItem("user", JSON.stringify(currentUser));

          renderLayout();

          $("#page-content").html(
            $.Mustache.render("home-page", {
              user: currentUser,
            }),
          );
        },
        error: function () {
          window.location.hash = "#/login";
        },
      });
    });

    Path.map("#/profile")
      .to(function () {
        $.ajax({
          url: API_BASE + "get",
          type: "GET",
          dataType: "json",
          xhrFields: {
            withCredentials: true,
          },
          beforeSend: function () {
            $("#canvas").html("<p>Loading Profile...</p<");
          },
          success: function (data) {
            if (data.status === "error") {
              window.location.hash = "#/login";
              return;
            }

            renderLayout();
            $("#page-content").html($.Mustache.render("profile", data));
          },
          error: function (xhr) {
            console.error(xhr.responseText);
            window.location.hash = "#/login";
          },
        });
      })
      .enter(clearPanel);

    if (currentUser) {
      Path.root("#/home");
    } else {
      Path.root("#/login");
    }

    Path.listen();
  });
});
