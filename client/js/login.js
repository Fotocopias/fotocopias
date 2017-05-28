$(document).ready(function(){

    /*sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("userTtl");
    sessionStorage.removeItem("userCreated");
    sessionStorage.removeItem("username");*/

  $('#loginSubmit').click(function(){

      $.ajax({  
          method: "POST",
          url: "api/Usuarios/login",  // Envia el login
          data: $("#UsrLogin").serialize(),           
      }).done(function(res){
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
                        switch(sessionStorage.tipoUser) {
                            case "Profesor" :
                                window.location.href = "profesor.html";
                                break;
                            case "Alumno" :
                                window.location.href = "alumno.html";
                                break;
                            case "Conserje" :
                                window.location.href = "conserje.html";
                                break;
                            case "Administrador" :
                                window.location.href = "admin.html";
                                break;
                        }
                        /*if (sessionStorage.tipoUser == "Alumno") {
                            window.location.href = "alumno.html";  
                        }else if (sessionStorage.tipoUser == "Profesor") {
                            window.location.href = "profesor.html"; 
                         }*/
                      }).fail(function(evt){
                          var msgError = "ERROR: "+evt.status+" "+evt.statusText;
                      });   
              } else {
                  console.log("Error");
              }
        }).fail(function(evt){
          var msgError = "ERROR: "+evt.status+" "+evt.statusText;
          $('#messageAlerta').html('El usuario o contraseña son incorrectos.');
        });  
    
  // -- Fin AJAX --

  return false;

  });
});
