<?php
$fullname = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = $_POST["fullname"] ?? '';
}
?>

<h2>Register</h2>
<form action="" method="post">
    <label for="fullname">Full Name:</label>
    <input type="text" name="fullname" id="fullname" placeholder="Enter full name"><br>

    <label for="username">Username:</label>
    <input type="text" name="username" id="username" placeholder="Enter username"><br>

    <label for="password">Password:</label>
    <input type="password" name="password" id="password" placeholder="Enter password"><br>

    <button type="submit">Submit</button>
</form>

<?php
if (!empty($fullname)) {
    echo "<p>Hello, " . htmlspecialchars($fullname) . "</p>";
}
?>