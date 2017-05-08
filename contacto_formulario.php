<?php

$user_Name = filter_var($_POST["userName"], FILTER_SANITIZE_STRING);
$user_Email = filter_var($_POST["userEmail"], FILTER_SANITIZE_EMAIL);
$user_Message = filter_var($_POST["userMessage"], FILTER_SANITIZE_STRING);
$tel = $_POST["tel"];

if (isset($user_Name) && !empty($user_Name) &&
        isset($user_Email) && !empty($user_Email) &&
        isset($user_Message) && !empty($user_Message) &&
        isset($tel) && !empty($tel)) {
  if (!filter_var($user_Email, FILTER_VALIDATE_EMAIL)) {
    $output = json_encode(array('type' => 'error', 'text' => 'Ingrese un email válido'));
    die($output);
  }

  $messageBody = "";
  $messageBody .= "<p>Nombre: " . $user_Name . "</p>" . "\r\n";
  $messageBody .= "<p>Telefono: " . $tel . "</p>" . "\r\n";
  $messageBody .= "<br>" . "\r\n";
  $messageBody .= "<p>Email: " . $user_Email . "</p>" . "\r\n";
  $messageBody .= "<br>" . "\r\n";
  $messageBody .= "<p>Mensaje: " . $user_Message . "</p>" . "\r\n";
  $messageBody .= "<br>" . "\r\n";
  $messageBody = strip_tags($messageBody);

  $to = "ventas@ruffinogroup.com.uy, ventas@emin.com.uy, info@emin.com.uy";
  $subject = "Mensaje desde sitio web eMin";
  $headers = "From:" . $user_Email . "\r\n";
  $sent = mail($to, $subject, $messageBody, $headers);

  if ($sent) {
    die(json_encode(array('type' => 'message', 'text' => 'Tu mensaje se envió correctamente ' . $user_Name . ', gracias por comunicarte')));
  } else {
    error_log($subject . "\r\n\n mensaje:" . $messageBody . "\r\n\n From" . $user_Email . "\r\n\nErrorMsg:" . error_get_last());
    die(json_encode(array('type' => 'message', 'text' => 'Tu mensaje no se envió correctamente ' . $user_Name . ', intenta mas tarde o comunicate a ventas@ruffinogroup.com.uy')));
  }
} else {
  die(json_encode(
                  array(
                      'type' => 'error',
                      'text' => 'Todos los campos son obligatorios'
  )));
}
