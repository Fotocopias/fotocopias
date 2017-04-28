var baseurl = "http://localhost:3000/";//baseurl
 
//en ie8 no funciona preventDefault
function prevencionDefecto(event) 
{
    (event.preventDefault) ? event.preventDefault() : event.returnValue = false;
}
 
$(document).ready(function()
{
    //al hacer submit al formulario de login
    $("#loginSubmit").on("submit", function(e) 
    {
        //prevenimos el comportamiento por defecto
        prevencionDefecto(e);
 
        //obtenemos los valores que necesitamos para procesar el formulario
        var username = $("#username").val(),
        password = $("#password").val();
 
        //sencilla comprobacion para que venga algo de información
        if(username.length < 4 || password.length < 6)
        {
            showModal("Error formulario","Los campos no pueden estar vacios.");
            return false;
        }
 
        //si todo ha ido bien procesamos la petición con node
        $.ajax({
            method: "POST",//metodo|verbo con el que procesamos la peticion
            url: baseurl + "login",//url a la que hacemos la petición
            data: $(this).serialize(),//datos del formulario
            success: function(data){  
                //si los datos de acceso no son correctos
                if(data === "error")
                {
                    showModal("Datos incorrectos","Los datos de acceso son incorrectos.");
                }
                else
                {
                    window.location.href = baseurl + "home";
                }
            },
            error: function(jqXHR, exception){
                showModal("Error","Error procesando la petición.");
            }
        });  
    }); 
});
 
//funcion que recibe como parametros el titulo y el mensaje de la ventana modal
//reaprovechar codigo siempre que se pueda
function showModal(title,message)
{
    $("h2.title-modal").text(title);
    $("p.messageModal").text(message);
    $("#myModal").modal('show');
}