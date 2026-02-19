<?php
session_start();
require_once "../config/db.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $username = trim($_POST["username"] ?? '');
    $password = trim($_POST["password"] ?? '');

    if (empty($username) || empty($password)) {
        echo json_encode([
            "status" => "error",
            "message" => "Username and password are required."
        ]);
        exit();
    }

    $sql = "SELECT id, username, password FROM users WHERE username = :username";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":username", $username, PDO::PARAM_STR);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user["password"])) {

        $_SESSION["loggedin"] = true;
        $_SESSION["id"] = $user["id"];
        $_SESSION["username"] = $user["username"];

        echo json_encode([
            "status" => "success"
        ]);
        exit();
    } else {

        echo json_encode([
            "status" => "error",
            "message" => "Invalid username or password."
        ]);
        exit();
    }
}
