var Loginpath = '';
var firstClose = function(){isLogin(indexGroup);}

var indexGroup = function(){
	api.execScript({
        name: 'root',
        script: 'openIndexFrameGroup();'
    });
}

var out = function(){
  var noIdentifyPlayNum = parseInt($api.getStorage("noIdentifyPlayNum")) || 0;
  $api.clearStorage();
  $api.setStorage("noIdentifyPlayNum",noIdentifyPlayNum);
	api.removePrefs({key:'face'});
	api.removePrefs({key:'token'});
	api.removePrefs({key:'user_id'});
	api.removePrefs({key:'nickname'});
	api.removePrefs({key:'company'});
	api.removePrefs({key:'tel'});
	api.rebootApp();
}

var offout = function(){
	api.execScript({
    name: 'root',
    script: 'changeIndexMenu(0);'
  });
  $api.clearStorage();
	api.removePrefs({key:'face'});
	api.removePrefs({key:'token'});
	api.removePrefs({key:'user_id'});
	api.removePrefs({key:'nickname'});
	api.removePrefs({key:'company'});
	api.removePrefs({key:'tel'});

	indexOrWelcome(welcome);
}

var openLogin = function(){
	if(api.winName == 'login') return;
	api.sendEvent({name: 'IndexEvent',extra: {page: 'login'}});
    api.openWin({
        name: 'login',
        url: Loginpath + 'html/me/login.html',
        bounces: false,
        slidBackEnabled:false,
        rect: {
            x: 0,
            y: 0,
            w: 'auto',
            h: 'auto'
        },
        allowEdit: true
    });
    Loginpath = '';
};

var isLogin = function(fn){
   var UInfo = UserInfo();

   if(typeof UInfo.user_id == 'undefined'){
        openLogin();
   }else{
     if(fn){
       fn();
     }else{
       api.closeWin();
     }
   }
}

var UserInfo = function(){
	var user_id = $api.getStorage('user_id');
	var token= $api.getStorage('token');
	var nickname= $api.getStorage('nickname');
	var face= $api.getStorage('face');
	var company= $api.getStorage('company');
	var tel= $api.getStorage('tel');
	var isbind = $api.getStorage('isbind');

	var profession = $api.getStorage('profession');
	var industry = $api.getStorage('industry');
	var province = $api.getStorage('province');
	var money= $api.getStorage('money');

	if(!user_id){
		api.getPrefs({
      sync:false,
      key:'user_id'
    },function(ret,err){
    		if(ret.value.length > 3){
    			$api.setStorage('user_id',ret.value);
    		}
    });
	}
	if(!nickname){
		api.getPrefs({
      sync:false,
      key:'nickname'
    },function(ret,err){
    		if(ret.value && (ret.value.length > 1)){
    			nickname = ret.value;
    			$api.setStorage('nickname',ret.value);
    		}
    });
	}
	if(!face){
		api.getPrefs({
      sync:false,
      key:'face'
    },function(ret,err){
    		if(ret.value && (ret.value.length > 3)){
    			face = ret.value;
    			$api.setStorage('face',ret.value);
    		}
    });
	}

	if(!company){
		api.getPrefs({
      sync:false,
      key:'company'
    },function(ret,err){
    		if(ret.value && (ret.value.length > 3)){
    			company = ret.value;
    			$api.setStorage('company',ret.value);
    		}
    });
	}

	if(!tel){
		api.getPrefs({
      sync:false,
      key:'tel'
    },function(ret,err){
    		if(ret.value && (ret.value.length > 3)){
    			tel = ret.value;
    			$api.setStorage('tel',ret.value);
    		}
    });
	}

	if(!isbind){
		api.getPrefs({
      sync:false,
      key:'isbind'
    },function(ret,err){
    		if(ret.value && (ret.value.length > 0)){
    			partnerid = ret.value;
    			$api.setStorage('isbind',ret.value);
    		}
    });
	}

	if(!profession){
		api.getPrefs({
      sync:false,
      key:'profession'
    },function(ret,err){
    		if(ret.value && (ret.value.length > 0)){
    			profession = ret.value;
    			$api.setStorage('profession',ret.value);
    		}
    });
	}

	if(!industry){
		api.getPrefs({
      sync:false,
      key:'industry'
    },function(ret,err){
    		if(ret.value && (ret.value.length > 0)){
    			industry = ret.value;
    			$api.setStorage('industry',ret.value);
    		}
    });
	}

	if(!province){
		api.getPrefs({
      sync:false,
      key:'province'
    },function(ret,err){
    		if(ret.value && (ret.value.length > 0)){
    			province = ret.value;
    			$api.setStorage('province',ret.value);
    		}
    });
	}

	return {
		user_id:user_id,
		token:token,
		nickname:nickname,
		face:face,
		company:company,
		tel:tel,
		profession:profession,
		industry:industry,
		province:province,
		isbind:isbind
	};
}
