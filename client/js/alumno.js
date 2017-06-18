var archivosAlumno = []; // archivos pendientes del campo archivos de grupos
var archivosDescargar = []
var numPdf = "";
var total = "";
var restaFotocopia = "";

$(document).ready(function(){

$('#content').html('<div><img src="imagenes/ajax-loader(1).gif"/></div>');
   $('#content').hide();

  if(location.hash == "#ini") {
    $('#alumno').hide();
    var url = window.location.toString().split("/");
    var posicion = parseInt(url.length)-parseInt(1);
    $('#content').show();
      setTimeout(function(){  $('#content').hide(); }, 1500);
    setTimeout(function(){ window.location.href = "alumno.html"; }, 1500);

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
 

        $('#logout').click(function(){
          sessionStorage.removeItem("curso");
          sessionStorage.removeItem("grupo");
          sessionStorage.removeItem("tipoUser");
        });

});

//INTENTO DE UPDATE

function mandarConserje(obj) {
$(document).on("click", ".pdf-file", function(e){
      e.preventDefault();
      var cPdf = $(this).attr("href");
      console.log("Se ha hecho click en el enlace del pdf -> "+cPdf);
      PDFJS.getDocument(cPdf).then(function(pdf) {
        //numPdf = pdf.numPages;
        total = parseInt(pdf.numPages) * 0.05;
        //sessionStorage.guardaPrecioFotocopia = total;
        //alert( pdf.numPages+ " *0.05 = " + total);
        var cuantia = sessionStorage.dinero;
        restaFotocopia = parseFloat(cuantia) - parseFloat(total).toFixed(2);
        //alert(parseInt(sessionStorage.dinero) +"-"+ parseInt(total));
        //alert("Dinero restante: "+ restaFotocopia);
        //sessionStorage.guardaRestante = restaFotocopia;
      
if((parseFloat(total).toFixed(2)) <= parseFloat(cuantia)) {
var r = confirm("Fotocopias: "+pdf.numPages+"\n"+"Coste de Fotocopias: " +total.toFixed(2)+"€. \nSu saldo restante será: "+parseFloat(restaFotocopia).toFixed(2)+"€");
  if (r == true) { 
    $.ajax({
      url: "api/Usuarios/update?where=%7B%22username%22%3A%22"+sessionStorage.username+"%22%7D&access_token="+ sessionStorage.userToken,
      method: "POST",
      data: { "dinero": parseFloat(restaFotocopia) },
        success: function(data) {
          var file = $(obj).html();
          archivosDescargar.push(file);
          $.ajax({
              url: '/api/Grupos/update?where=%7B%22curso%22%3A%22'+sessionStorage.curso+'%22%2C%22grupo%22%3A%22'+sessionStorage.grupo+'%22%7D&access_token='+sessionStorage.userToken,
                method: "POST",
                // donde pone id no he podido poner el session storage no coge las comillas 
                // hay que solucionarlo

                data: {  "archivosDescargar": [{ [sessionStorage.username] : [archivosDescargar] }]  },
                success: function(data) {
                  actualizarArchivos(file);
                  location.reload();
                }
            });

        }
      });
  } else {
    document.location.href = "alumno.html";
  }
} else {
  alert("No tienes suficiente dinero");
}
  });
      //console.log(numPdf);
  });
}

// Funcion para borrar del campo archivos el archivo que se ha pasado a archivos Descargar
function actualizarArchivos(element){ 

var cont = 0;
var arraylengt = archivosAlumno.length;

    for(var i = 0; i < arraylengt; i++){

        if( archivosAlumno[i] == element){
          archivosAlumno[i] = "";
        }
    }
  
$.ajax({
    url: '/api/Grupos/update?where=%7B%22curso%22%3A%22'+sessionStorage.curso+'%22%2C%22grupo%22%3A%22'+sessionStorage.grupo+'%22%7D&access_token='+sessionStorage.userToken,
      method: "POST",
      data:{ "archivosAlumno": archivosAlumno },
      success: function(data) {
        console.log("exito al actualizar archivos");
        vaciarArchivosAlumno();
        listarArchivos();
        $("#pendientes").append('<div class="alert alert-success alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> EL archivo: <a>'+element+'</a> ha sido enviado para imprimir.</div> ');


      }
  });


}
function vaciarArchivosAlumno(){
var cont = 0;
  for(var i = 0; i < archivosAlumno.length; i++){
    if(archivosAlumno[i] == ""){
      cont++;
    }
  }       
  if(cont == archivosAlumno.length){
   
  $.ajax({
      url: '/api/Grupos/update?where=%7B%22curso%22%3A%22'+sessionStorage.curso+'%22%2C%22grupo%22%3A%22'+sessionStorage.grupo+'%22%7D&access_token='+sessionStorage.userToken,
      method: "POST",
      data:{ "archivosAlumno": "[]"},
      success: function(data) {
      }
    });
  }
}
muestraArchivos();

function listarArchivos(){
  var cadena = "";
  cadena = cadena + '<ul>'; 
     for(var i = 0; i < archivosAlumno.length; i++){
        if(archivosAlumno[i] != "")
          cadena = cadena +'<li><a onclick="mandarConserje(this)" style="cursor:pointer;">'+ archivosAlumno[i]+'</a></li>'+"\n";
    }
    cadena = cadena + '</ul>';
    $('#pendientes').html(cadena);
}


$('ul li [href="#imprimir"]').click(function(){
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
             
              for(z in res[0].archivosDescargar[y][idalumno]){
                var file = res[0].archivosDescargar[y][idalumno][z];
                var file = file.toString().split(',')
                 var listaArchivos= "<ul>";
                for(var i = 0; i < file.length ; i++){
                  if(file[i] != ""){
                     listaArchivos = listaArchivos + 
                    '<li><a>'+file[i]+'</a></li>';
                  }
                 
                }
                 listaArchivos = listaArchivos + '</ul>';

           
              }
             
              
            }

            /*var curso = data[x]["curso"]+'º '+data[x]["grupo"]
              grupos = grupos+'<li>'+
              '<button type="button" class="btn btn-info" data-toggle="collapse" data-target="#curso'+curso+'">Curso: '+curso+'</button>'+
                '<div id="curso'+curso+'" class="collapse">'+alumnos+'</div></li>';*/
          }
          //grupos = grupos + "</ul>";

        $('#imprimir').html(listaArchivos);

      }

        });
});

