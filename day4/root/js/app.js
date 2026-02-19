$(document).ready(function () {
  var templateData = {
    name: "Jonny",
  };
  $.Mustache.options.warnOnMissingTemplates = true;
  $.Mustache.load("./template/template.html").done(function () {
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
          url: "/RICO_AVASIA_SYLLABUS/day4/api/function/updateProfile.php",
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

      $.getJSON(
        "/RICO_AVASIA_SYLLABUS/day4/api/function/logout.php",
        function (res) {
          if (res.status === "success") {
            window.location.hash = "#/login";
          }
        },
      );
    });

    function renderLayout() {
      $("#canvas").html($.Mustache.render("layout"));
    }
    function clearPanel() {
      // You can put some code in here to do fancy DOM transitions, such as fade-out or slide-in.
    }

    Path.map("#/login").to(function () {
      $("#canvas").html($.Mustache.render("login-page", templateData));
      alert("Login!");
      $("#login-form").on("submit", function (e) {
        e.preventDefault();

        $.ajax({
          url: "/RICO_AVASIA_SYLLABUS/day4/api/function/login.php",
          type: "POST",
          data: {
            username: this.username.value.trim(),
            password: this.password.value,
          },
          success: function (response) {
            if (response.status === "success") {
              window.location.hash = "#/home";
            } else {
              alert(response.message);
            }
          },
          error: function (error) {
            console.log(error);
          },
        });
      });
    });

    Path.map("#/signup")
      .to(function () {
        $("#canvas").html($.Mustache.render("sign-up-page", templateData));
        alert("signup!");
        $("#sign-up-form").on("submit", function (e) {
          e.preventDefault();
          const formData = new FormData(this);

          $.ajax({
            url: "/RICO_AVASIA_SYLLABUS/day4/api/function/signup.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
              console.log(response);
              window.location.href = "#/login";
            },
            error: function (error) {
              console.log(error);
            },
          });
        });
      })
      .enter(clearPanel);

    Path.map("#/home")
      .to(function () {
        $.getJSON(
          "/RICO_AVASIA_SYLLABUS/day4/api/function/home.php",
          function (res) {
            if (res.status !== "success") {
              window.location.hash = "#/login";
              return;
            }

            renderLayout();

            $("#page-content").html(
              $.Mustache.render("home-page", templateData),
            );
            alert("Home!");
          },
        );
      })
      .enter(clearPanel);

    Path.map("#/profile")
      .to(function () {
        $.getJSON(
          "/RICO_AVASIA_SYLLABUS/day4/api/function/getProfile.php",
          function (data) {
            if (data.status === "error") {
              window.location.hash = "#/login";
              return;
            }

            renderLayout();

            $("#page-content").html($.Mustache.render("profile", data));
          },
        );
      })
      .enter(clearPanel);

    Path.root("#/login");

    Path.listen();
  });
});
