

var route ="/api/Grupos?filter=%7B%22where%22%3A%20%7B%22tutor%22%3A%20%22"+sessionStorage.username+"%22%7D%7D&access_token="+sessionStorage.userToken;
//var route ="/api/Grupos?filter=%7B%22where%22%3A%20%7B%22tutor%22%3A%20%22Jose%22%7D%7D&access_token=dDaXHLl5xdsWmeduNX7eYtbdigaeg2GcV3V26h5FafQoNDQq1JN14a230aMGVxta";	
	var cadena = "";
	var cadenaGrupo = "";
	var tmppath = [];
	var archivos = [];
	var cursos = [];
	var grupos = [];
	var cursosSinRepetir = [];
	var gruposSinRepetir = [];
	var archivosAdjuntados = [];
	var archivosSinRepetir = [];

$(document).ready(function(){


	$('#archivo').html('');

	/*
	 * En el sigiente codigo hace una llamada por ajax a la ruta api/Grupos
	 *  y devuelve todos los datos de los grupos que hay
	 */

	    $.ajax(route, {
			        success: function (data) {
			        	
						for (x in data) {
							/*
							for(var i = 0; i < data[0]['archivos'].length; i++){
								archivos.push(data[0]['archivos'][i]);
							}*/
							cursos[x] = data[x]["curso"];
							grupos[x] = data[x]["grupo"];
			        	}
			        	Cgrupos();
			        	Ccursos();
			        	//Carchivos();


	        			archivos = [];
						var group = $('#grupo').val();
						var course = $('#curso').val();
						var url = "/api/Grupos?filter=%7B%22where%22%3A%20%7B%22grupo%22%3A%20%22"+group+"%22%2C%20%22curso%22%3A"+course+"%7D%7D&access_token="+sessionStorage.userToken;
							    $.ajax(url, {
							        success: function (data) {
							        	
										for (x in data) {

											for(var i = 0; i < data[0]['archivos'].length; i++){
												archivos.push(data[0]['archivos'][i]);

											}

											
							        	}
							        	archivosSinRepetir = [];
									   for (var i = 0; i < archivos.length; i++){
									   		
									   		var cont = 0;
									   		for (var y = 0; y < archivosSinRepetir.length; y++){
									   			if(archivosSinRepetir[y] != archivos[i])
									   				cont++;
											}
									   		if( cont == archivosSinRepetir.length )
									   			archivosSinRepetir.push(archivos[i]);

									    }
				
							        }
				      			});
			        }
      	});

	$('#btn-subir').click(function(){
		/*
		 * AL hacer click en el boton de subir se envian por ajax el nombre del archivo seleccionado
		 * para que se haga un update en  curso y el grupo seleccionado
		*/
		var archivo = $('#archivo').val();
		var curso = $('#curso').val();
		var grupo = $('#grupo').val();
		//var extensiones_permitidas = [];
		//extensiones_permitidas = new Array(".pdf"); 
		$.ajax({
			
		url: "/api/Grupos/update?where=%7B%22grupo%22%3A%22"+grupo+"%22%2C%22curso%22%3A"+curso+"%2C%22tutor%22%3A%22"+sessionStorage.username+"%22%7D&access_token="+sessionStorage.userToken,
		//url:"/api/Grupos/update?where=%7B%22grupo%22%3A%22"+grupo+"%22%2C%22curso%22%3A"+curso+"%2C%22tutor%22%3A%22Jose%22%7D&access_token=dDaXHLl5xdsWmeduNX7eYtbdigaeg2GcV3V26h5FafQoNDQq1JN14a230aMGVxta",
			type: "POST",
		    data: { "archivos": archivosSinRepetir },
			success: function(data) {
				if (data != 0) {
				if (".pdf" == (archivo.substring(archivo.lastIndexOf("."))).toLowerCase()) { 
					var r = confirm("Adjuntar a "+curso+"º "+grupo);
                      if (r == true) { 
					$('#messageAlert').html('<h3>Exito!!!</h3>');
					var form = $('#fileUploadForm')[0];
					var ficheros = new FormData(form);
					/* SI se actualizar el campo array con el nombre de los archivos selecionado
					 * ejecutamos el siguiente boton submit para mover los archivos al CONTAINER1 
					 * que esta dentro de la carpeta STORAGE
					 Falta devolver una respuesta mas amigable OK.
					 */
					$( "#uploadFiles" ).trigger( "click");
					document.location.href = "profesor.html";
			
					/* Esta funcion de ajax era para poder subir los archivo mediante
					 * ajax pero NO SE porque no va asique lo he dejado para subir los 
					 * archivor mediante un formularo por metodo POST, hasta que vea si
					 * es posible hacerlo por ajax
					$.ajax({
			            type: "POST",
			            enctype: 'multipart/form-data',
			            url: "/api/containers/container1/upload",
			            data: ficheros,
			            processData: false,
			            contentType: false,
			            cache: false,
			            timeout: 600000,
			            success: function (data) {
							$('#messageAlert').html(data);
			     
			            },
			            error: function (e) {
							$('#messageAlert').html(e.responseText);
			             }
        			});*/
        			} else {
        				window.onload();
        			}
        		} else {
        			alert("Comprueba la extensión de los archivos a subir. \nSólo se pueden subir archivos con extension pdf ");
        		}

				} else{
					alert("Selecciona un archivo");
				}
			}
	    });

    });

	/*
	 * En el siguiente evento, cuando eligo los archivo que subir 
	 * se introducen sus nombre en un array.
	 */
	$('#archivo').on('change', function (e){
		e.preventDefault();

	    for (var i = 0; i < this.files.length; i++){
	    	// Este es la nombre del archivo seleccionado
			archivos.push(this.files[i].name);

		}
		
	   for (var i = 0; i < archivos.length; i++){
	   		
	   		var cont = 0;
	   		for (var y = 0; y < archivosSinRepetir.length; y++){
	   			if(archivosSinRepetir[y] != archivos[i])
	   				cont++;
			}
	   		if( cont == archivosSinRepetir.length )
	   			archivosSinRepetir.push(archivos[i]);

	    }

	});
	/*
	 * Funcion que borra el array archivos y el introduce los archivos de ese curso y grupo
	 */
	$('#curso, #grupo').change(function(){
		archivos = [];

		var group = $('#grupo').val();
		var course = $('#curso').val();
		var url = "/api/Grupos?filter=%7B%22where%22%3A%20%7B%22grupo%22%3A%20%22"+group+"%22%2C%20%22curso%22%3A"+course+"%7D%7D&access_token="+sessionStorage.userToken;
			    $.ajax(url, {
			        success: function (data) {
			        	
						for (x in data) {

							for(var i = 0; i < data[0]['archivos'].length; i++){
								archivos.push(data[0]['archivos'][i]);

							}					
			        	}

			        	archivosSinRepetir = [];
					   for (var i = 0; i < archivos.length; i++){
					   		
					   		var cont = 0;
					   		for (var y = 0; y < archivosSinRepetir.length; y++){
					   			if(archivosSinRepetir[y] != archivos[i])
					   				cont++;
							}
					   		if( cont == archivosSinRepetir.length )
					   			archivosSinRepetir.push(archivos[i]);

					    }

			        }
      			});
	});


});

