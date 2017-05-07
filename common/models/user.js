 
var sqlite3 = require('sqlite3').verbose(),//necesario para utilizar sqlite3
db = new sqlite3.Database('fotocopias'),//creamos la base de datos llamada fotocopias si no existe
UserModel = {};//objeto para exportar y manejar la información del modelo
 
//hacemos login al usuario si existe en la tabla usuarios
UserModel.loginUser = function(userData, callback)
{
	//consultamos si existe el usuario y sus credenciales son correctas, así escapamos los datos
	stmt = db.prepare("SELECT * FROM usuario WHERE username = ? AND password = ?");
	//pasamos el nombre del usuario y el password a la consulta
    stmt.bind(userData.username, userData.password); 
    //usamos get para obtener una fila, así podemos devolver los datos del usuario
    stmt.get(function(error, row) 
    {
        if(error) 
        {
            throw err;
        } 
        else 
        {
            if(row)
            {
                callback({msg:"logueado",data:row});
            }
            else
            {
            	callback({msg:"error",data:""});
            }
        }
    });
}
 

module.exports = UserModel;