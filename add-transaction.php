<?php
// Allow from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Respond to preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = ""; // Replace with your database password
$dbname = "expensedb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Decode JSON input from Angular
$input = json_decode(file_get_contents('php://input'), true);

// Check if all required fields are provided
if(isset($input['amount']) && isset($input['category']) && isset($input['date']) && isset($input['user_id'])) {
    $amount = $input['amount'];
    $category = $input['category'];
    $date = $input['date'];
    $notes = isset($input['notes']) ? $input['notes'] : null;
    $location = isset($input['location']) ? $input['location'] : null;
    $user_id = $input['user_id'];

    // Prepare SQL statement to insert transaction data
    $stmt = $conn->prepare("INSERT INTO transactions (amount, category, date, notes, location, user_id) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("issssi", $amount, $category, $date, $notes, $location, $user_id);

    if ($stmt->execute()) {
        // Insert successful
        echo json_encode(array('success' => true));
    } else {
        // Insert failed
        echo json_encode(array('success' => false, 'error' => 'Insert failed: ' . $stmt->error));
    }

    $stmt->close();
} else {
    // Invalid request: missing required fields
    echo json_encode(array('success' => false, 'error' => 'Missing required fields.'));
}

// Close database connection
$conn->close();
?>











