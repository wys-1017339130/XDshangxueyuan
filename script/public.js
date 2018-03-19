var baseUrl = App.url + 'api.php';

var baseimageUrl = App.url;

var urlsImg = App.imge_url;

function closeWindow(winName) {
  if (winName) {
    api.closeWin({
      name: winName,
      animation: "reveal"
    });
  } else {
    api.closeWin({
      animation: "reveal"
    });
  }
}
function add0(m) {
  return m < 10 ? '0' + m : m
}
function jitianqian(diff) {
  if (diff > 31536000) {
    return parseInt(diff / 31536000) + '年前';
  } else if (diff > 2592000) {
    return parseInt(diff / 2592000) + '月前';
  } else if (diff > 86400) {
    return parseInt(diff / 86400) + '天前';
  } else if (diff > 3600) {
    return parseInt(diff / 3600) + '小时前';
  } else if (diff > 60) {
    return parseInt(diff / 60) + '分钟前';
  } else {
    return diff + '秒前';
  }
}

function dateStr(date) {
  //获取js 时间戳
  var time = new Date().getTime();
  //去掉 js 时间戳后三位，与php 时间戳保持一致
  time = parseInt((time - date * 1000) / 1000);
  //存储转换值
  var s;
  if (time < 60 * 10) {//十分钟内
    return '刚刚';
  } else if ((time < 60 * 60) && (time >= 60 * 1)) {
    //超过十分钟少于1小时
    s = Math.floor(time / 60);
    return s + "分钟前";
  } else if ((time < 60 * 60 * 24) && (time >= 60 * 60)) {
    //超过1小时少于24小时
    s = Math.floor(time / 60 / 60);
    return s + "小时前";
  } else if ((time < 60 * 60 * 24 * 3) && (time >= 60 * 60 * 24)) {
    //超过1天少于3天内
    s = Math.floor(time / 60 / 60 / 24);
    return s + "天前";
  } else {
    //超过3天
    var date = new Date(parseInt(date) * 1000);
    //return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
    return (date.getMonth() + 1) + "-" + date.getDate();
  }
}

function toastMsg(msg) {
  api.toast({
    msg: msg,
    duration: 2000,
    location: "middle"
  });
}
function formatImg(imgUrl) {
  if (imgUrl) {
    if (imgUrl.indexOf('/uploads/') !== -1) {
      imgUrl = App.url + imgUrl;
    } else if (imgUrl.indexOf('/Public/') !== -1) {
      imgUrl = App.url + imgUrl;
    } else if (imgUrl.indexOf('/qr/') !== -1) {
      imgUrl = App.url + imgUrl;
    } else if (imgUrl.indexOf('/temp/') !== -1) {
      imgUrl = App.url + imgUrl;
    } else if (imgUrl.indexOf('/face/') !== -1) {
      imgUrl = App.url + imgUrl;
    }
    return imgUrl
  } else {
    return urlsImg;
  }
}

function allcountFun(a, b) {
  // console.log(a + '=' + b)
  if (a && b) {
    var c = parseInt(a) + parseInt(b);
    return c + '人购买';
  } else {
    return ''
  }

}

function sendAjax(_this, post, cmd, callback) {
  Vue.http.options.emulateJSON = true;
  _this.$http.post(baseUrl + cmd, post).then(function (res) {
    // alert(JSON.stringify(res.data));
    api.hideProgress();
    switch (res.data.code) {
      case 1:
        callback(res.data);
        break;
      case -7:
        toastMsg(res.data.message);
        api.sendEvent({name: 'IndexEvent', extra: {page: 'login'}});
        api.openWin({
          name: 'login',
          url: '../../html/me/login.html',
          reload: false,
          pageParam: {
            name: 'authentication'
          },
          slidBackEnabled: true
        });
        break;
      case -11:
        // 营销课程 课程不存在=>指向外链
        break;
      case -43:
        toastMsg(res.data.message);
        callback(res.data);
        break;
      case -55:
        toastMsg(res.data.message);
        break;
      default:
        api.toast({
          'msg': res.data.message
        });
        break;
    }
  }, function () {
    api.hideProgress();
    toastMsg('网络错误');
  });
}

//content转化为html
function charToHtml(str) {
  if (str) {
    str = str.replace(/&amp;/g, '&');
    str = str.replace(/&lt;/g, '<');
    str = str.replace(/&gt;/g, '>');
    str = str.replace(/&quot;/g, "'");
    str = str.replace(/&#039;/g, ' ');
  }
  return str;
}

