		var app = angular.module('crud',[]);


		// Controlador principal de nuestra pagina
		app.controller('mainCtrl', function($scope,$http) {
			$scope.dominio = "http://localhost/imagenes/";
	        $scope.message = 'Ejemplo';
	        $scope.subtitle = "Subir una imagen haciendo uso de API REST";

	        $scope.imageJSON = {};

	        $scope.enlaces = {};

	        angular.element(document).ready(function () {
		   		$scope.get(); 	
		    });

	        // La funcion post() que hace la solicitud para publicar un nuevo elemento
		    $scope.post = function() {
		    	$http.post("server.php", $scope.imageJSON)
			    	.then(function (response){
			            console.log(response);
			            Materialize.toast(response.data.statusMessage, 4000);


			            if(response.data.data != null) {
			            	$scope.cargarImagen(response.data.data);
			            } 

			            $scope.get();
			        }, 
			        function(response) {
			        	// Aqui va el codigo en caso de error
			        });
		    }

		    $scope.get = function() {
		    	$http.get("server.php")
			    	.then(function (response){
			            console.log(response);
			            $scope.imagenes = response.data.data;

			            
			        }, 
			        function(response) {
			        	// Aqui va el codigo en caso de error
			        });
		    }

		    $scope.cargarImagen = function(ruta) {


		    	var container = document.getElementById('imgTest');
		    	var newImage = document.getElementById('imagen');
		        newImage.src = ruta;
		        container.style.width = 'auto';
		        container.style.height = 'auto'

		        container.innerHTML = newImage.outerHTML;

		      	$scope.enlaces.link = $scope.dominio + ruta;
		      	$scope.enlaces.html = "<a href='"+ $scope.dominio + ruta +"'>"+$scope.dominio + ruta+"</a>";
		      	$scope.enlaces.foros = "[IMG]"+$scope.dominio + ruta+"[/IMG]"
		    }


	        $scope.encodeImageFileAsURL = function() {

			    var filesSelected = document.getElementById("inputFileToLoad").files;

			    if (filesSelected.length > 0) {
			      var fileToLoad = filesSelected[0];

			      var fileReader = new FileReader();

			      fileReader.onload = function(fileLoadedEvent) {
			      	
			        var srcData = fileLoadedEvent.target.result; // <--- data: base64
			 		$scope.imageJSON.encodedImage = srcData;


			 		$scope.post();
			      }
			      fileReader.readAsDataURL(fileToLoad);
			    }
			  }



	    });

	 



		// // Controlador de la entidad Usuario donde se incluiran cada una de sus funciones
		// app.controller('usuario', function($scope,$http) {

		// 	$scope.message = 'Friki Bloggeo';
	 //        $scope.subtitle = "Gestion de Usuario";

		// 	// Al cargar la pagina, ejecutamos la funcion get() para rellenar la tabla
		//     angular.element(document).ready(function () {
		//     	$scope.get("");
		    	
		//     });

		//     // La funcion get() que hace la solicitud para obtener los datos
		//     $scope.get = function(id){
		//     	// Si la Id esta en blanco, entonces la solicitud es general
		//     	if(id=="") {
		//     		$http.get("api/usuario").then(function (response) {
		// 		        $scope.lista = response.data.data;
		// 		        Materialize.toast(response.data.statusMessage, 4000);
				        
		// 		    }, function(response) {
		// 		    	// Aqui va el codigo en caso de error
		// 		    });
		// 		// Si la Id no esta en blanco, la solicitud se hace a un elemento especifico
		//     	} else {
		//     		$http.get("api/usuario/" + id).then(function (response) {
		// 		        $scope.nuevo = response.data.data[0];
		// 		        Materialize.toast(response.data.statusMessage, 4000);
		// 		    }, function(response) {
		// 		    	// Aqui va el codigo en caso de error
		// 		    });
		//     	}
		//     }

		//     // La funcion post() que hace la solicitud para publicar un nuevo elemento
		//     $scope.post = function() {
		//     	$http.post("api/usuario", $scope.nuevo)
		// 	    	.then(function (response){
		// 	            Materialize.toast(response.data.statusMessage, 4000);
		// 	            $scope.nuevo = null;
		// 	            $scope.get("");
		// 	        }, 
		// 	        function(response) {
		// 	        	// Aqui va el codigo en caso de error
		// 	        });
		//     }

		//     // La funcion put() que hace la solicitud para modificar un elemento especifico
		//     $scope.put = function(id) {
		 
		//     	$http.put("api/usuario/" + id, $scope.nuevo)
		// 	    	.then(
		// 	    		function (response){
		// 	            Materialize.toast(response.data.statusMessage, 4000);
		// 	            $scope.nuevo = null;
		// 	            $scope.get("");
		// 	        }, 
		// 	        function(response) {
		// 	        	// Aqui va el codigo en caso de error
		// 	        });

		//     }

		//     // La funcion delete() que hace la solicitud para eliminar un elemeto esepecifico
		//     $scope.delete = function(id) {
		//     	$http.delete("api/usuario/" + id)
		// 		   .then(
		// 		       function (response){
		// 		         console.log(response);
		// 		         Materialize.toast(response.data.statusMessage, 4000);
		// 		         $scope.nuevo = null;
		// 		         $scope.get("");
		// 		       }, 
		// 		       function (response){
		// 		         // Aqui va el codigo en caso de error
		// 		       }
		// 		    );
		//     }

		// });