function formaction(e){
	e.preventDefault();
	e.stopPropagation();
}

//Select para mostrar los tipos de usuarios segun su acceso.


function Ccursos (){
	for(var i = 0; i < cursos.length; i++){
		if(i == 0)
			cursosSinRepetir[i] = cursos[i];
		var cont = 0;
		for(var x = 0; x < cursosSinRepetir.length; x++){
			if(cursosSinRepetir[x] != cursos[i])
				cont++;
		}
		if(cont == cursosSinRepetir.length)
			cursosSinRepetir.push(cursos[i]);

	}
	mostrarCursos();
}

function mostrarCursos(){
	var cadena = "";
		for(var x = 0; x < cursosSinRepetir.length; x++){
			cadena = cadena + '<option value="'+cursosSinRepetir[x]+'">'+cursosSinRepetir[x]+'º</option>';
			
		}
	$('#curso').html(cadena);
}

function Cgrupos (){
	for(var i = 0; i < grupos.length; i++){
		if(i == 0)
			gruposSinRepetir[i] = grupos[i];
		var cont = 0;
		for(var x = 0; x < gruposSinRepetir.length; x++){
			if(gruposSinRepetir[x] != grupos[i])
				cont++;
		}
		if(cont == gruposSinRepetir.length)
			gruposSinRepetir.push(grupos[i]);

	}
	mostrarGrupos();
}

