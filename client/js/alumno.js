$(document).ready(function(){
  /*
  IMPORTANTE: para que funcione la vista alumno hay que inrtoducir los siguientes datos en la tabla Matricula:
    {
    "expediente": ** Numero id del alumno **,
    "grupo": "A",
    "curso": 4
    }
  */


  //Este ajax recoje el id del usuario alumno y lo compara con el expediente(Matricula.expediente = Usuario.id)
  //y guarda en sessionStorage el curso y grupo.
  $.ajax({  
          method: "GET",
          url: '/api/Matriculas?filter=%7B%22where%22%3A%7B%22expediente%22%3A%22'+sessionStorage.userId+'%22%7D%7D&access_token=' + sessionStorage.userToken,
         
      }).done(function(res){
              if(typeof(res.id) !== undefined){
                  sessionStorage.curso = res[0].curso;
                  sessionStorage.grupo = res[0].grupo;
              } else {
                  console.log("Error");
              }
        }).fail(function(evt){
          var msgError = "ERROR: "+evt.status+" "+evt.statusText;
          });

  //Mostrar saldo del alumno
  $.ajax({  
          method: "GET",
          url: "api/Usuarios/"+ sessionStorage.userId + '?access_token=' + sessionStorage.userToken,
         
      }).done(function(res){
              if(typeof(res.id) !== undefined){
                  sessionStorage.dinero = res.dinero;
                  $('#saldo').html("Saldo actual: "+sessionStorage.dinero+"€");
              } else {
                  console.log("Error");
              }
        }).fail(function(evt){
          var msgError = "ERROR: "+evt.status+" "+evt.statusText;
          });  

  //Con el curso y grupo guardado miramos los archivos correspondientes en la tabla Grupo
  var rutaUrl = '/api/Grupos?filter=%7B%22where%22%3A%7B%22grupo%22%3A%22'+sessionStorage.grupo+'%22%2C%20%22curso%22%3A%22'+sessionStorage.curso+'%22%7D%7D&access_token='+sessionStorage.userToken;
   $.ajax({  
          method: "GET",
          url: rutaUrl,
      }).done(function(res){
        var cadena = "";
        if(typeof(res.id) !== undefined){  
          for(var x = res[0].archivos.length-1; x >= 0 ; x = x -1){
            cadena = cadena + res[0].archivos[x]+"\n";
          }
          $('#pendientes').html(cadena);
        }
       
              
        }).fail(function(evt){
          var msgError = "ERROR: "+evt.status+" "+evt.statusText;
         });

        $('#logout').click(function(){
          sessionStorage.removeItem("curso");
          sessionStorage.removeItem("grupo");
        });

});
