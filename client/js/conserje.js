var archivosDescargar = [];

$(document).ready(function(){

if ( sessionStorage.username != "" ){
	$('#nombreUsuario').html(sessionStorage.username);
}

$('#content').html('<div><img src="imagenes/ajax-loader(1).gif"/></div>');
  $('#content').hide();
	if(location.hash == "#ini") {
		$('#conserje').hide();
		var url = window.location;
		var algo = url.toString().split("/");
		var posicion = parseInt(algo.length)-parseInt(1);

		$('#content').show();
	    setTimeout(function(){  $('#content').hide(); }, 1500);
		setTimeout(function(){ window.location.href = "conserje.html"; }, 1500);
		

	}
cargarCollapsables();

/* EJEMPLO DE COMO HAY QUE ACTUALIZAR EL CAMPO DE GRUPO: archivosDescargar
 {
  "tutor": "Alb3",
  "anyo": "string",
  "grupo": "B",
  "subgrupo": "ensenanza",
  "ensenanza": "string",
  "curso": 1,
  "horarioVisita": "string",
  "archivos": [],
  "archivosDescargar": [{ "2433566": ["nuevo", "comandos.txt"] }]   ****IMPORTANTE******
}
*/

});
function cargarCollapsables(){
	var alumnos = "";

	    $.ajax("api/Grupos", {
			success: function (data) {
				for (x in data) {
					var grupos ='';

					for (y in data[x]["archivosDescargar"]) {

						for (idalumno in data[x]["archivosDescargar"][y]) {
							var listaArchivos= "<ul>";
							for(z in data[x]["archivosDescargar"][y][idalumno]){
								var file = data[x]["archivosDescargar"][y][idalumno][z];
								file = file.toString().split(',');
								for(var i = 0; i < file.length; i++){
									if( file[i] != ""){
										listaArchivos = listaArchivos + 
										'<li><a data-action="file" style="cursor: pointer;" id="'+idalumno+'" onclick="dowload(this)" data-id="'+file[i]+'" data-curso="'+data[x]["curso"]+'" data-grupo="'+data[x]["grupo"]+'" data-username="'+idalumno+'">'+file[i]+'</a></li>';
									}
								}
								
							}
							listaArchivos = listaArchivos + '</ul>';
							var curso = data[x]["curso"]+'º '+data[x]["grupo"]
							alumnos = alumnos+'<li>'+
							'<button type="button" class="btn btn-info" data-toggle="collapse" data-target="#alumno'+idalumno+'">Alumno - '+idalumno+' - '+curso+'</button>'+
						  	'<div id="alumno'+idalumno+'" class="collapse">'+listaArchivos+'</div></li>';
						}
						alumnos = alumnos+ "</li><br>";
						
							grupos = grupos+'<li>'+alumnos+'</li>';
					}
					grupos = grupos + "</ul>";

				}
				$('#container').html(grupos);

			}

      	});

	}
function dowload(element){
			var file = $(element).html()
	 		var rute =  "/api/containers/download/download/"+file;
			var curso = $(element).attr('data-curso');
			var grupo = $(element).attr('data-grupo');
			var username = $(element).attr('data-username');
			actualizarArchivosDescargar(file, curso, grupo, username, rute);


	 		
      
			/*	$.ajax(rute, {
				success: function (data) {
					// Data es el texto del documento seleccionado para imprimir
					alert(data[0]);
					
				//	document.write (data);
				//	 window.print();

					/*
				  	var win = window.open("about:blank", file);       
			        setTimeout(function() {
			        	win.write(data)
			            win.print();

			        }, 5000);
                	
				}
			});*/
}
$('#logout').click(function(){
          sessionStorage.removeItem("tipoUser");

        });



function actualizarArchivosDescargar(archivo, curso, grupo, username, rute){
	var rutaUrl = '/api/Grupos?filter=%7B%22where%22%3A%7B%22curso%22%3A%22'+curso+'%22%2C%22grupo%22%3A%22'+grupo+'%22%7D%7D&access_token='+sessionStorage.userToken;
   	$.ajax({  
		method: "GET",
		url: rutaUrl,
		success: function (res) {
			cargarArrayArchivosDescargar(res);
			for( var i = 0; i < archivosDescargar.length; i++){
				if (archivosDescargar[i] == archivo)
					archivosDescargar[i] = "";
			}
			$.ajax({
		      url: '/api/Grupos/update?where=%7B%22curso%22%3A%22'+curso+'%22%2C%22grupo%22%3A%22'+grupo+'%22%7D&access_token='+sessionStorage.userToken,
		        method: "POST",
		        data: {  "archivosDescargar": [{ [username] : [archivosDescargar] }]  },
		        success: function(data) {

		        	vaciarArchivosDescargar(curso, grupo);
		        	
		        	// Abro el enlace para imprimir
		        	window.open(rute); 
		        	//deleteItem(archivo);
		         
		        }
		    });

		 }
	}); 

}
function vaciarArchivosDescargar(curso, grupo){
	var cont = 0;
  for(var i = 0; i < archivosDescargar.length; i++){
    if(archivosDescargar[i] == ""){
      cont++;
    }
  }       
  if(cont == archivosDescargar.length){
   
  $.ajax({
      url: '/api/Grupos/update?where=%7B%22curso%22%3A%22'+curso+'%22%2C%22grupo%22%3A%22'+grupo+'%22%7D&access_token='+sessionStorage.userToken,
      method: "POST",
      data:{ "archivosDescargar": "[]"},
      success: function(data) {
      	//Recargo los collapsables 
      	cargarCollapsables();
      }
    });
  }
}

function deleteItem(element){
	$.ajax({
      url: '/api/containers/download/files/'+element+'?access_token='+sessionStorage.userToken,
      method: "DELETE",
      success: function(data) {
      	
      }
    });

}
function cargarArrayArchivosDescargar(res){
	for (y in res[0].archivosDescargar) {
				for (idalumno in res[0].archivosDescargar[y]) {
					for(z in res[0].archivosDescargar[y][idalumno]){
						var file = res[0].archivosDescargar[y][idalumno][z];
						var file = file.toString().split(',')
						for(var i = 0; i < file.length ; i++){
							archivosDescargar.push(file[i]);
						}
					}
				}
			}
}