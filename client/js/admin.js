$(document).ready(function(){
	var route = "api/Usuarios";
	var users = "";
	var saldo = "";
	    $.ajax(route, {
        success: function (data) {

        	

			for (y in data) {
				var nombre = data[y]["username"];
				var tipo = data[y]["tipoUsuario"];
				var dinero = data[y]["dinero"];
				if(tipo == "Alumno") {
        			users = users + '<option value="'+nombre+'">'+nombre+'</option>';
        			saldo = saldo + '<option value="'+dinero+'">'+dinero+"€"+'</option>';
				}
        	}
        	$('#Select').html(users);
        	$('#saldo').html(saldo);

        }
      	});


        	$('#meterDinero').click(function(){
          
            var nombre = $('#Select').val();
            var valor = $('#saldo').val();

	        $.ajax({
	          url: "api/Usuarios/update?where=%7B%22username%22%3A"+nombre,
	          method: "POST",
	          data: { "dinero": valor },
		          success: function(data) {
		            
		          }
	          });

	        });
});
