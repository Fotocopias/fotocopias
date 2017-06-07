$(document).ready(function(){
  $('#mostrarUsuario').click(function(){
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

   });

  $('#meterDinero').click(function(){
  var rutaUrl = 'api/Usuarios?filter=%7B%22where%22%3A%7B%22nombre%22%3A%22'+$('#nombre').val()+'%22%2C%20%22apellidos%22%3A%22'+$('#apellidos').val()+'%22%7D%7D&access_token='+sessionStorage.userToken;  
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
                    var r = confirm("Incrementar en " +cuantia+"€ el saldo de "+sessionStorage.username);
                      if (r == true) {                      
                   var suma = parseInt(cuantia) + parseInt(sessionStorage.dinero);
                     if(sessionStorage.dinero <= 0 && cuantia < 0) {
                        alert("Este alumno no puede tener menos dinero");
                       } else if(sessionStorage.dinero <= 0 && cuantia > 0 || sessionStorage.dinero > 0 && cuantia > 0){
                       $.ajax({
                      url: "api/Usuarios/update?where=%7B%22username%22%3A%22"+sessionStorage.username+"%22%7D&access_token="+ sessionStorage.userToken,
                      method: "POST",
                      data: { "dinero": suma },
                        success: function(data) {
                          $( "#mostrarUsuario" ).trigger( "click" );
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
    });

    

});