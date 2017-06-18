$(document).ready(function(){
      $.ajax({  
          method: "GET",
          url: "api/Usuarios/"+ sessionStorage.userId + '?access_token=' + sessionStorage.userToken,
         
      }).done(function(res){
              if(typeof(res.id) !== undefined){
                  sessionStorage.username=res.username;
                  $('#nombreUsuario').html(res.nombre +" "+res.apellidos);
              } else {
                  console.log("Error");
              }
        }).fail(function(evt){
          var msgError = "ERROR: "+evt.status+" "+evt.statusText;
          $('#messageAlerta').html('Error al actualizar datos.');
          });  
    
  // -- Fin AJAX --
      $('#logout').click(function(){
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("userToken");
        sessionStorage.removeItem("userTtl");
        sessionStorage.removeItem("userCreated");
        sessionStorage.removeItem("username");

        window.location.href = "index.html";
      });

  });