$(document).ready(function(){
    
    $('#loginSubmit').click(function(){
    var campoNombre = $('#username').val();
    var campoContraseña = $('#password').val();

      $.ajax({  
          method: "POST",
          url: "api/Usuarios/login",  // Envia el login
          data: $("#UsrLogin").serialize(),           
      }).done(function(res) {
        
            if(typeof(res.id) !== undefined){
                  sessionStorage.userId=res.userId;
                  sessionStorage.userToken=res.id;
                  sessionStorage.userTtl=res.ttl;
                  sessionStorage.userCreated=res.created;
                  
                    $.ajax({  
                      method: "GET",
                      url: "api/Usuarios/"+ sessionStorage.userId + '?access_token=' + sessionStorage.userToken,
                      }).done(function (res){
                        sessionStorage.tipoUser=res.tipoUsuario;
                        var reload = "";
                        switch(sessionStorage.tipoUser) {
                            case "Profesor" :
                                reload = "profesor.html";
                                break;
                            case "Alumno" :
                                reload = "alumno.html";
                                break;
                            case "Conserje" :
                                reload = "conserje.html";
                                break;
                            case "Administrador" :
                                reload = "admin.html";
                                break;
                        }
                        window.location.href= reload+"#ini";
                      }).fail(function(evt){
                          var msgError = "ERROR: "+evt.status+" "+evt.statusText;
                      }); 
              } else {
                  console.log("Error");
              }
        }).fail(function(evt){
          if( campoContraseña == "" || campoNombre == ""){
             $("#messageAlerta").fadeIn(50);
             $('#messageAlerta').addClass('alert alert-danger');
             $('#messageAlerta').text("Debe rellenar todos los campos del formulario");
              setTimeout(function() {
                  $("#messageAlerta").fadeOut(1500);
              },3000);
          } else {
          var msgError = "ERROR: "+evt.status+" "+evt.statusText;
             $("#messageAlerta").fadeIn(50);
             $('#messageAlerta').addClass('alert alert-danger');
             $('#messageAlerta').text("Usuario o Contraseña incorrectos");
             setTimeout(function() {
                  $("#messageAlerta").fadeOut(1500);
              },3000);
          }
        });  
    
  // -- Fin AJAX --

  return false;

  });
});
