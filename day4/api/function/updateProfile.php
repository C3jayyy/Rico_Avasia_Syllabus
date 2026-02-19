<?php

session_start();
require_once "../config/db.php";
header("Content-Type: application/json");

if (!isset($_SESSION["id"])) {
    echo json_encode(["status" => "error"]);
    exit();
}

$full_name = $_POST["full_name"] ?? '';
$nick_name = $_POST["nick_name"] ?? '';
$birthday = $_POST["birthday"] ?? '';
$contact_number = $_POST["contact_number"] ?? '';

$stmt = $conn->prepare("UPDATE users SET full_name = ?, nick_name = ?, birthday = ?, contact_number = ? WHERE id = ?");

$stmt->execute([
    $full_name,
    $nick_name,
    $birthday,
    $contact_number,
    $_SESSION["id"]
]);

echo json_encode(["status" => "success"]);
