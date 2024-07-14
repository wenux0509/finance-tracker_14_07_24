<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "expensedb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Connection failed: " . $conn->connect_error]));
}

$user_id = $_POST['user_id'];
$image = $_POST['image'];

// Convert base64 to binary data
$image_data = base64_decode($image);

$sql = "DELETE FROM user_profile WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();

$sql = "INSERT INTO user_profile (user_id, profile_image) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ib", $user_id, $null);
$stmt->send_long_data(1, $image_data);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => "Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>





