$(document).ready(function(){

	$('#meterDinero').click(function(){
	var nombres = $('#nombre').val();
      $.ajax({  
          method: "GET",
          url: "api/Usuarios/"+ nombres + '?access_token=' + sessionStorage.userToken,
      }).done(function(res){
              if(typeof(res.id) !== undefined){
                  sessionStorage.username=res.username;
                  sessionStorage.nombre=res.nombre;
                  sessionStorage.apellidos=res.apellidos;
                  sessionStorage.dinero=res.dinero;
                  sessionStorage.tipo=res.tipoUsuario;
                  	$('#alumnoIndicado').html(sessionStorage.username+" "+sessionStorage.nombre+" "+sessionStorage.apellidos+" "+sessionStorage.dinero);
                  }
                  if (sessionStorage.tipo == "Alumno"){
                   var cuantia = $('#cantidad').val();
                   var suma = parseInt(cuantia) + parseInt(sessionStorage.dinero);
                   $.ajax({
                  url: "api/Usuarios/update?where=%7B%22username%22%3A%22"+sessionStorage.username+"%22%7D&access_token="+ sessionStorage.userToken,
                  method: "POST",
                  data: { "dinero": suma },
                    success: function(data) {
                      location.reload();
                    }
                  });
                  } else {
                    alert("Debe ser Alumno del centro");
                  }
                  
              
        }).fail(function(evt){
          var msgError = "ERROR: "+evt.status+" "+evt.statusText;
          $('#messageAlerta').html('Error al actualizar datos.');
          });  
  });
  });
