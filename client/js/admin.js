function getData(){
  $.ajax({
    method: "GET",
    url: "api/Usuarios/"+ sessionStorage.userId + '?access_token=' + sessionStorage.userToken,
    dataType: "json",
    success: function(data){
      $.each(data,function(registro) {
        $("#Select").append('<option value='+registro.username+'>'+registro.username+'</option>');
      });        
    },
    error: function(data) {
      alert('error');
    }
  });
}