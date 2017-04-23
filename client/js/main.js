$(document).ready(function(){

	/*
	 * En el sigiente codigo hace una llamada por ajax a la ruta api/Grupos
	 *  y devuelve todos los datos de los grupos que hay
	 */
	var route = "api/Grupos";
	var cadena = "";
	var cadenaGrupo = "";
	var tmppath = "";
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
/*  *****************NO ME FUNCIONA ESTA FUNCION ********** */
		$.ajax({
			url: "api/Grupos/update",
			type: "POST",
		    data: { "where":{"curso": curso, "grupo":grupo}, "data":{"archivo": archivo} },
			success: function(data) {
				alert('exito');
			}
	     });

		

	});
	$('#archivo').change(function(event){
		tmppath = URL.createObjectURL(event.target.files[0]);
		// Esta es la ruta actal del archivo deleccionado

	});
}); 