function mostrarGrupos(){
	var cadena = "";
		for(var x = 0; x < gruposSinRepetir.length; x++){
			cadena = cadena + '<option value="'+gruposSinRepetir[x]+'">'+gruposSinRepetir[x]+'</option>';
			
		}
	$('#grupo').html(cadena);
}


$(document).ready(function(){
	if(location.hash == "#ini") {
		var url = window.location;
		var algo = url.toString().split("/");
		var posicion = parseInt(algo.length)-parseInt(1);

		setTimeout(function(){ window.location.href = "profesor.html"; }, 500);
		

	}
var rutaUrl = '/api/Grupos?filter=%7B%22where%22%3A%7B%22tutor%22%3A%22'+sessionStorage.username+'%22%7D%7D&access_token='+sessionStorage.userToken;
	 $.ajax({  
          method: "GET",
          url: rutaUrl,
      }).done(function(res){
      	//alert(rutaUrl);
              if(typeof(res.id) !== undefined){
		        var cadena = "";
		        for(var i = 0; i < res.length; i++){
					for(var x = res[i].archivos.length-1; x >= 0 ; x = x -1){
						cadena = cadena +'<option ondblclick="dowload(this)" id="selectDesplegable" value="'+res[i].archivos[x]+'">'+res[i].archivos[x]+'</option>';
					}
					$('#historico').html(cadena);
				}
			 }
              
        }).fail(function(evt){
          var msgError = "ERROR: "+evt.status+" "+evt.statusText;
          $('#messageAlerta').html('Error al actualizar datos.');
         });
});

//Abre el fichero seleccionado de historico
function dowload(element){
			var file = $(element).html()
	 		var rute =  "/api/containers/download/download/"+file;

	 		window.open(rute); 
     
}
/*
function comprueba_extension(formulario, archivo) { 
   extensiones_permitidas = new Array(".pdf"); 
   mierror = ""; 
   if (!archivo) { 
      //Si no tengo archivo, es que no se ha seleccionado un archivo en el formulario 
      	mierror = "No has seleccionado ningún archivo"; 
   }else{ 
      //recupero la extensión de este nombre de archivo 
      extension = (archivo.substring(archivo.lastIndexOf("."))).toLowerCase(); 
      //alert (extension); 
      //compruebo si la extensión está entre las permitidas 
      permitida = false; 
      for (var i = 0; i < extensiones_permitidas.length; i++) { 
         if (extensiones_permitidas[i] == extension) { 
         permitida = true; 
         break; 
         } 
      } 
      if (!permitida) { 
         mierror = "Comprueba la extensión de los archivos a subir. \nSólo se pueden subir archivos con extensiones: " + extensiones_permitidas.join(); 
      	}else{ 
         	//submito! 
         alert ("Todo correcto. Voy a submitir el formulario."); 
         formulario.submit(); 
         return 1; 
      	} 
   } 
   //si estoy aqui es que no se ha podido submitir 
   alert (mierror); 
}*/
