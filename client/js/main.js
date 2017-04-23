$(document).ready(function(){

	/*
	 * En el sigiente codigo hace una llamada por ajax a la ruta api/Grupos
	 *  y devuelve todos los datos de los grupos que hay
	 */

	var route = "api/Grupos";
	var cadena = "";
	var cadenaGrupo = "";
	    $.ajax(route, {
        success: function (data) {
        	// var json = truncate(JSON.stringify(data, null, 2), length);
        	// $('#result').html(json);
        	//var object = JSON.stringify(data, null, 2);
        	//alert(data[0]['grupo']);
        	
        	for (x in data) {

        		var curso = data[x]["curso"];
        		cadena = cadena + '<option value="'+curso+'">'+curso+'º</option>';

        		var grupo = data[x]["grupo"];
        		cadenaGrupo = cadenaGrupo + '<option value="'+grupo+'">'+grupo+'</option>';
        	}
        	 $('#curso').html(cadena);
        	 $('#grupo').html(cadenaGrupo);
        }
      });
	 

	
}); 