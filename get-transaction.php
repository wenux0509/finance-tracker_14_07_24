<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = ""; // Password for your MySQL database
$dbname = "expensedb";

// Get user_id from query parameter
$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;

// Validate user_id (optional)
if ($user_id === 0) {
    echo json_encode(array('success' => false, 'error' => 'Invalid user ID'));
    exit;
}

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Construct SQL query with user_id
$sql = "SELECT * FROM transactions WHERE user_id = $user_id";
$result = $conn->query($sql);

// Check if query was successful
if ($result === false) {
    echo json_encode(array('success' => false, 'error' => 'Query error: ' . $conn->error));
    exit;
}

// Fetch results into an array
$transactions = [];
while ($row = $result->fetch_assoc()) {
    $transactions[] = $row;
}

// Close connection
$conn->close();

// Return JSON response
echo json_encode($transactions);
?>









