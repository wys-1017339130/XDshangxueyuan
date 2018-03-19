var buyedInApp = '';
var App = {
  aaa: 50,
  ssl: 'https://online.xdjy100.com/',
  url: 'http://online.xdjy100.com/',
  // ssl: 'https://sxy.kaituocn.com/',
  // url: 'http://sxy.kaituocn.com/',
  imge_url: '../../image/tx_icon.png',
  iss: 'http://cdn.online.xdjy100.com/?r=app&v=',
  guest: 'NDVhOGQ4MzYxNTJiZGMwMGM3ZmZlYzI4YjMwNjhkZDc5ODA5',
  ver: '3.0.0.0',
  tips: function (msg) {
    if (msg.length > 1) {
      api.toast({
        msg: msg,
        duration: 2000,
        location: 'bottom'
      });
    }
  },
  checkToken: function () {
    var apptoken = $api.getStorage('token');
    if (apptoken && apptoken !== App.guest) {
      api.execScript({name: 'root', frameName: 'FM', script: "app.getCourses(1);"});
    } else {
      api.execScript({name: 'root', frameName: 'FM', script: "app.getHomeLink();"});
    }
  },
  checkLogin: function () {
    var token = $api.getStorage('token');
    if (token && (token == App.guest)) {
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
    }else{
      api.execScript({name: 'root', frameName: 'home', script: "app.getUserInfo()"});
    }
  },
  State: function () {
    if ((api.connectionType == 'none') || (api.connectionType == '2g')) {
      if (document.getElementById('warn818')) {
        document.getElementById('warn818').style.display = 'block';
      } else {
        var d = document.createElement("div");
        if (App.iphone) {
          d.setAttribute('data-href', '../../html/me/network.html');
          d.setAttribute('data-name', 'network');
        } else {
          var mySettingInfo = api.require('mySettingInfo');
          App.mySettingInfo = function () {
            mySettingInfo.settingInt({'index': 0}, function (ret, err) {
            });
          }
        }
        d.id = "warn818";
        d.className = "z-column2 fm-title-box";
        d.innerHTML = "<img width='20' style='vertical-align: middle;margin-right: 0.4rem' src='../../image/warn.png'>网络不给力，请检查网络设置<span class='fr'><span style='color: #a88685' class='icon iconfont icon-ch2'></span></span>";
        if (api.winName == 'audio') {
          document.getElementById('audio_nonetwork').insertBefore(d, document.getElementById('audio_nonetwork').firstChild);
        } else {
          document.getElementsByTagName("body")[0].insertBefore(d, document.getElementsByTagName("body")[0].firstChild);
        }
        if (App.iphone) {
          App.init();
        } else {
          document.getElementById('warn818').onclick = function () {
            App.mySettingInfo();
          }
        }
      }
      if (!App.hasTimeOut) {
        App.hasTimeOut = setInterval(function () {
          if ((api.connectionType != 'none') && (api.connectionType != '2g')) {
            document.getElementById('warn818').style.display = 'none';
            clearInterval(App.hasTimeOut);
            App.hasTimeOut = null;
          }
        }, 5000);
      }
      return false;
    }
    return true;
  },
  _html: '../../',
  bindWeChat: function (Ty) {
    var nowx = $api.getStorage('nowx');
    if (!nowx || (nowx != '0')) {
      return true;
    }
    var wx_openid = $api.getStorage('wx_openid');
    if (!wx_openid || (wx_openid.length < 10)) {
      var jump_wx = $api.getStorage('jump_wx');
      if (jump_wx && (jump_wx == '1')) {
        return true;
      }
      if (Ty) {
        api.sendEvent({name: 'IndexEvent', extra: {page: 'bindWeChat'}});
        api.openWin({
          name: 'bindWeChat',
          url: App._html + 'html/me/bindWeChat.html',
          slidBackEnabled: false,
          pageParam: {},
          bounces: false,
          rect: {
            x: 0,
            y: 0,
            w: 'auto',
            h: 'auto'
          }
        });
        return;
      }
      return false;
    }
    return true;
  },
  telInfo: function (Ty) {
    if ($api.getStorage('tel') && $api.getStorage('token') && $api.getStorage('user_id')) {
      var nickname = $api.getStorage('nickname');
      if (nickname && (nickname.indexOf('学员') > -1)) {
        nickname = '';
      }

      if (!nickname || (nickname == 'null')) {
        if (Ty) {
          api.sendEvent({name: 'IndexEvent', extra: {page: 'phoneInfo'}});
          api.openWin({
            name: 'phoneInfo',
            url: App._html + 'html/me/phoneInfo.html',
            slidBackEnabled: true,
            pageParam: {},
            bounces: false,
            rect: {
              x: 0,
              y: 0,
              w: 'auto',
              h: 'auto'
            }
          });
          return;
        }
        return false;
      }
    }
    return true;
  },
  Auth: function (Ty) {
    var token = $api.getStorage('token');
    if (Ty == 0) {

      if (token && (token == App.guest)) {
        return false;
      } else if (token) {
        return true;
      }
      return false;
    }
    if (token && (token == App.guest)) {
      api.execScript({name: 'root', frameName: 'foot', script: "select(0,document.querySelector('#ifoot'));"});
      api.sendEvent({name: 'IndexEvent', extra: {page: 'login'}});
      api.openWin({
        name: 'login',
        url: '../../html/me/login.html',
        reload: false,
        slidBackEnabled: false,
        pageParam: {
          name: 'authentication'
        }
      });
    }
  },
  openWWW: function (win) {
    var status = false;
    var SwipeState = 0;
    if (typeof db != 'object') {
      var db = api.require('db');
    }

    db.selectSql({
      name: 'main',
      sql: ('select * from currentaudio order by `time` desc')
    }, function (ret, err) {
      if (ret.status) {
        // return;
        // alert(JSON.stringify(ret));
        if (ret.data.length > 0) {
          if (api.pageParam.buyed != 0) {
            var dddd = document.createElement("div");
            dddd.style.height = '50px';
            document.querySelector("body").appendChild(dddd);
            status = true;
            SwipeState = 1;
            api.openFrame({
              name: 'smallcontroller',
              url: '../../html/indexgroup/smallcontroller.html',
              rect: {
                x: 0,
                y: api.winHeight,
                w: api.winWidth,
                h: 50
              },
              pageParam: {
                name: 'smallcontroller'
              }
            });

            setTimeout(function () {
              api.animation({
                name: 'smallcontroller',
                delay: 0,
                duration: 500,
                curve: 'ease_in',
                repeatCount: 0,
                translation: {
                  x: 0,
                  y: -49,
                  z: 0
                }
              }, function (ret, err) {
              });
            }, 500);
            setTimeout(function () {
              api.execScript({
                name: 'root',
                script: "getPlayStatus('" + win + "');"
              });
            }, 1000);
          } else {

          }
        }
      }
    });

    //if(App.iphone){
    if (1 == 1) {
      var sy = 0, my = 0;
      var isTouch = true;
      var s_scrollY = 0;
      var m_mcrollY = 0;

      function opentouchS(event) {
        isTouch = true;
        sy = event.changedTouches[0].pageY;
        s_scrollY = window.scrollY;
      }

      function opentouchE(event) {
        if (!isTouch) {
          return;
        }
        my = event.changedTouches[0].pageY;
        if (my < sy) {
          //Swipeup();
        } else if (my > sy) {
          Swipedown();
        }
        isTouch = false;
      }

      if (document.querySelector('#main')) {
        document.querySelector('#main').removeEventListener('touchstart', opentouchS, false);
        document.querySelector('#main').removeEventListener('touchend', opentouchE, false);
        document.querySelector('#main').addEventListener('touchstart', opentouchS, false);
        document.querySelector('#main').addEventListener('touchend', opentouchE, false);
      } else {
        document.querySelector('body').removeEventListener('touchstart', opentouchS, false);
        document.querySelector('body').removeEventListener('touchend', opentouchE, false);
        document.querySelector('body').addEventListener('touchstart', opentouchS, false);
        document.querySelector('body').addEventListener('touchend', opentouchE, false);
      }

    } else {
      api.addEventListener({
        name: 'swipedown'
      }, function (ret, err) {
        Swipedown();
      });

      api.addEventListener({
        name: 'swipeup'
      }, function (ret, err) {
        Swipeup();
      });
    }

    function Swipeup() {
      if (status && (SwipeState == 1)) {
        SwipeState = 2;
        api.animation({
          name: 'smallcontroller',
          delay: 0,
          duration: 500,
          curve: 'ease_in',
          repeatCount: 0,
          translation: {
            x: 0,
            y: 50,
            z: 0
          }
        }, function (ret, err) {
          SwipeState = 3;
        });
      }
    }

    function Swipedown() {
      if (status && (SwipeState == 3)) {
        SwipeState = 2;
        api.animation({
          name: 'smallcontroller',
          delay: 0,
          duration: 500,
          curve: 'ease_in',
          repeatCount: 0,
          translation: {
            x: 0,
            y: -50,
            z: 0
          }
        }, function (ret, err) {
          SwipeState = 1;
        });
      }
    }
  },
  Analysis: function () {
  },
  pages: [],
  iphone: (window.navigator.userAgent.toLowerCase().indexOf(' mac') > -1) ? true : false,
  Refresh: function () {
    api.setCustomRefreshHeaderInfo({
      bgColor: '#eee'
    }, function () {
      //下拉刷新被触发，使用 api.refreshHeaderLoadDone() 结束加载中状态
      Refresh();
    });
  },
  get: function (url, token) {

  },
  file: function (old_file) {
    var file_fix = old_file.split('.');
    // var file_md5 = hex_md5(old_file);
    var file_md5 = old_file;
    var pic = file_fix[0].split('/');
    file_fix = file_fix[file_fix.length - 1];
    if (pic[pic.length - 1].length == 32) {
      var file = pic[pic.length - 1] + '.' + file_fix;
    } else {
      var file = hex_md5(old_file) + '.' + file_fix;
    }
    return {full: file, fix: file_fix, md5: file_md5};
  },
  tapEl: null,
  tapX: 0,
  tapY: 0,
  tapXx: 0,
  tapYy: 0,
  tapFn: function (El) {
  },
  tapTime: 0,
  tapSe: null,
  tap: function (El, fun) {
    El.addEventListener('touchstart', function (event) {
      var touch = event.targetTouches[0];
      App.tapX = touch.pageX;
      App.tapY = touch.pageY;
      El.setAttribute('isMoved', 0);
      App.tapEl = null;
      App.tapFn = function (El) {
      };
      App.tapEl = El;
      App.tapFn = fun;
      App.tapXx = 0;
      App.tapYy = 0;
      App.tapTime = 0;
      App.tapSe = setInterval(function () {
        App.tapTime++;
      }, 100);
    });

    El.addEventListener('touchmove', function (event) {
      if (event.targetTouches.length == 1) {
        var touch = event.targetTouches[0];
        App.tapXx = touch.pageX - App.tapX;
        App.tapYy = touch.pageY - App.tapY;
        El.setAttribute('isMoved', 1);
      }
    });

    //El.removeEventListener('touchend',App.tapFun,false);
    El.addEventListener('touchend', App.tapFun);
  },
  tapFun: function () {
    clearInterval(App.tapSe);
    var El = App.tapEl;

    if (El.getAttribute('id') == 'MessageChat') {
      El.querySelector('#MChat').style.display = 'none';
    } else if (El.className == 'MessageChat') {
      var id = El.getAttribute('data-des');
      $api.rmStorage('chat_' + id);
      El.querySelector('.MChat').style.display = 'none';
    }

    if (El.outerHTML.indexOf('manage_') > 0) {
      App.tapXx = 0;
      App.tapYy = 0;
      App.tapTime = 0;
      App.tapTime = 0;
    } else if ((Math.abs(App.tapXx) < 3) && (Math.abs(App.tapYy) < 3)) {
      //if((isMoved == 0) || ((App.tapXx <20) && (isMoved == 1))){
      App.tapXx = 0;
      App.tapYy = 0;
      App.tapTime = 0;
      //El.setAttribute('isMoved',0);
      if (App.tapTime < 10) {
        App.tapTime = 0;
        App.tapFn && App.tapFn(El);
      }
      event.preventDefault();
      //}
    }
    return;
    if (El.getAttribute('isMoved')) {
      var isMoved = El.getAttribute('isMoved');
      if (El.outerHTML.indexOf('manage_') > 0) {
        App.tapXx = 0;
        El.setAttribute('isMoved', 0);
        App.tapTime = 0;
        //alert('manage_');
      } else {
        //alert(App.tapXx + '|' + App.tapYy + '|' + isMoved);
        if ((Math.abs(App.tapXx) < 3) && (Math.abs(App.tapYy) < 3)) {
          //if((isMoved == 0) || ((App.tapXx <20) && (isMoved == 1))){
          event.preventDefault();
          App.tapXx = 0;
          El.setAttribute('isMoved', 0);
          if (App.tapTime < 5) {
            App.tapTime = 0;
            App.tapFn && App.tapFn(El);
          }
          //}
        }
      }
      App.tapx = false;
    }
  },
  debug: false,
  debug_color: '#000',
  buyedUpCopy: function () {
    window.buyedInApp = 1;
  },
  init: function (fromWeekly) {
    App.buyedUpCopy();
    if (fromWeekly) {
      window.buyedInApp = 1;
    }
    App.TouchX = 0;
    App.TouchY = 0;
    var objs = document.querySelectorAll("[data-href]");
    for (var i in objs) {
      if (typeof objs[i] == 'object') {
        if (App.debug) {
          objs[i].style.backgroundColor = App.debug_color;
        }
        objs[i].setAttribute('tapmode', true);

        //objs[i].onclick = function(){
        //		var href = this.getAttribute("data-href");
        //		var name = this.getAttribute("data-name");
        //		var des = this.getAttribute("data-des");
        App.tap(objs[i], function (El) {
          var _this = El;
          if (_this.getAttribute("id") && (_this.getAttribute("id").indexOf('fm-banner') > -1)) {
            _this = document.querySelector("#" + _this.getAttribute("id"));
          }
          var title = '';
          var href = _this.getAttribute("data-href");
          var name = _this.getAttribute("data-name");
          var des = _this.getAttribute("data-des");
          if (name == 'content' || name == 'write') {
            title = _this.getAttribute("data-title");
          }
          if (' chat audio edit promoter studylist rank download tidings score message likes group mall tucao set '.indexOf(' ' + name + ' ') > -1) {
            if (!App.Auth(0)) {
              App.Auth(1);
              return;
            }
          }
          api.sendEvent({name: 'IndexEvent', extra: {page: name}});

          api.execScript({
            name: 'root',
            script: "App.addpage('" + name + "');"
          });

          api.setStatusBarStyle({style: 'dark'});

          var bounces = false;//新开窗口是否弹动
          var reload = false;
          if (name == 'search_info') {
            reload = true;
          }
          if (href.length < 10) {
            return;
          }
          var animation = {};
          if (!App.iphone) {
            animation = {
              type: "movein",
              subType: "from_right",
              duration: 300
            };
            api.openWin({
              name: name,
              url: href,
              slidBackEnabled: false,
              pageParam: {
                name: name,
                des: des,
                title: title
              },
              reload: reload,
              animation: animation,
              bounces: bounces,
              customRefreshHeader: 'UIPullRefresh',
              rect: {
                x: 0,
                y: 0,
                w: 'auto',
                h: 'auto'
              }
            });
          } else {
            api.openWin({
              name: name,
              url: href,
              reload: true,
              slidBackEnabled: true,
              pageParam: {
                name: name,
                des: des,
                title: title
              }
            });
          }
          //}
        });
      }
    }
    //点列表播放音频并进入audio
    var objs = document.querySelectorAll("[data-link]");
    for (var i in objs) {
      if (typeof objs[i] == 'object') {
        if (App.debug) {
          objs[i].style.backgroundColor = App.debug_color;
        }
        objs[i].setAttribute('tapmode', true);
        App.tap(objs[i], function (El) {
          if (!App.Auth(0)) {
            App.Auth(1);
            return;
          }
          var ilock = El.getAttribute("data-ilock");
          if (ilock == 0) {
            api.toast({
              msg: "完整听完上一节后，此课程才会解锁哦",
              duration: 2000,
              location: 'middle'
            });
            return;
          }
          var type = 1;
          var _this = El;
          var _act = _this.querySelector('.z-title-active') || _this.querySelector('.active');
          if (_act) {
            type = 2;
          }
          ;

          var link = _this.getAttribute("data-link");
          var name = _this.getAttribute("data-name");
          var des = _this.getAttribute("data-des");
          var path = _this.getAttribute("data-path");
          var tid = _this.getAttribute("data-tid");
          var pro = _this.getAttribute("data-pro") || 0;

          var category = _this.getAttribute("data-category") || 0;
          if (window.buyedInApp == 0) {
            api.toast({
              msg: '您尚未激活当前课程',
              duration: 2000,
              location: 'bottom'
            });
          } else {
            api.sendEvent({name: 'IndexEvent', extra: {page: name}});
            api.execScript({
              name: 'root',
              script: "App.addpage('" + name + "');"
            });

            api.execScript({
              name: 'root',
              script: "setNewId();"
            });

            var bounces = false;//新开窗口是否弹动
            var reload = false;
            if (link.length < 10) {
              return;
            }
            var animation = {};
            if (!App.iphone) {
              animation = {
                type: "movein",
                subType: "from_bottom",
                duration: 300
              };
              api.openWin({
                name: name,
                url: link,
                slidBackEnabled: false,
                pageParam: {
                  name: name,
                  des: des,
                  type: type,
                  tid: tid,
                  category: category,
                  pro: pro
                },
                reload: reload,
                animation: animation,
                bounces: bounces,
                customRefreshHeader: 'UIPullRefresh',
                rect: {
                  x: 0,
                  y: 0,
                  w: 'auto',
                  h: 'auto'
                }
              });
            } else {
              api.openWin({
                name: name,
                url: link,
                reload: true,
                slidBackEnabled: true,
                pageParam: {
                  name: name,
                  des: des,
                  type: type,
                  tid: tid,
                  category: category,
                  pro: pro
                }
              });
            }
          }


          // }else{

          //}
        });
      }
    }

    var objs = document.querySelectorAll("[data-edit]");
    for (var i in objs) {
      if (typeof objs[i] == 'object') {
        if (App.debug) {
          objs[i].style.backgroundColor = App.debug_color;
        }
        objs[i].setAttribute('tapmode', true);
        objs[i].onclick = function () {
          var href = this.getAttribute("data-edit");
          var name = this.getAttribute("data-name");
          var type = this.getAttribute("data-type");
          api.sendEvent({name: 'IndexEvent', extra: {page: 'editPage'}});

          api.execScript({
            name: 'root',
            script: "App.addpage('editPage');"
          });

          var animation = {};
          if (!App.iphone) {
            animation = {
              type: "movein",
              subType: "from_right",
              duration: 300
            };
            api.openWin({
              name: 'editPage',
              url: href,
              bounces: false,
              slidBackEnabled: false,
              //animation:animation,
              pageParam: {
                name: name,
                type: type
              },
              rect: {
                x: 0,
                y: 0,
                w: 'auto',
                h: 'auto'
              }
            });
          } else {
            api.openWin({
              name: 'editPage',
              url: href,
              reload: true,
              slidBackEnabled: false,
              pageParam: {
                name: name,
                type: type
              },
            });
          }
        }
      }
    }

    //绑定返回事件
    if (document.querySelector(".z-fanhui")) {
      if (!document.querySelector(".z-fanhui").getAttribute('xd-bind')) {
        document.querySelector(".z-fanhui").setAttribute('xd-bind', true);
        document.querySelector(".z-fanhui").setAttribute('tapmode', true);
        document.querySelector(".z-fanhui").addEventListener('touchstart', function (event) {
          //  		 		if(api.winName == 'write' || api.winName == 'message'){
          //  		 			api.execScript({
          //     name: 'root',
          //     script: "recordPlay();"
          // });
          //  		 		}//处理调用麦克风暂停的问题，但貌似没这个bug苹果，只是声音小了
          if (api.winName == 'edit') {
            api.execScript({
              name: 'root',
              frameName: 'home',
              script: "Refresh();"
            });
          }

          api.execScript({
            name: 'root',
            script: "App.delpage('" + api.winName + "');"
          });

          if (typeof td == 'object') {
            api.execScript({name: 'root', script: "onPageEnd('" + api.winName + "')"});
          }

          var token = $api.getStorage('token');
          if (token && ((api.winName == 'phoneInfo') || (api.winName == 'wxInfo')) && (token != App.guest)) {
            $api.clearStorage();
            api.removePrefs({key: 'face'});
            api.removePrefs({key: 'token'});
            api.removePrefs({key: 'user_id'});
            api.removePrefs({key: 'nickname'});
            api.removePrefs({key: 'company'});
            api.removePrefs({key: 'tel'});
            api.execScript({name: 'root', script: "openLogin()"});
            setTimeout(function () {
              api.closeWin();
            }, 500);
          } else if (token && (api.winName == 'bindWeChat')) {
            $api.setStorage('jump_wx', '1');
            api.closeToWin({
              name: 'root'
            });
          } else {
            if (api.winName == 'audio') {
              api.execScript({name: 'root', script: "(rebot=(isplay?false:true));"});
            }
            api.closeWin();
          }
          event.preventDefault();
        });
      }
    }
    //App.swipeout();
  },
  weeklyInit: function () {
    App.init(true);
  },
  addpage: function (name) {
    var hasname = false;
    for (var i in App.pages) {
      if (App.pages[i] == name) {
        hasname = true;
      }
    }
    // console.log('addpage',name,hasname);
    if (!hasname) {
      App.pages[App.pages.length] = name;
    }
  },
  delpage: function (name) {
    var temp_pages = [];
    for (var i in App.pages) {
      if (App.pages[i] == name) {
        App.pages[i] = '';
      } else {
        temp_pages[temp_pages.length - 1] = App.pages[i];
      }
    }
    App.pages = temp_pages;
  },
  page: function (url, name, x, y, w, h, Param, KillPage, bgColor, bounces) {
    if (KillPage) {
      for (var i in App.pages) {
        if (App.pages[i] != '') {
          api.closeFrame({
            name: App.pages[i]
          });
        }
      }
      App.pages = [];
    }
    App.pages[App.pages.length] = name;
    api.openFrame({
      name: name,
      url: url,
      rect: {
        x: x,
        y: y,
        w: w,
        h: h
      },
      pageParam: Param,
      customRefreshHeader: 'UIPullRefresh',
      bounces: bounces,
      bgColor: bgColor,
      vScrollBarEnabled: true,
      hScrollBarEnabled: false
    });
  },
  time: function () {
    var d = new Date();
    return {y: d.getFullYear(), m: (d.getMonth() + 1), d: d.getDate(), stamp: (Date.parse(new Date()) / 1000)};
  },
  dateStr: function (date) {
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
  },
  dateFM: function (date) {
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();

    var newDate = parseInt(date * 1000);
    var Atime = new Date(newDate);
    var Ayear = Atime.getFullYear();
    var Amonth = Atime.getMonth() + 1;
    var Aday = Atime.getDate();

    var btime = new Date(year, month - 1, day);
    btime = parseInt(btime.getTime());
    if (btime <= newDate) {
      var h = Atime.getHours();
      var m = Atime.getMinutes();
      h = h < 10 ? '0' + h : h;
      m = m < 10 ? '0' + m : m;
      return h + ':' + m + ' ';
    } else if (((btime - 86400000) <= newDate) && (newDate < btime)) {
      return '昨日 ';
    } else {
      return Amonth + '月' + Aday + '日 ';
    }
  },
  _dateStr: function (nS) {
    var str = new Date(parseInt(nS) * 1000);
    str = str.getFullYear() + '年' + str.getMonth() + '月' + str.getDate() + '日 ' + str.getHours() + ':' + str.getMinutes();

    var times = new Date().getTime();
    time = parseInt((times - (nS * 1000)) / 1000);
    var sii = new Date(times - (time * 1000));
    var s;
    var si;

    if (time < 60) {
      return '刚刚';
    } else if (time < 60 * 60 * 24) {
      var h = sii.getHours();
      var m = sii.getMinutes();

      if (h < 10) {
        h = '0' + h.toString();
      }

      if (m < 10) {
        m = '0' + m.toString();
      }

      return h + ':' + m;
    } else {
      var mon = sii.getMonth();
      var d = sii.getDate();
      var h = sii.getHours();
      var m = sii.getMinutes();

      if (d < 10) {
        d = '0' + d.toString();
      }

      if (h < 10) {
        h = '0' + h.toString();
      }

      if (m < 10) {
        m = '0' + m.toString();
      }

      return sii.getMonth() + '月' + d + '日 ' + h + ':' + m;
    }
  },
  Uinfo: function () {
    var face = $api.getStorage('face');
    if (typeof face == 'undefined') {
      return false;
    }

    var face = face.replace('fs://', '../../');

    var objs = document.querySelectorAll("[data-u=face]");
    for (var i in objs) {
      if (typeof objs[i] == 'object') {
        if (objs[i].tagName) {
          if (objs[i].tagName.toLowerCase() == 'img') {
            objs[i].src = face;
          }
        }
      }
    }
    return true;
  },
  Sort: function (arr, empty) {
    var curr = {};
    var reg = /^[A-Za-z]+$/;

    for (var i in arr) {
      if (reg.test(arr[i].substr(0, 1))) {
        var Hv = false;
        for (var j in curr) {
          if (j == arr[i].substr(0, 1).toUpperCase()) {
            curr[j].push(arr[i]);
            Hv = true;
          }
        }

        if (!Hv) {
          curr[arr[i].substr(0, 1).toUpperCase()] = [arr[i]];
        }
      } else {
        var tmp = App.pinyin(arr[i]);
        // console.log(tmp);
        if (reg.test(tmp.substr(0, 1))) {
          var Hv = false;
          for (var j in curr) {
            if (j == tmp.substr(0, 1).toUpperCase()) {
              curr[j].push(arr[i]);
              Hv = true;
            }
          }

          if (!Hv) {
            curr[tmp.substr(0, 1).toUpperCase()] = [arr[i]];
          }
        }
      }
    }
    return curr;
  },
  IsPhoneNumber: function (num) {
    if (isNaN(num)) {
      return true;
    }
    return false;

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (myreg.test(num)) {
      return true;
    }
    return false;
  },
  onscroll: function (fn) {
    window.onscroll = function () {
      var t = document.documentElement.scrollTop || document.body.scrollTop;
      fn && fn(t);
    }
  },
  JSON: function (objStr) {
    objStr = objStr.replace(">", ">");
    objStr = objStr.replace("<", "<");
    objStr = objStr.replace(" ", " ");
    objStr = objStr.replace("\"", '"');
    objStr = objStr.replace("\'", "'");
    //objStr = objStr.replace("\\", "\\\\");
    objStr = objStr.replace("\n", "\\n");
    objStr = objStr.replace("\r", "\\r");
    if (typeof objStr == 'undefined') return [];
    objStr = objStr.replace(/(\n)+|(\r\n)+/g, " ");
    return new Function("return " + objStr)();
  },
  face: function (text) {
    var json = [
      {"name": "Expression_1", "text": "[微笑]"},
      {"name": "Expression_2", "text": "[撇嘴]"},
      {"name": "Expression_3", "text": "[色]"},
      {"name": "Expression_4", "text": "[发呆]"},
      {"name": "Expression_5", "text": "[得意]"},
      {"name": "Expression_6", "text": "[流泪]"},
      {"name": "Expression_7", "text": "[害羞]"},
      {"name": "Expression_8", "text": "[闭嘴]"},
      {"name": "Expression_9", "text": "[睡]"},
      {"name": "Expression_10", "text": "[大哭]"},
      {"name": "Expression_11", "text": "[尴尬]"},
      {"name": "Expression_12", "text": "[发怒]"},
      {"name": "Expression_13", "text": "[调皮]"},
      {"name": "Expression_14", "text": "[呲牙]"},
      {"name": "Expression_15", "text": "[惊讶]"},
      {"name": "Expression_16", "text": "[难过]"},
      {"name": "Expression_17", "text": "[酷]"},
      {"name": "Expression_18", "text": "[冷汗]"},
      {"name": "Expression_19", "text": "[抓狂]"},
      {"name": "Expression_20", "text": "[吐]"},
      {"name": "Expression_21", "text": "[偷笑]"},
      {"name": "Expression_22", "text": "[愉快]"},
      {"name": "Expression_23", "text": "[白眼]"},
      {"name": "Expression_24", "text": "[傲慢]"},
      {"name": "Expression_25", "text": "[饥饿]"},
      {"name": "Expression_26", "text": "[困]"},
      {"name": "Expression_27", "text": "[恐惧]"},
      {"name": "Expression_28", "text": "[流汗]"},
      {"name": "Expression_29", "text": "[憨笑]"},
      {"name": "Expression_30", "text": "[悠闲]"},
      {"name": "Expression_31", "text": "[奋斗]"},
      {"name": "Expression_32", "text": "[咒骂]"},
      {"name": "Expression_33", "text": "[疑问]"},
      {"name": "Expression_34", "text": "[嘘]"},
      {"name": "Expression_35", "text": "[晕]"},
      {"name": "Expression_36", "text": "[疯了]"},
      {"name": "Expression_37", "text": "[衰]"},
      {"name": "Expression_38", "text": "[骷髅]"},
      {"name": "Expression_39", "text": "[敲打]"},
      {"name": "Expression_40", "text": "[再见]"},
      {"name": "Expression_41", "text": "[擦汗]"},
      {"name": "Expression_42", "text": "[抠鼻]"},
      {"name": "Expression_43", "text": "[鼓掌]"},
      {"name": "Expression_44", "text": "[糗大了]"},
      {"name": "Expression_45", "text": "[坏笑]"},
      {"name": "Expression_46", "text": "[左哼哼]"},
      {"name": "Expression_47", "text": "[右哼哼]"},
      {"name": "Expression_48", "text": "[哈欠]"},
      {"name": "Expression_49", "text": "[鄙视]"},
      {"name": "Expression_50", "text": "[委屈]"},
      {"name": "Expression_51", "text": "[快哭了]"},
      {"name": "Expression_52", "text": "[阴险]"},
      {"name": "Expression_53", "text": "[亲亲]"},
      {"name": "Expression_54", "text": "[吓]"},
      {"name": "Expression_55", "text": "[可怜]"},
      {"name": "Expression_56", "text": "[菜刀]"},
      {"name": "Expression_57", "text": "[西瓜]"},
      {"name": "Expression_58", "text": "[啤酒]"},
      {"name": "Expression_59", "text": "[篮球]"},
      {"name": "Expression_60", "text": "[乒乓]"},
      {"name": "Expression_61", "text": "[咖啡]"},
      {"name": "Expression_62", "text": "[饭]"},
      {"name": "Expression_63", "text": "[猪头]"},
      {"name": "Expression_64", "text": "[玫瑰]"},
      {"name": "Expression_65", "text": "[凋谢]"},
      {"name": "Expression_66", "text": "[嘴唇]"},
      {"name": "Expression_67", "text": "[爱心]"},
      {"name": "Expression_68", "text": "[心碎]"},
      {"name": "Expression_69", "text": "[蛋糕]"},
      {"name": "Expression_70", "text": "[闪电]"},
      {"name": "Expression_71", "text": "[炸弹]"},
      {"name": "Expression_72", "text": "[刀]"},
      {"name": "Expression_73", "text": "[足球]"},
      {"name": "Expression_74", "text": "[瓢虫]"},
      {"name": "Expression_75", "text": "[便便]"},
      {"name": "Expression_76", "text": "[月亮]"},
      {"name": "Expression_77", "text": "[太阳]"},
      {"name": "Expression_78", "text": "[礼物]"},
      {"name": "Expression_79", "text": "[拥抱]"},
      {"name": "Expression_80", "text": "[强]"},
      {"name": "Expression_81", "text": "[弱]"},
      {"name": "Expression_82", "text": "[握手]"},
      {"name": "Expression_83", "text": "[胜利]"},
      {"name": "Expression_84", "text": "[抱拳]"},
      {"name": "Expression_85", "text": "[勾引]"},
      {"name": "Expression_86", "text": "[拳头]"},
      {"name": "Expression_87", "text": "[差劲]"},
      {"name": "Expression_88", "text": "[爱你]"},
      {"name": "Expression_89", "text": "[NO]"},
      {"name": "Expression_90", "text": "[OK]"},
      {"name": "Expression_91", "text": "[爱情]"},
      {"name": "Expression_92", "text": "[飞吻]"},
      {"name": "Expression_93", "text": "[跳跳]"},
      {"name": "Expression_94", "text": "[发抖]"},
      {"name": "Expression_95", "text": "[怄火]"},
      {"name": "Expression_96", "text": "[转圈]"},
      {"name": "Expression_97", "text": "[磕头]"},
      {"name": "Expression_98", "text": "[回头]"},
      {"name": "Expression_99", "text": "[跳绳]"},
      {"name": "Expression_100", "text": "[投降]"},
      {"name": "Expression_101", "text": "[激动]"},
      {"name": "Expression_102", "text": "[街舞]"},
      {"name": "Expression_103", "text": "[献吻]"},
      {"name": "Expression_104", "text": "[左太极]"},
      {"name": "Expression_105", "text": "[右太极]"}
    ];

    for (var i = 0; i < json.length; i++) {
      if (json[i].text == '[' + text + ']') {
        return '<img src="../../res/chatbox/emotion/' + json[i].name + '.png" width="22" height="22" />';
        break;
      }
    }
  }
}
App.init();
var PlayStatus = function () {
}
