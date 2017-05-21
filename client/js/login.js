$(document).ready(function(){

  $('#loginSubmit').click(function(){
          var username = $('#username').val();
          var password = $('#password').val();


      $.ajax({  
          method: "POST",
          url: "api/Usuarios/login",  // Envia el login
          data: $("#UsrLogin").serialize(),  
         // success: function(msg){  
         
      }).done(function(res){
              if(typeof(res.id) !== undefined){
                  window.location.href = "profesor.html";
                  console.log("Logeo exitoso");
              } else {
                  console.log("Error");
              }
        }).fail(function(evt){
          var msgError = "ERROR: "+evt.status+" "+evt.statusText;
          });  
    
  // -- Fin AJAX --

  return false;

  });
});

/*
$.ajax({  
        type: "POST",
        url: "api/Usuarios/login",  // Envia el login
        data: $("#UsrLogin").serialize(),  
        success: function(msg){  
       
      }).done(function(res){

      })
    .fail(function(evt){
        var msgError = "ERROR: "+evt.status+" "+evt.statusText;
    }); 
    */