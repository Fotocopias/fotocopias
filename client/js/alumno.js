var archivos = []; // archivos pendientes del campo archivos de grupos
var archivosDescargar = []


$(document).ready(function(){

  if(location.hash == "#ini") {
    var url = window.location.toString().split("/");
    var posicion = parseInt(url.length)-parseInt(1);
    setTimeout(function(){ window.location.href = "alumno.html"; }, 500);

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
 
   var rutaUrl = '/api/Grupos?filter=%7B%22where%22%3A%7B%22grupo%22%3A%22'+sessionStorage.grupo+'%22%2C%20%22curso%22%3A%22'+sessionStorage.curso+'%22%7D%7D&access_token='+sessionStorage.userToken;
   $.ajax({  
          method: "GET",
          url: rutaUrl,
      }).done(function(res){
        var cadena = "";
        if(typeof(res.id) !== undefined){
            cadena = cadena + '<ul>';  
            var cont = 0;
          
              for(var x = res[0].archivos.length-1; x >= 0 ; x = x -1){
                archivos.push(res[0].archivos[x]); // Meto los archivos pendientes en el array archivos
              
                cadena = cadena +'<li><a onclick="mandarConserje(this)" style="cursor:pointer;">'+ res[0].archivos[x]+'</a></li>'+"\n";
               
              }

            if(cont == archivos.length){
             archivos = [];
            }
         

          cadena = cadena + '</ul>';
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

//INTENTO DE UPDATE

function mandarConserje(obj) {
  var file = $(obj).html();
  archivosDescargar.push(file);


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
    for(var i = 0; i < archivos.length; i++){
      if( archivos[i] == element){
          archivos[i] = "";
        }
    }
    listarArchivos();
    $("#pendientes").after("<li>El archivo: <a>"+element+"</a> ha sido enviado para imprimir.</li>");


}


function listarArchivos(){
  var cadena = "";
  cadena = cadena + '<ul>'; 
     for(var i = 0; i < archivos.length; i++){
        if(archivos[i] != "")
        cadena = cadena +'<li><a onclick="mandarConserje(this)" style="cursor:pointer;">'+ archivos[i]+'</a></li>'+"\n";
    }
    cadena = cadena + '</ul>';
    $('#pendientes').html(cadena);
}


$('#imprimir').click(function(){
var alumnos = "";

  var rutaUrl = '/api/Grupos?filter=%7B%22where%22%3A%7B%22curso%22%3A%22'+sessionStorage.curso+'%22%2C%22grupo%22%3A%22'+sessionStorage.grupo+'%22%7D%7D&access_token='+sessionStorage.userToken;
   $.ajax({  
          method: "GET",
          url: rutaUrl,
      success: function (res) {
          var grupos ='';
          for (y in res[0].archivosDescargar) {
            //alert(data[x]["grupo"]);
            //console.log(data[x]["archivosDescargar"][0]);
            for (idalumno in res[0].archivosDescargar[y]) {
              var listaArchivos= "<ul>";
              for(z in res[0].archivosDescargar[y][idalumno]){
                var file = res[0].archivosDescargar[y][idalumno][z];
                listaArchivos = listaArchivos + 
                '<li><a data-action="file" style="cursor: pointer;" id="'+idalumno+'" onclick="dowload(this)" data-id="'+file+'">'+res[0].archivosDescargar[y][idalumno][z]+'</a></li>';
              }
              listaArchivos = listaArchivos + '</ul>';
              
            }

            /*var curso = data[x]["curso"]+'º '+data[x]["grupo"]
              grupos = grupos+'<li>'+
              '<button type="button" class="btn btn-info" data-toggle="collapse" data-target="#curso'+curso+'">Curso: '+curso+'</button>'+
                '<div id="curso'+curso+'" class="collapse">'+alumnos+'</div></li>';*/
          }
          //grupos = grupos + "</ul>";

        $('#pendientes').html(listaArchivos);

      }

        });
});