<?php 
	header("Access-Control-Allow-Origin: *");
	// Permite la ejecucion de los metodos
	header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); 
	
	switch ($_SERVER['REQUEST_METHOD']) {

		case 'GET':
			$directorio = opendir("./upload"); //ruta actual

			$contador = 0;

			while ($archivo = readdir($directorio)) //obtenemos un archivo y luego otro sucesivamente
			{
			    if (!is_dir($archivo))//verificamos si es o no un directorio
			    {
			        $listado[$contador] = $archivo;
			    }
			  $contador++;
			}


			

			$listado = array_values($listado);

			if(count($listado)!=0) {
				print_json(200, true, $listado);
			} else {
				print_json(200, "No existen elementos", null);
			}

			break;
		case 'POST':
				$content = file_get_contents("php://input");

				$array = json_decode($content, true);


				$validar = validate($array['encodedImage']);

				if($validar==1) {
					$imagen = save_base64_image($array['encodedImage'], "upload/IMG_" . strtoupper(md5($array['encodedImage'])));

					if($imagen!=null) {
						print_json(200, "Completado", $imagen);

					} else {
						print_json(200, "Este archivo ya existe", null);
					}
				} else {
					print_json(200, "Extension invalida", null);
				}

				
				
			break;
		default:
			print_json(405, 'Metodo no permitido', null);
			break;
	}

	function validate($string_base64) {
		$array = explode(",", $string_base64);
		if( ($array[0] == "data:image/jpeg;base64") || ($array[0] == "data:image/gif;base64") || ($array[0] == "data:image/png;base64") ) {
			return 1;
		} else {
			return 0;
		}
	}
	



	function save_base64_image($base64_image_string, $output_file_without_extentnion, $path_with_end_slash="" ) {
	    //usage:  if( substr( $img_src, 0, 5 ) === "data:" ) {  $filename=save_base64_image($base64_image_string, $output_file_without_extentnion, getcwd() . "/application/assets/pins/$user_id/"); }      
	    //
	    //data is like:    data:image/png;base64,asdfasdfasdf
	    $splited = explode(',', substr( $base64_image_string , 5 ) , 2);
	    $mime=$splited[0];
	    $data=$splited[1];

	    $mime_split_without_base64=explode(';', $mime,2);
	    $mime_split=explode('/', $mime_split_without_base64[0],2);
	    if(count($mime_split)==2)
	    {
	        $extension=$mime_split[1];
	        if($extension=='jpeg')$extension='jpg';
	        //if($extension=='javascript')$extension='js';
	        //if($extension=='text')$extension='txt';
	        $output_file_with_extentnion.=$output_file_without_extentnion.'.'.$extension;
	    }

	    if(file_exists($output_file_with_extentnion)) {
	    	return null;
	    } else {
	    	file_put_contents( $path_with_end_slash . $output_file_with_extentnion, base64_decode($data) );
	    	return $output_file_with_extentnion;
	    }
	    
	    
	}

	function print_json($status, $mensaje, $data) {
		header("HTTP/1.1 $status $mensaje");
		header("Content-Type: application/json; charset=UTF-8");

		$response['statusCode'] = $status;
		$response['statusMessage'] = $mensaje;
		$response['data'] = $data;

		echo json_encode($response, JSON_PRETTY_PRINT);
	}


?>