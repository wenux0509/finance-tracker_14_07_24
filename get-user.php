<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");

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

// Check if user_id is provided
if (isset($_GET['user_id'])) {
  $user_id = $_GET['user_id'];

  // Prepare SQL statement to fetch username
  $stmt = $conn->prepare("SELECT username FROM users WHERE id = ?");
  $stmt->bind_param("i", $user_id);
  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode(array('username' => $row['username']));
  } else {
    echo json_encode(array('username' => ''));
  }

  $stmt->close();
} else {
  echo json_encode(array('error' => 'user_id parameter is required'));
}

$conn->close();
?>
