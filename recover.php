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

// Check if username, secret number, and new password are provided
if(isset($input['username']) && isset($input['secretnum']) && isset($input['newPassword'])) {
    $username = $input['username'];
    $secretnum = $input['secretnum'];
    $newPassword = $input['newPassword'];

    // Validate input fields
    if(empty($username) || empty($secretnum) || empty($newPassword)) {
        echo json_encode(array('success' => false, 'error' => 'Username, secret number, and new password are required fields.'));
        exit();
    }

    // Ensure secret number is exactly 4 digits
    if(strlen($secretnum) !== 4) {
        echo json_encode(array('success' => false, 'error' => 'Secret number must be 4 digits.'));
        exit();
    }

    // Prepare SQL statement to select user data
    $check_user = $conn->prepare("SELECT * FROM users WHERE username = ? AND secretnum = ?");
    $check_user->bind_param("si", $username, $secretnum);
    $check_user->execute();
    $result = $check_user->get_result();

    if($result->num_rows > 0) {
        // User exists, proceed to update password
        $hashed_newPassword = password_hash($newPassword, PASSWORD_DEFAULT);

        // Prepare SQL statement to update password
        $update_password = $conn->prepare("UPDATE users SET password = ? WHERE username = ?");
        $update_password->bind_param("ss", $hashed_newPassword, $username);

        // Execute SQL statement
        if ($update_password->execute() === TRUE) {
            // Password update successful
            echo json_encode(array('success' => true));
        } else {
            // Password update failed
            echo json_encode(array('success' => false, 'error' => $conn->error));
        }

        $update_password->close();
    } else {
        // User not found or secret number incorrect
        echo json_encode(array('success' => false, 'error' => 'Invalid username or secret number.'));
    }

    $check_user->close();
} else {
    // Invalid request
    echo json_encode(array('success' => false, 'error' => 'Username, secret number, and new password are required fields.'));
}

// Close database connection
$conn->close();
?>


