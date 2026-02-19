<?php
require_once "config/db.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $fullname = $_POST['fullname'] ?? '';
    $nickname = $_POST['nickname'] ?? '';
    $email = $_POST['email'] ?? '';
    $username = $_POST['username'] ?? '';
    $address = $_POST['address'] ?? '';
    $birthday = $_POST['birthday'] ?? '';
    $contact = $_POST['contact'] ?? '';
    $password = $_POST['password'] ?? '';
    $hashesPassword = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (full_name, nick_name, email, username, address, birthday, contact_number, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);

    try {
        $stmt->execute([
            $fullname,
            $nickname,
            $email,
            $username,
            $address,
            $birthday,
            $contact,
            $hashesPassword
        ]);
        echo "User registered successfully";
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) {
            echo "Email or Username already exists";
        } else {
            echo "Error: " . $e->getMessage();
        }
    }
    $stmt->closeCursor();
} else {
    echo "One or more fields are empty.";
    var_dump($_POST);
}
