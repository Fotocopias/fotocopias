var archivos = []; // archivos pendientes del campo archivos de grupos
var archivosDescargar = []

$(document).ready(function(){
  if(location.hash == "#ini") {
    var url = window.location.toString().split("/");
    var posicion = parseInt(url.length)-parseInt(1);
    window.location.href = "alumno.html";

  }
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
  listarArchivos();


        $('#logout').click(function(){
          sessionStorage.removeItem("curso");
          sessionStorage.removeItem("grupo");
        });

});

//INTENTO DE UPDATE

function mandarConserje(obj) {
  var file = $(obj).html();
  archivosDescargar.push(file);
  var user = sessionStorage.username.toString();
    $.ajax({
      url: '/api/Grupos/update?where=%7B%22curso%22%3A%22'+sessionStorage.curso+'%22%2C%22grupo%22%3A%22'+sessionStorage.grupo+'%22%7D&access_token='+sessionStorage.userToken,
        method: "POST",
        // donde pone id no he podido poner el session storage no coge las comillas 
        // hay que solucionarlo
          data: {  "archivosDescargar": [{ "ricar14" : [archivosDescargar] }]  },
        success: function(data) {
          console.log("exito");
          actualizarArchivos(file);
          

        }
    });
}
//{  "archivosDescargar": [{ '"'+sessionStorage.username+'"' : ['"'+value+'"'] }]  },

// Funcion para borrar del campo archivos el archivo que se ha pasado a archivos Descargar
function actualizarArchivos(element){

var cont = 0;
var arraylengt = archivos.length;

    for(var i = 0; i < arraylengt; i++){

        if( archivos[i] == element){
          var removed = archivos.splice(i, 1);
        }
   
    }

// ********************************************************
// Cuando hay dos archivos el splice que borra el elemento del array lo hace bien pero cuando 
// hay un solo elemento no lo borra no tengo ni idea de porque??
// *************************************************************   
$.ajax({
    url: '/api/Grupos/update?where=%7B%22curso%22%3A%22'+sessionStorage.curso+'%22%2C%22grupo%22%3A%22'+sessionStorage.grupo+'%22%7D&access_token='+sessionStorage.userToken,
      method: "POST",
      data:{ "archivos": archivos },
      success: function(data) {
        console.log("exito al actualizar archivos");
        listarArchivos();
        $("#pendientes").after("<li>El archivo: <a>"+element+"</a> ha sido enviado para imprimir.</li>");
      }
  });


}

//Con el curso y grupo guardado miramos los archivos correspondientes en la tabla Grupo
function listarArchivos(){
  var rutaUrl = '/api/Grupos?filter=%7B%22where%22%3A%7B%22grupo%22%3A%22'+sessionStorage.grupo+'%22%2C%20%22curso%22%3A%22'+sessionStorage.curso+'%22%7D%7D&access_token='+sessionStorage.userToken;
   $.ajax({  
          method: "GET",
          url: rutaUrl,
      }).done(function(res){
        var cadena = "";
        if(typeof(res.id) !== undefined){
            cadena = cadena + '<ul>';  
          for(var x = res[0].archivos.length-1; x >= 0 ; x = x -1){
            archivos.push(res[0].archivos[x]); // Meto los archivos pendientes en el array archivos
            cadena = cadena +'<li><a onclick="mandarConserje(this)" style="cursor:pointer;">'+ res[0].archivos[x]+'</a></li>'+"\n";
          }
          cadena = cadena + '</ul>';
          $('#pendientes').html(cadena);
        }
       
              
        }).fail(function(evt){
          var msgError = "ERROR: "+evt.status+" "+evt.statusText;
         });
}

$('#imprimir').click(function(){
$.ajax({  
          method: "GET",
          url: '/api/Grupos?filter=%7B%22where%22%3A%7B%22grupo%22%3A%22'+sessionStorage.grupo+'%22%2C%20%22curso%22%3A%22'+sessionStorage.curso+'%22%7D%7D&access_token='+sessionStorage.userToken,
      }).done(function(res){
        var cadena = "";
        if(typeof(res.id) !== undefined){
            cadena = cadena + '<ul>';  
          for(var x = res[0].archivosDescargar.length-1; x >= 0 ; x = x -1){
            cadena = cadena +'<li><a href="">'+ res[0].archivosDescargar[x]+'</a></li>'+"\n";
          }
          cadena = cadena + '</ul>';
          $('#pendientes').html(cadena);
        }
       
              
        }).fail(function(evt){
          var msgError = "ERROR: "+evt.status+" "+evt.statusText;
         });
});