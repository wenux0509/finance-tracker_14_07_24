<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "expensedb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["profile_image" => null, "error" => "Connection failed: " . $conn->connect_error]));
}

$user_id = $_GET['user_id'];

$sql = "SELECT profile_image FROM user_profile WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->bind_result($profile_image);

if ($stmt->fetch()) {
    echo json_encode(["profile_image" => base64_encode($profile_image)]);
} else {
    echo json_encode(["profile_image" => null, "error" => "Profile image not found."]);
}

$stmt->close();
$conn->close();
?>





