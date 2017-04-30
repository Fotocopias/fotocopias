$(document).ready(function(){

	/*
	 * En el sigiente codigo hace una llamada por ajax a la ruta api/Grupos
	 *  y devuelve todos los datos de los grupos que hay
	 */
	var route = "api/Grupos";
	var cadena = "";
	var cadenaGrupo = "";
	var tmppath = [];
	var archivos = [];
	    $.ajax(route, {
        success: function (data) {
        	
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
				}else{
					$('#messageAlert').html('Error');
				}
			}
	    });

    });

	/*
	 * EN el siguiente evento, cuando eligo los archivo que subir 
	 * se introducen sus nombre en un array.
	 */
	$('#archivo').on('change', function (){
	    for (var i = 0; i < this.files.length; i++){
	    	// Este es la nombre del archivo seleccionado
			archivos[i] = this.files[i].name;
			

	    }
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