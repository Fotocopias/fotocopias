$(document).ready(function(){
$("body").addClass("vistas");
$('#content').html('<div><img src="imagenes/ajax-loader(1).gif"/></div>');
$('#content').hide();

  if(location.hash == "#ini") {
    $('#administrador').hide();
    var url = window.location;
    var algo = url.toString().split("/");
    var posicion = parseInt(algo.length)-parseInt(1);
    $("body").removeClass("vistas");
		
    $('#content').show();
      setTimeout(function(){  $('#content').hide(); }, 1500);
      setTimeout(function(){ window.location.href = "admin.html"; }, 1500);
    

  }

  var suma = "";
  sessionStorage.removeItem("guardaCuantia");
  $( "#volver" ).attr("disabled",true);

  $('#mostrarUsuario').click(function(){
    if($('#nombre').val() != "" || $('#apellidos').val() != "") {
  var rutaUrl = 'api/Usuarios?filter=%7B%22where%22%3A%7B%22nombre%22%3A%22'+$('#nombre').val()+'%22%2C%20%22apellidos%22%3A%22'+$('#apellidos').val()+'%22%7D%7D&access_token='+sessionStorage.userToken;
      $.ajax({  
          method: "GET",
          url: rutaUrl,
      }).done(function(res){
              if(typeof(res.id) !== undefined){
                    $('#alumnoIndicado').html("<ul style='list-style: none'><li><strong>Alumno: </strong>"+res[0].nombre+" "+res[0].apellidos+"</li><li><strong>Email: </strong>"+res[0].email+"<li><strong>Usuario: </strong>"+res[0].username+"</li><li><strong>Saldo: </strong>"+res[0].dinero+"€</li><ul>");
                    
              }
        }).fail(function(evt){
          var msgError = "ERROR: "+evt.status+" "+evt.statusText;
          $('#messageAlerta').html('Error al actualizar datos.');
          });
      } else {
        alert("Introduzca un nombre y apellido");
        location.reload();
      }
   });

  $('#meterDinero').click(function(){
    if(sessionStorage.tipoUser != "Administrador") {
      alert("Usted no puede modificar");
    } else {
  var rutaUrl = 'api/Usuarios?filter=%7B%22where%22%3A%7B%22nombre%22%3A%22'+$('#nombre').val()+'%22%2C%20%22apellidos%22%3A%22'+$('#apellidos').val()+'%22%7D%7D&access_token='+sessionStorage.userToken;  
  if($('#cantidad').val() != "") {
      $.ajax({  
          method: "GET",
          url: rutaUrl,
      }).done(function(res){
              if(typeof(res.id) !== undefined){
                  sessionStorage.username=res[0].username;
                  sessionStorage.nombre=res[0].nombre;
                  sessionStorage.apellidos=res[0].apellidos;
                  sessionStorage.dinero=res[0].dinero;
                  sessionStorage.tipo=res[0].tipoUsuario;
                    
                  }
                  if (sessionStorage.tipo == "Alumno"){
                   var cuantia = $('#cantidad').val();
                   sessionStorage.guardaCuantia = cuantia;
                    var r = confirm("Incrementar en " +cuantia+"€ el saldo de "+sessionStorage.nombre +" "+sessionStorage.apellidos);
                      if (r == true) {                      
                   suma = parseFloat(cuantia) + parseFloat(sessionStorage.dinero);
                     if(sessionStorage.dinero <= 0 && cuantia < 0) {
                        alert("Este alumno no puede tener menos dinero");
                       } else if(sessionStorage.dinero <= 0 && cuantia > 0 || sessionStorage.dinero > 0 && cuantia > 0){
                       $.ajax({
                      url: "api/Usuarios/update?where=%7B%22username%22%3A%22"+sessionStorage.username+"%22%7D&access_token="+ sessionStorage.userToken,
                      method: "POST",
                      data: { "dinero": suma },
                        success: function(data) {
                          //$( "#mostrarUsuario" ).trigger( "click" );
                          $( "#cantidad" ).val("");
                          $( "#volver" ).attr("disabled",false);
						  $( "#mostrarUsuario" ).trigger( "click" );
						 	//$('#myModal').modal('dismiss');
                        }
                     	 //}).done(function() {
				            //$('#myModal').modal('toggle');
						   //$( "#mostrarUsuario" ).trigger( "click" );
				            //$('#myModal').modal('show');

						});
                     }
                     } else {
                          console.log("Cancelado");
                      }
                  } else {
                    alert("Debe ser Alumno del centro");
                  }
                  
              
        }).fail(function(evt){
          var msgError = "ERROR: "+evt.status+" "+evt.statusText;
          $('#messageAlerta').html('Error al actualizar datos.');
          }); 
      } else {
        alert("Debe introducir una cantidad");
      }

    }
    });

    $('#volver').click(function(){
      var deshacer = parseFloat(suma) - parseFloat(sessionStorage.guardaCuantia);
      var r = confirm("¿Deshacer los cambios?");
      if (r == true) {      
        $.ajax({
        url: "api/Usuarios/update?where=%7B%22username%22%3A%22"+sessionStorage.username+"%22%7D&access_token="+ sessionStorage.userToken,
        method: "POST",
        data: { "dinero": deshacer },
          success: function(data) {
            sessionStorage.removeItem("guardaCuantia");
            $( "#volver" ).attr("disabled",true);
		    $( "#mostrarUsuario" ).trigger( "click" );
		    location.reload();
          }
        //}).done(function() {
        	//$('#modal').modal('hide');
						  
           // $('#myModal').modal('toggle');
           // $('#myModal').modal('show');

		});
      } else {
        console.log("Cancelado");
      }
    });
    

});

$('#logout').click(function(){
          sessionStorage.removeItem("tipoUser");
          sessionStorage.removeItem("username");

        });