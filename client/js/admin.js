$(document).ready(function(){
  $('#mostrarUsuario').click(function(){
      $.ajax({  
          method: "GET",
          url: 'api/Usuarios/'+$('#nombre').val()+'?access_token='+sessionStorage.userToken,
      }).done(function(res){
              if(typeof(res.id) !== undefined){
                    $('#alumnoIndicado').html("Nombre: "+res.nombre+" "+res.apellidos+"\n"+"Usuario: "+res.username+"\n"+"Tipo: "+res.tipoUsuario+"\n"+"Saldo: "+res.dinero+"€");
              }
              
        }).fail(function(evt){
          var msgError = "ERROR: "+evt.status+" "+evt.statusText;
          $('#messageAlerta').html('Error al actualizar datos.');
          });

   });

  $('#meterDinero').click(function(){
  var nombres = $('#nombre').val();
  var rutaUrl = 'api/Usuarios/'+nombres+'?access_token='+sessionStorage.userToken;
      $.ajax({  
          method: "GET",
          url: rutaUrl,
      }).done(function(res){
              if(typeof(res.id) !== undefined){
                  sessionStorage.username=res.username;
                  sessionStorage.nombre=res.nombre;
                  sessionStorage.apellidos=res.apellidos;
                  sessionStorage.dinero=res.dinero;
                  sessionStorage.tipo=res.tipoUsuario;
                  	
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
                          window.load();
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
