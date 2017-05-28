


$(document).ready(function(){

	var alumnos = "";

	    $.ajax("api/Grupos", {
			success: function (data) {
				for (x in data) {
					var grupos ='';
					for (y in data[x]["archivosDescargar"]) {
						//alert(data[x]["grupo"]);
						//console.log(data[x]["archivosDescargar"][0]);
						for (idalumno in data[x]["archivosDescargar"][y]) {
							var listaArchivos= "<ul>";
							for(z in data[x]["archivosDescargar"][y][idalumno]){
								listaArchivos = listaArchivos + 
								'<li><a data-action="file" id="'+idalumno+'" onclick="dowload()">'+data[x]["archivosDescargar"][y][idalumno][z]+'</a></li>';
							}
							listaArchivos = listaArchivos + '</ul>';
							alumnos = alumnos+'<li>'+
							'<button type="button" class="btn btn-info" data-toggle="collapse" data-target="#alumno'+idalumno+'">Alumno - '+idalumno+'</button>'+
						  	'<div id="alumno'+idalumno+'" class="collapse">'+listaArchivos+'</div></li>';
						}

						var curso = data[x]["curso"]+'º '+data[x]["grupo"]
							grupos = grupos+'<li>'+
							'<button type="button" class="btn btn-info" data-toggle="collapse" data-target="#curso'+curso+'">Curso: '+curso+'</button>'+
						  	'<div id="curso'+curso+'" class="collapse">'+alumnos+'</div></li>';
					}
					grupos = grupos + "</ul>";

				}
				$('#container').html(grupos);

			}

      	});

/*	    $('[data-action="file"]').on('click', function(){
	    	alert('entra');
	    	var file = $(this).html();
	    	
		    var rute = "/api/container/:container1/download/:"+file;

			$.ajax(rute, {
				success: function (data) {
alert('exito');
				}
			});
		});
      	


 {
  "tutor": "Alb3",
  "anyo": "string",
  "grupo": "B",
  "subgrupo": "ensenanza",
  "ensenanza": "string",
  "curso": 1,
  "horarioVisita": "string",
  "archivos": [],
  "archivosDescargar": [{ "2433566": ["nuevo", "comandos.txt"] }]

}
 */

});

function dowload(){

	    	var file = $(this).html();
	    	
		    var rute = "/api/containers/container1/download/"+file;

			$.ajax(rute, {
				success: function (data) {
alert('exito');
				}
			});
}