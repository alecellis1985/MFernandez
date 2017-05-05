<?php
if($_POST)
{
	$to_Email   	= "ventas@ruffinogroup.com.uy, ventas@emin.com.uy, info@emin.com.uy";
	$subject        = 'Mensaje desde sitio web eMin';


	//chqueo si esl formulario se llamo por ajax
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest')
    {

		$output = json_encode(
		array(
			'type'=>'error',
			'text' => 'Error al procesar formulario de contacto'
        ));

		die($output);
    }

	if(!isset($_POST["userName"]) || !isset($_POST["userEmail"]) || !isset($_POST["userMessage"]))
	{
		$output = json_encode(
            array(
                'type'=>'error',
                'text' => 'Todos los campos son obligatorios'
            ));
		die($output);
	}

	$user_Name        = filter_var($_POST["userName"], FILTER_SANITIZE_STRING);
	$user_Email       = filter_var($_POST["userEmail"], FILTER_SANITIZE_EMAIL);
	$user_Message     = filter_var($_POST["userMessage"], FILTER_SANITIZE_STRING);
	$tel     =  $_POST["tel"];

	$user_Message = str_replace("\&#39;", "'", $user_Message);
	$user_Message = str_replace("&#39;", "'", $user_Message);

	if(!filter_var($user_Email, FILTER_VALIDATE_EMAIL))
	{
		$output = json_encode(array('type'=>'error', 'text' => 'Ingrese un email válido'));
		die($output);
	}

	//Enviar correo.
	$headers = 'From: '.$user_Email.'' . "\r\n" .
	'Reply-To: '.$user_Email.'' . "\r\n" .
	'X-Mailer: PHP/' . phpversion();

	$sentMail = @mail($to_Email, $subject, 'Nombre: '.$user_Name. "\r\n\n" .'Email: '.$user_Email. "\r\n\n".'Tel.: '.$tel. "\r\n\n" .'Mensaje:'. "\n" .$user_Message, $headers);

	if(!$sentMail)
	{
		$output = json_encode(array('type'=>'error', 'text' => 'Problemas con el servidor de correo, intente enviar el mensaje más tarde'));
		die($output);
	}else{
		$output = json_encode(array('type'=>'message', 'text' => 'Tu mensaje se envió correctamente '.$user_Name .', gracias por comunicarte'));
		die($output);
	}
}
?>
