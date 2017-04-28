module.exports = function(app) {
  if (process.env.AUTOMIGRATE) {
    var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];
    app.dataSources.db.automigrate(lbTables, function(er) {
      if (er) throw er;
      console.log('Loopback tables [', lbTables, '] created in ', app.dataSources.db.adapter.name);
      var fotocopiasTables = ['Administrador','Alumno', 'Conserje', 'Grupo', 'MateriaImpartida', 'MateriaMatriculada', 'Materia', 'Matricula', 'Profesor', 'Usuario'];
      app.dataSources.db.automigrate(fotocopiasTables, function(er) {
        if (er) throw er;
        console.log('Loopback tables [', fotocopiasTables, '] created in ', app.dataSources.db.adapter.name);
      });
    });
  }
};
