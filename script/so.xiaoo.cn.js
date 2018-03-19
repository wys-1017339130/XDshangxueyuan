if(document.getElementById('fixStatus')){
	var u = window.navigator.userAgent;
	 if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
		var num = u.substr(u.indexOf('Android') + 8, 3);
		if(num<4.4){
			document.getElementById('fixStatus').style.height = '44px';
		}else{
			document.getElementById('fixStatus').style.height = '64px';
		}
	}
}
