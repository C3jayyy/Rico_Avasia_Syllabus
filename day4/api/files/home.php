<?php
session_start();
header("Content-Type: application/json");

if (!isset($_SESSION["id"])) {
    echo json_encode([
        "status" => "error",
        "message" => "Not authenticated"
    ]);
    exit();
}

echo json_encode([
    "status" => "success"
]);
