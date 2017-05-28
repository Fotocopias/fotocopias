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
        			users = users + '<option value="'+nombre+'">'+nombre+"      "+dinero+"€"+'</option>';
				}
        	}
        	$('#Select').html(users);

        }
      	});


        	$('#meterDinero').click(function(){
          
            var nombre = $('#Select').val();
            var valor = $('#saldo').val();

	        $.ajax({
	          url: "api/Usuarios/update?where=%7B%22username%22%3A%22"+nombre+"%22%7D&access_token="+ sessionStorage.userToken,
	          method: "POST",
	          data: { "dinero": valor },
		          success: function(data) {
		            
		          }
	          });

	        });
});