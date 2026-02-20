<?php
session_start();
require_once "../config/db.php";

header("Content-Type: application/json");

if(!isset($_SESSION["id"])) {
    echo json_encode(["status" => "error"]);
    exit();
}

$stmt = $conn->prepare("SELECT full_name, nick_name, username, birthday, email, contact_number FROM users WHERE id = ?");
$stmt->execute([$_SESSION["id"]]);

$user = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($user);
