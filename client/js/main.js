var route = "api/Grupos";
	var cadena = "";
	var cadenaGrupo = "";
	var tmppath = [];
	var archivos = [];
	var cursos = [];
	var grupos = [];
	var cursosSinRepetir = [];
	var gruposSinRepetir = [];
	var archivosAdjuntados = [];

$(document).ready(function(){

	/*
	 * En el sigiente codigo hace una llamada por ajax a la ruta api/Grupos
	 *  y devuelve todos los datos de los grupos que hay
	 */

	    $.ajax(route, {
			        success: function (data) {
			        	
						for (x in data) {

							for(var i = 0; i < data[0]['archivos'].length; i++){
								archivos.push(data[0]['archivos'][i]);
							}
							cursos[x] = data[x]["curso"];
							//var curso = data[x]["curso"];
			        		//cadena = cadena + '<option value="'+curso+'">'+curso+'º</option>';

			        		grupos[x] = data[x]["grupo"];
			        		//var grupo = data[x]["grupo"];
			        		//cadenaGrupo = cadenaGrupo + '<option value="'+grupo+'">'+grupo+'</option>';
			        	}
			        	//$('#curso').html(cadena);
			        	//$('#grupo').html(cadenaGrupo);
			        	Cgrupos();
			        	Ccursos();
			        	Carchivos();
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

		$.ajax({
			url: "api/Grupos/update?where=%7B%22curso%22%3A"+curso+"%2C%20%22grupo%22%3A%22"+grupo+"%22%20%7D",
			type: "POST",
		    data: { "archivos": archivos },
			success: function(data) {
				if (data != 0) {
					$('#messageAlert').html('<h3>Exito!!!</h3>');
					var form = $('#fileUploadForm')[0];
					var ficheros = new FormData(form);
					/* SI se actualizar el campo array con el nombre de los archivos selecionado
					 * ejecutamos el siguiente boton submit para mover los archivos al CONTAINER1 
					 * que esta dentro de la carpeta STORAGE

					 Falta devolver una respuesta mas amigable OK.
					 */
					$( "#uploadFiles" ).trigger( "click" );

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
        			

				}else{
					$('#messageAlert').html('Error al actualizar datos.');
				}
			}
	    });

    });

	/*
	 * EN el siguiente evento, cuando eligo los archivo que subir 
	 * se introducen sus nombre en un array.
	 */
	$('#archivo').on('change', function (e){
		e.preventDefault();
	    for (var i = 0; i < this.files.length; i++){
	    	// Este es la nombre del archivo seleccionado
			archivos.push(this.files[i].name);

	    }

	  /*  for (var i = 0; i < archivos.length; i++){
	   alert(archivos[i]);


	    }*/
	});


});

//Select para mostrar los tipos de usuarios segun su acceso.

$(document).ready(function(){
	var route = "api/Usuarios";
	var users = "";
	    $.ajax(route, {
        success: function (data) {
			for (y in data) {
				var tipoUsuario = data[y]["tipoUsuario"];
        		users = users + '<option value="'+tipoUsuario+'">'+tipoUsuario+'</option>';
        	}
        	$('#tipoUser').html(users);
        }
      	});
});


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
			cadena = cadena + '<option value="'+gruposSinRepetir[x]+'">'+gruposSinRepetir[x]+'º</option>';
			
		}
	$('#grupo').html(cadena);
}

function mostrarArchivos(){
	var cadena = "";
		for(var x = 0; x < archivosAdjuntados.length; x++){
			cadena = cadena + archivosAdjuntados[x] + "\n";
			
		}
	$('#historico').html(cadena);
}

function Carchivos (){
	for(var i = 0; i < archivos.length; i++){
		if(i == 0)
			archivosAdjuntados[i] = archivos[i];
		var cont = 0;
		for(var x = 0; x < archivosAdjuntados.length; x++){
			if(archivosAdjuntados[x] != archivos[i])
				cont++;
		}
		if(cont == archivosAdjuntados.length)
			archivosAdjuntados.push(archivos[i]);

	}
	mostrarArchivos();
}