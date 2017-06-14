$(document).ready(function(){
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
                    $('#alumnoIndicado').html("Nombre: "+res[0].nombre+" "+res[0].apellidos+"\n"+"Usuario: "+res[0].username+"\n"+"Tipo: "+res[0].tipoUsuario+"\n"+"Saldo: "+res[0].dinero+"€");
              }
        }).fail(function(evt){
          var msgError = "ERROR: "+evt.status+" "+evt.statusText;
          $('#messageAlerta').html('Error al actualizar datos.');
          });
      } else {
        alert("Introduzca un nombre y apellido");
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
                   suma = parseInt(cuantia) + parseInt(sessionStorage.dinero);
                     if(sessionStorage.dinero <= 0 && cuantia < 0) {
                        alert("Este alumno no puede tener menos dinero");
                       } else if(sessionStorage.dinero <= 0 && cuantia > 0 || sessionStorage.dinero > 0 && cuantia > 0){
                       $.ajax({
                      url: "api/Usuarios/update?where=%7B%22username%22%3A%22"+sessionStorage.username+"%22%7D&access_token="+ sessionStorage.userToken,
                      method: "POST",
                      data: { "dinero": suma },
                        success: function(data) {
                          $( "#cantidad" ).val("");
                          $( "#mostrarUsuario" ).trigger( "click" );
                          $( "#volver" ).attr("disabled",false);
                        }
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
      var deshacer = parseInt(suma) - parseInt(sessionStorage.guardaCuantia);
      var r = confirm("¿Deshacer los cambios?");
      if (r == true) {      
        $.ajax({
        url: "api/Usuarios/update?where=%7B%22username%22%3A%22"+sessionStorage.username+"%22%7D&access_token="+ sessionStorage.userToken,
        method: "POST",
        data: { "dinero": deshacer },
          success: function(data) {
            $( "#mostrarUsuario" ).trigger( "click" );
            sessionStorage.removeItem("guardaCuantia");
            location.reload();
          }
        });
      } else {
        console.log("Cancelado");
      }
    });
    

});