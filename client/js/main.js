var route ="/api/Grupos?filter=%7B%22where%22%3A%20%7B%22tutor%22%3A%20%22"+sessionStorage.username+"%22%7D%7D&access_token="+sessionStorage.userToken;
//var route ="/api/Grupos?filter=%7B%22where%22%3A%20%7B%22tutor%22%3A%20%22Jose%22%7D%7D&access_token=dDaXHLl5xdsWmeduNX7eYtbdigaeg2GcV3V26h5FafQoNDQq1JN14a230aMGVxta";	
	var cadena = "";
	var cadenaGrupo = "";
	var tmppath = [];
	var archivosProfesor = [];
	var archivosAlumno = [];
	var cursos = [];
	var grupos = [];
	var cursosSinRepetir = [];
	var gruposSinRepetir = [];
	var archivosAdjuntados = [];
	var archivosSinRepetirProfesor = [];
	var archivosSinRepetirAlumno = [];

$(document).ready(function(){
   $('#content').html('<div><img src="imagenes/ajax-loader(1).gif"/></div>');
   $('#content').hide();
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


	        			archivosProfesor = [];
	        			archivosAlumno = [];
						var group = $('#grupo').val();
						var course = $('#curso').val();
						var url = "/api/Grupos?filter=%7B%22where%22%3A%20%7B%22grupo%22%3A%20%22"+group+"%22%2C%20%22curso%22%3A"+course+"%7D%7D&access_token="+sessionStorage.userToken;
							    $.ajax(url, {
							        success: function (data) {
							        	
										for (x in data) {

											for(var i = 0; i < data[0]['archivosProfesor'].length; i++){
												archivosProfesor.push(data[0]['archivosProfesor'][i]);

											}
											for(var y = 0; y < data[0]['archivosAlumno'].length; y++){
												archivosAlumno.push(data[0]['archivosAlumno'][y]);
											}

											
							        	}
							        	archivosSinRepetirProfesor = [];
							        	archivosSinRepetirAlumno = [];
									   for (var i = 0; i < archivosProfesor.length; i++){
									   		
									   		var cont = 0;
									   		for (var y = 0; y < archivosSinRepetirProfesor.length; y++){
									   			if(archivosSinRepetirProfesor[y] != archivosProfesor[i])
									   				cont++;
											}
									   		if( cont == archivosSinRepetirProfesor.length )
									   			archivosSinRepetirProfesor.push(archivosProfesor[i]);

									    }
									    for (var i = 0; i < archivosAlumno.length; i++){
									   		
									   		var cont = 0;
									   		for (var y = 0; y < archivosSinRepetirAlumno.length; y++){
									   			if(archivosSinRepetirAlumno[y] != archivosAlumno[i])
									   				cont++;
											}
									   		if( cont == archivosSinRepetirAlumno.length )
									   			archivosSinRepetirAlumno.push(archivosAlumno[i]);

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
	if (".pdf" != (archivo.substring(archivo.lastIndexOf("."))).toLowerCase()) { 
		alert("Sólo se pueden subir archivos con extension pdf");
		$('#archivo').val("");
		archivosProfesor = [];
		archivosSinRepetirProfesor = [];
	} else {			
		$.ajax({
		url: "/api/Grupos/update?where=%7B%22grupo%22%3A%22"+grupo+"%22%2C%22curso%22%3A"+curso+"%2C%22tutor%22%3A%22"+sessionStorage.username+"%22%7D&access_token="+sessionStorage.userToken,
		//url:"/api/Grupos/update?where=%7B%22grupo%22%3A%22"+grupo+"%22%2C%22curso%22%3A"+curso+"%2C%22tutor%22%3A%22Jose%22%7D&access_token=dDaXHLl5xdsWmeduNX7eYtbdigaeg2GcV3V26h5FafQoNDQq1JN14a230aMGVxta",
			type: "POST",
		    data: { "archivosProfesor": archivosSinRepetirProfesor },
			success: function(data) {
				if (data != 0) {
				
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
					 $.ajax({
					    url: "/api/Grupos/update?where=%7B%22grupo%22%3A%22"+grupo+"%22%2C%22curso%22%3A"+curso+"%2C%22tutor%22%3A%22"+sessionStorage.username+"%22%7D&access_token="+sessionStorage.userToken,
					      type: "POST",
					        data: { "archivosAlumno": archivosSinRepetirAlumno },
					      success: function(data) {
					        $( "#uploadFiles" ).trigger( "click");
						document.location.href = "profesor.html";
					      }
					});
					
        			} else {
        				window.onload();
        			}

				} else{
					alert("Selecciona un archivo");
				}
			}
	    });
	}
   });

	/*
	 * En el siguiente evento, cuando eligo los archivo que subir 
	 * se introducen sus nombre en un array.
	 */
	$('#archivo').on('change', function (e){
		e.preventDefault();

	    for (var i = 0; i < this.files.length; i++){
	    	// Este es la nombre del archivo seleccionado
			archivosProfesor.push(this.files[i].name);
			archivosAlumno.push(this.files[i].name);
		}

		
	   for (var i = 0; i < archivosProfesor.length; i++){
	   		
	   		var cont = 0;
	   		for (var y = 0; y < archivosSinRepetirProfesor.length; y++){
	   			if(archivosSinRepetirProfesor[y] != archivosProfesor[i])
	   				cont++;
			}
	   		if( cont == archivosSinRepetirProfesor.length )
	   			archivosSinRepetirProfesor.push(archivosProfesor[i]);

	    }
	    for (var i = 0; i < archivosAlumno.length; i++){
	   		
	   		var cont = 0;
	   		for (var y = 0; y < archivosSinRepetirAlumno.length; y++){
	   			if(archivosSinRepetirAlumno[y] != archivosAlumno[i])
	   				cont++;
			}
	   		if( cont == archivosSinRepetirAlumno.length )
	   			archivosSinRepetirAlumno.push(archivosAlumno[i]);

	    }

	});
	/*
	 * Funcion que borra el array archivos y el introduce los archivos de ese curso y grupo
	 */
	$('#curso, #grupo').change(function(){
		archivosProfesor = [];
		archivosAlumno = [];

		var group = $('#grupo').val();
		var course = $('#curso').val();
		var url = "/api/Grupos?filter=%7B%22where%22%3A%20%7B%22grupo%22%3A%20%22"+group+"%22%2C%20%22curso%22%3A"+course+"%7D%7D&access_token="+sessionStorage.userToken;
			    $.ajax(url, {
			        success: function (data) {
			        	
						for (x in data) {

							for(var i = 0; i < data[0]['archivosProfesor'].length; i++){
								archivosProfesor.push(data[0]['archivosProfesor'][i]);

							}			
							for(var i = 0; i < data[0]['archivosAlumno'].length; i++){
								archivosAlumno.push(data[0]['archivosAlumno'][i]);

							}			
			        	}

			        	archivosSinRepetirProfesor = [];
			        	archivosSinRepetirAlumno = [];
					   for (var i = 0; i < archivosProfesor.length; i++){
					   		
					   		var cont = 0;
					   		for (var y = 0; y < archivosSinRepetirProfesor.length; y++){
					   			if(archivosSinRepetirProfesor[y] != archivosProfesor[i])
					   				cont++;
							}
					   		if( cont == archivosSinRepetirProfesor.length )
					   			archivosSinRepetirProfesor.push(archivosProfesor[i]);

					    }
					    for (var i = 0; i < archivosAlumno.length; i++){
					   		
					   		var cont = 0;
					   		for (var y = 0; y < archivosSinRepetirAlumno.length; y++){
					   			if(archivosSinRepetirAlumno[y] != archivosAlumno[i])
					   				cont++;
							}
					   		if( cont == archivosSinRepetirAlumno.length )
					   			archivosSinRepetirAlumno.push(archivosAlumno[i]);

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

		$('#profesor').hide();
		$('#content').show();
	    setTimeout(function(){  $('#content').hide(); }, 1500);
		setTimeout(function(){ window.location.href = "profesor.html"; }, 1500);
		

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
					for(var x = res[i].archivosProfesor.length-1; x >= 0 ; x = x -1){
						cadena = cadena +'<option ondblclick="dowload(this)" id="selectDesplegable" value="'+res[i].archivosProfesor[x]+'">'+res[i].archivosProfesor[x]+'</option>';
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

$('#logout').click(function(){
    sessionStorage.removeItem("tipoUser");
});
