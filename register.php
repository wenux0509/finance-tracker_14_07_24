<?php
// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
}

// Respond to preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = ""; // Password for your MySQL database
$dbname = "expensedb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Decode JSON input from Angular
$input = json_decode(file_get_contents('php://input'), true);

// Check if username, password, and secretnum are provided
if(isset($input['username']) && isset($input['password']) && isset($input['secretnum'])) {
    $username = $input['username'];
    $password = $input['password'];
    $secretnum = $input['secretnum'];

    // Check if username already exists
    $check_username = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $check_username->bind_param("s", $username);
    $check_username->execute();
    $result = $check_username->get_result();

    if($result->num_rows > 0) {
        // Username already exists
        echo json_encode(array('success' => false, 'error' => 'Username already exists.'));
    } else {
        // Hash the password (recommended for security)
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Prepare SQL statement to insert user data
        $insert_user = $conn->prepare("INSERT INTO users (username, password, secretnum) VALUES (?, ?, ?)");
        $insert_user->bind_param("ssi", $username, $hashed_password, $secretnum);

        // Execute SQL statement
        if ($insert_user->execute() === TRUE) {
            // Registration successful
            echo json_encode(array('success' => true));
        } else {
            // Registration failed
            echo json_encode(array('success' => false, 'error' => $conn->error));
        }

        $insert_user->close();
    }

    $check_username->close();
} else {
    // Invalid request
    echo json_encode(array('success' => false, 'error' => 'Username, password, and secret number are required fields.'));
}

// Close database connection
$conn->close();
?>