$('#muestrame').click(function(){
  muestraArchivos();
});

function muestraArchivos() {
   var rutaUrl = '/api/Grupos?filter=%7B%22where%22%3A%7B%22grupo%22%3A%22'+sessionStorage.grupo+'%22%2C%20%22curso%22%3A%22'+sessionStorage.curso+'%22%7D%7D&access_token='+sessionStorage.userToken;
   $.ajax({  
          method: "GET",
          url: rutaUrl,
      }).done(function(res){
        var cadena = "";
        if(typeof(res.id) !== undefined){
            cadena = cadena + '<ul>';  
            var cont = 0;
          var rute =  "/api/containers/download/download/";
              for(var x = res[0].archivosAlumno.length-1; x >= 0 ; x = x -1){
                archivosAlumno.push(res[0].archivosAlumno[x]); // Meto los archivos pendientes en el array archivos
                if ( res[0].archivosAlumno[x] != ""){
                 cadena = cadena +'<li><a href="'+rute+res[0].archivosAlumno[x]+'" class="pdf-file" onclick="mandarConserje(this)" style="cursor:pointer;">'+ res[0].archivosAlumno[x]+'</a>'+"\n"+'</li>';
               }
              }
          cadena = cadena + '</ul>';
          $('#pendientes').html(cadena);
          //El seguiente codio es para recoger los valores del campo archivosDescargar
          for(var x = res[0].archivosDescargar.length-1; x >= 0 ; x = x -1){
            if(res[0].archivosDescargar[x][sessionStorage.username] != ""){
              var arrayDesgargar = res[0].archivosDescargar[x][sessionStorage.username];
              archivosDescargar = arrayDesgargar.toString().split(',');
            }

          }
        
        }
       
              
        }).fail(function(evt){
          var msgError = "ERROR: "+evt.status+" "+evt.statusText;
    });

    

}