function showAlert(tipo, msg, time, callback)
{
	var bCallBack = false;
	if(callback != undefined){ bCallBack = true; }
	var cClassAlert = '';
	var cIco = '';
	switch(tipo)
	{
		case 'error':
			cClassAlert = 'alert-danger';
			cIco = 'fa-exclamation-triangle';
			break;
		case 'ok':
			cClassAlert = 'alert-success';
			cIco = 'fa-exclamation-triangle';
			break;
		case 'info':
			cClassAlert = 'alert-info';
			cIco = 'fa-exclamation-triangle';
			break;
		case 'warng':
			cClassAlert = 'alert-warning';
			cIco = 'fa-exclamation-triangle';
			break;
	}

	var cHtml = '<div class="alert '+cClassAlert+'" role="alert">';
	cHtml += '<span class="fa '+cIco+'"></span>&nbsp;&nbsp;';
	cHtml += msg
	cHtml += '</div>';

	if(bCallBack){ callback(); }

}