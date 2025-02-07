<?php
// server/phpApi.php
$to = "user@example.com";
$subject = "Test Email";
$message = "This is a test email from the PHP server.";
$headers = "From: webmaster@example.com";

if(mail($to, $subject, $message, $headers)) {
    echo json_encode(["success" => true, "message" => "Email sent successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error sending email"]);
}
?>

