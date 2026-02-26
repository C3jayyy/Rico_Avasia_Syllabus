<?php

use Psr\Http\Message\ResponseInterface as Response;
use PSR\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . "/vendor/autoload.php";

session_start();

$app = AppFactory::create();

$app->setBasePath('/RICO_AVASIA_SYLLABUS/day4/api');

$app->addBodyParsingMiddleware();
$app->addRoutingMiddleware();

$app->options('/{routes:.+}', function ($request, $response) {
    return $response;
});

$app->add(function ($request, $handler) {

    $origin = $request->getHeaderLine('Origin');
    $response = $handler->handle($request);

    if ($origin) {
        $response = $response->withHeader('Access-Control-Allow-Origin', $origin);
    }

    return $response
        ->withHeader('Access-Control-Allow-Headers', 'Content-Type')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        ->withHeader('Access-Control-Allow-Credentials', 'true');
});

$app->addErrorMiddleware(true, true, true);

$pdo = new PDO("mysql:host=localhost;dbname=carljaysonrico", "root", "");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$app->get('/', function ($request, $response) {
    $response->getBody()->write("Slim is working!");
    return $response;
});

$app->post('/auth/login', function (Request $request, Response $response) use ($pdo) {

    $data = $request->getParsedBody();

    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';

    $stmt = $pdo->prepare("SELECT id, username, password FROM users WHERE username = ?");
    $stmt->execute([$username]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['id'] = $user['id'];

        unset($user['password']);

        $payload = [
            "status" => "success",
            "message" => "Login Successfully",
            "user" => $user
        ];
    } else {
        $payload = [
            "status" => "error",
            "message" => "Incorrect username or password"
        ];
    }
    error_log("LOGIN SESSION ID: " . session_id());
    $response->getBody()->write(json_encode($payload));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->post('/auth/signup', function (Request $request, Response $response) use ($pdo) {

    $data = $request->getParsedBody();

    $fieldMap = [
        'fullname' => 'full_name',
        'nickname' => 'nick_name',
        'email'    => 'email',
        'username' => 'username',
        'address'  => 'address',
        'birthday' => 'birthday',
        'contact'  => 'contact_number'
    ];

    $cleanData = [];

    foreach ($fieldMap as $formKey => $dbColumn) {
        $cleanData[$formKey] = isset($data[$formKey])
            ? trim($data[$formKey])
            : '';
    }

    $requiredFields = ['username', 'email', 'password'];
    $missingFields = [];

    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            $missingFields[] = $field;
        }
    }

    if (!empty($missingFields)) {
        $payload = [
            "status" => "error",
            "message" => "Missing required fields",
            "fields" => $missingFields
        ];

        $response->getBody()->write(json_encode($payload));
        return $response->withHeader('Content-Type', 'application/json');
    }

    if (!filter_var($cleanData['email'], FILTER_VALIDATE_EMAIL)) {
        $payload = [
            "status" => "error",
            "message" => "Invalid email format"
        ];

        $response->getBody()->write(json_encode($payload));
        return $response->withHeader('Content-Type', 'application/json');
    }

    try {

        $columns = [];
        $placeholders = [];
        $values = [];

        foreach ($fieldMap as $formKey => $dbColumn) {

            if ($cleanData[$formKey] !== '') {

                $columns[] = $dbColumn;
                $placeholders[] = '?';
                $values[] = $cleanData[$formKey];
            }
        }

        $hashedPassword = password_hash(trim($data['password']), PASSWORD_DEFAULT);

        $columns[] = 'password';
        $placeholders[] = '?';
        $values[] = $hashedPassword;

        $sql = "INSERT INTO users (" . implode(', ', $columns) . ")
                VALUES (" . implode(', ', $placeholders) . ")";

        $stmt = $pdo->prepare($sql);
        $stmt->execute($values);

        $payload = [
            "status" => "success",
            "message" => "User registered successfully"
        ];
    } catch (PDOException $e) {

        if ($e->getCode() == 23000) {
            $payload = [
                "status" => "error",
                "message" => "Email or username already used"
            ];
        } else {
            $payload = [
                "status" => "error",
                "message" => "Server error"
            ];
        }
    }

    $response->getBody()->write(json_encode($payload));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->get('/auth/get', function (Request $request, Response $response) use ($pdo) {
    if (empty($_SESSION['id'])) {
        $payload = [
            "status" => "error",
            "message" => "Unathorized"
        ];

        $response->getBody()->write(json_encode($payload));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $stmt = $pdo->prepare("SELECT full_name, nick_name, username, birthday, email, contact_number FROM users WHERE id = ?");

    $stmt->execute([$_SESSION['id']]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user === false) {
        $payload = [
            "status" => "error",
            "data" => $user
        ];

        $response->getBody()->write(json_encode($payload));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $response->getBody()->write(json_encode($user));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->get('/auth/check', function (Request $request, Response $response) use ($pdo) {
    if (!isset($_SESSION['id'])) {
        $payload = [
            "status" => "error",
            "message" => "Unauthenticated"
        ];
        $response->getBody()->write(json_encode($payload));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $stmt = $pdo->prepare("SELECT id, username, full_name FROM users WHERE id = ?");
    $stmt->execute([$_SESSION['id']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        $payload = [
            "status" => "error",
            "message" => "User not found"
        ];

        $response->getBody()->write(json_encode($payload));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $payload = [
        "status" => "success",
        "user" => $user
    ];

    error_log("CHECK SESSION ID: " . session_id());
    error_log("CHECK SESSION VALUE: " . ($_SESSION['id'] ?? 'NOT SET'));
    $response->getBody()->write(json_encode($payload));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->post('/auth/logout', function (Request $request, Response $response) {

    $_SESSION = [];
    session_unset();
    session_destroy();

    $payload = [
        "status" => "success",
    ];

    $response->getBody()->write(json_encode($payload));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->post('/auth/update', function (Request $request, Response $response) use ($pdo) {
    if (!isset($_SESSION['id'])) {
        $payload = [
            "status" => "error",
            "message" => "Unathorize"
        ];

        $response->getBody()->write(json_encode($payload));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $data = $request->getParsedBody();

    $fieldMap = [
        'full_name' => 'full_name',
        'nick_name' => 'nick_name',
        'birthday' => 'birthday',
        'contact_number' => 'contact_number'
    ];

    $setParts = [];
    $values = [];

    foreach ($fieldMap as $formKey => $dbColumn) {
        if (isset($data[$formKey]) && trim($data[$formKey]) !== '') {

            $setParts[] = "$dbColumn = ?";
            $values[] = trim($data[$formKey]);
        }
    }

    if (empty($setParts)) {
        $payload = [
            "status" => "error",
            "message" => "No valid fields to update"
        ];
        $response->getBody()->write(json_encode($payload));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $values[] = $_SESSION['id'];

    $sql = "UPDATE users SET " . implode(', ', $setParts) . " WHERE id =?";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($values);

    $payload = [
        "status" => "success",
        "message" => "Profile updated"
    ];

    $response->getBody()->write(json_encode($payload));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->run();
