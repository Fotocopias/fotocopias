$(document).ready(function(){
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
								var file = data[x]["archivosDescargar"][y][idalumno][z];
								file = file.toString().split(',');
								for(var i = 0; i < file.length; i++){
									listaArchivos = listaArchivos + 
								'<li><a data-action="file" style="cursor: pointer;" id="'+idalumno+'" onclick="dowload(this)" data-id="'+file[i]+'">'+file[i]+'</a></li>';
							
								}
								
							}
							listaArchivos = listaArchivos + '</ul>';
							var curso = data[x]["curso"]+'º '+data[x]["grupo"]
							alumnos = alumnos+'<li>'+
							'<button type="button" class="btn btn-info" data-toggle="collapse" data-target="#alumno'+idalumno+'">Alumno - '+idalumno+' - '+curso+'</button>'+
						  	'<div id="alumno'+idalumno+'" class="collapse">'+listaArchivos+'</div></li>';
						}
						alumnos = alumnos+ "</li>";
						
							grupos = grupos+'<li>'+alumnos+'</li>';
					}
					grupos = grupos + "</ul>";

				}
				$('#container').html(grupos);

			}

      	});
	

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

function dowload(element){
			var file = $(element).html()
	 		var rute =  "/api/containers/download/download/"+file;

	 		window.open(rute); 
      
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