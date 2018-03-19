var XO = {
  isFrist: true,
  Online: true,
  SysBg: false,
  logContent: '',
  SysFun: function () {
  },
  Offline: function () {
    api.hideProgress();
    return false;
  },
  Frist: function (callFr) {
    XO.exec(callFr, false, XO.isFrist);
  },
  pcDebug: true,
  IS: new xiaoo.HttpClient(
    App.url + '/?r=app&v=' + App.ver,
    ["ms", "makeBug", "getToken", "FAQ", "Help", "GetCode", "Pin", "CheckBind", "ST", "GetBanner",
      "AddLike", "DelLike", "PostComments", "GetComments", "GetTopicComments", "PostTopicComments",
      "Login", "GetFirst", "GetList", "GetColumn", "GetContent", "Search", "GetUser", "GetStudy", "GetRank",
      "GetEveryday", "GetPlan", "ChangePlan", "GetMoreNew", "Learn", "GetLike", "GetMostLike",
      "PostUser", "GetRadio", "GetEveryday", "GetUinfo", "GetMessage", "GetHot", "GetMostMessage",
      "GetTag", "GetComment", "DelComment", "GetWeekly", "GetScore", "GetTidings", "GetProfession",
      "PostFeedBack", "GetProDetail", "CheckLike", "GetAudioMessage", "AddLikeMessage", "DelLikeMessage",
      "DelMessage", "GetPromoter", "GetTask", "Get_AudioTask", "GetAudioContent", "GetChat", "BroURL",
      "PostTask", "AddLikeTask", "DelLikeTask", "DelTask", "GetMall", "HotSearch", "GetGroup", "GroupDetail",
      "PostTopicMessage", "PostTopicChat", "Exchange", "GetNewRank", "CheckShare", "GetYuPan", "YuPan", "GetEmba", "GetStudyList",
      "SCore", "GetRule", "GetAbout", "CheckReg", "Profile", "GetAudioInfo", "GetPPT", "getWXOpen", "BindUser"
    ], {timeout: 20000}
  ),
  ISS: new xiaoo.HttpClient('http://cdn.online.xdjy100.com/?r=app&v=' + App.ver, ["Learn"], {timeout: 20000}),
  GetCode: function (zip, tel, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    var md = hex_md5(zip + App.iphone + hex_md5(App.ver) + '_' + App.ver + tel);
    // console.log('md:' + md);
    IS.GetCode([zip, tel, md], function (result) {
      // console.log(result);
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '验证码获取失败');
    });
  },
  getWXOpen: function (openid, unionid, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.getWXOpen([openid, unionid], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        if (result.hasOwnProperty('info') && (result.info.length > 10)) {
          $api.setStorage('token', result.info);
          //api.setPrefs({key: 'token',value:result.info});
          //XO.getInfo(result.info,callFr,errFr);
          XO.exec(callFr, false, 'Opened');
        } else if ((result.msg == '') && (result.info == '')) {
          XO.exec(callFr, false, 'WXopenid');
        }
      } else {
        XO.exec(errFr, false, result.msg);
      }
    });
  },
  GetNewRank: function (token, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetNewRank(token, function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetFirst: function (token, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetFirst(token, function (result) {
      // alert(JSON.stringify(result));
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetRule: function (token, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetRule(token, function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, false, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetAbout: function (token, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetAbout(token, function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, false, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetWeekly: function (token, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetWeekly(token, function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  CheckReg: function (token, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.CheckReg(token, function (result) {

    }, function (result) {

    });
  },
  GetEmba: function (token, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetEmba(token, function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetProfession: function (token, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetProfession(token, function (result) {
      // console.log(result);
      // profession
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  Exchange: function (token, id, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.Exchange([token, id], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  PostFeedBack: function (token, contact, content, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.PostFeedBack([token, contact, content], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, false, result.msg);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetComment: function (token, id, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetComment([token, id], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetBanner: function (v, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetBanner(v, function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, false, result.msg);
      } else {
        XO.exec(errFr, false, '');
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  BroURL: function (v, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.BroURL(v, function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, false, result.msg);
      } else {
        XO.exec(errFr, false, '');
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetYuPan: function (v, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetYuPan(v, function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, false, result.msg);
      } else {
        XO.exec(errFr, false, '');
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  YuPan: function (token, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.YuPan(token, function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.msg);
      } else {
        XO.exec(errFr, false, '');
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  CheckShare: function (v, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.CheckShare(v, function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, '');
      } else {
        XO.exec(errFr, false, '');
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetTag: function (token, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetTag(token, function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetList: function (token, id, type, cid, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetList([token, id, type, cid], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetMessage: function (token, id, num, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetMessage([token, id, num], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  AddLikeTask: function (token, id, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.AddLikeTask([token, id], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result);
      } else {
        XO.exec(errFr, true, result);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  DelLikeTask: function (token, id, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.DelLikeTask([token, id], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result);
      } else {
        XO.exec(errFr, true, result);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },

  DelComment: function (token, id, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.DelComment([token, id], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result);
      } else {
        XO.exec(errFr, false, result);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  PostTask: function (token, id, msg, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.PostTask([token, id, msg], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result);
      } else {
        XO.exec(errFr, false, result);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetColumn: function (token, id, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetColumn([token, id], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  HotSearch: function (token, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.HotSearch(token, function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  Search: function (token, key, interest, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.Search([token, key, interest], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, true, result);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },

  GetEveryday: function (token, num, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetEveryday([token, num], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },

  GetUser: function (token, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetUser(token, function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetTask: function (token, id, num, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetTask([token, id, num], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetPromoter: function (token, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetPromoter(token, function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, false, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  CheckLike: function (token, id, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.CheckLike([token, id], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetProDetail: function (token, id, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetProDetail([token, id, App.ver], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      // alert(JSON.stringify(result));
      console.log(JSON.stringify(result));
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetAudioContent: function (token, id, type, tid, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetAudioContent([token, id, type, tid], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetAudioInfo: function (token, id, type, tid, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetAudioInfo([token, id, type, tid, App.ver], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetPPT: function (token, id, type, tid, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetPPT([token, id, type, tid], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, false, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetScore: function (token, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetScore(token, function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetTidings: function (token, num, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetTidings([token, num], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  Get_AudioTask: function (token, id, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.Get_AudioTask([token, id], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, true, result);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  SCore: function (token, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.SCore(token, function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, false, result.msg);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetUinfo: function (token, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetUinfo(token, function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        var result = result.data;
        $api.setStorage('user_id', result.id);
        if (result.name) {
          $api.setStorage('nickname', result.nickname);
        }
        $api.setStorage('name', result.name);
        $api.setStorage('company', result.company);
        $api.setStorage('tel', result.tel);
        $api.setStorage('zip', result.zip);
        $api.setStorage('industry', result.industry);
        $api.setStorage('profession', result.profession);
        $api.setStorage('province', result.province);
        if (result.wx_openid && (result.wx_openid.length > 10)) {
          $api.setStorage('wx_openid', result.wx_openid);
        }

        if (result.face && (result.face.length > 6)) {
          var file_fix = result.face.split('.');
          file_fix = file_fix[file_fix.length - 1];
          var file = hex_md5(result.face) + '.' + file_fix;

          if (result.face.indexOf('/') == 0) {
            var dpic = App.url + result.face;
          } else {
            var dpic = result.face;
          }
          if (window.navigator.userAgent.indexOf('iPhone') > 0) {
            api.download({
              url: dpic,
              savePath: ('fs://res/' + file),
              cache: true,
              allowResume: true
            }, function (ret, err) {
              if (ret) {
                $api.setStorage('face', ret.savePath);
              }
            });
          } else {
            fs.exist({
              path: 'fs://res/' + file
            }, function (ret, err) {
              if (ret.exist) {
                $api.setStorage('face', 'fs://res/' + file);
              } else {
                api.download({
                  url: dpic,
                  savePath: ('fs://res/' + file),
                  cache: true,
                  allowResume: true
                }, function (ret, err) {
                  if (ret.state) {
                    $api.setStorage('face', api.fsDir + '/res/' + file);
                  }
                });
              }
            });
          }
        } else {
          $api.setStorage('face', 'fs://image/user_default.png');
        }
        XO.exec(callFr, true, result);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  AddLikeMessage: function (token, id, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.AddLikeMessage([token, id], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result);
      } else {
        XO.exec(errFr, true, result);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  DelMessage: function (token, id, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.DelMessage([token, id], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result);
      } else {
        XO.exec(errFr, true, result);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  DelTask: function (token, id, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.DelTask([token, id], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result);
      } else {
        XO.exec(errFr, true, result);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetStudy: function (token, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetStudy(token, function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetStudyList: function (token, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetStudyList(token, function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetGroup: function (token, num, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetGroup([token, num], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetLike: function (token, num, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetLike([token, num], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }

      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetAudioMessage: function (token, id, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetAudioMessage([token, id], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }

      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, true, result);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetMostLike: function (token, num, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetMostLike([token, num], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetMostMessage: function (token, num, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetMostMessage([token, num], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  PostTopicMessage: function (token, id, content, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.PostTopicMessage([token, id, content], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  PostTopicChat: function (token, topicid, id, content, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.PostTopicChat([token, topicid, id, content], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  Learn: function (token, id, current, duration, checkID) {
    if (!XO.Online) {
      return XO.Offline();
    }
    ISS.Learn([token, id, current, duration, checkID, App.ver], function (result) {
      //console.log(result)
    });
  },
  GetPlan: function (token, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetPlan(token, function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  ChangePlan: function (token, int, plantime, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    var intArray = int.split(',');
    IS.ChangePlan([token, intArray, plantime], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetRadio: function (token, id, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetRadio([token, id], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GroupDetail: function (token, id, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GroupDetail([token, id], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetRank: function (token, num, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetRank([token, num], function (result) {

      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetMall: function (token, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetMall(token, function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetEveryday: function (token, num, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetEveryday([token, num], function (result) {

      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetContent: function (token, id, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetContent([token, id], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result);
      } else {
        XO.exec(errFr, true, result);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  Login: function (tel, code, zip, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.Login([tel, code, zip], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '登录失败');
    });
  },
  ST: function (token, status) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.ST([token, status], function (result) {
    });
  },
  Help: function (token, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.Help(token, function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, false, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  FAQ: function (token, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.FAQ(token, function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, false, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  CheckBind: function (token, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.CheckBind(token, function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        if (typeof result.data == 'string') {
          result.data = JSON.parse(result.data);
        }
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetComments: function (token, id, aid, num, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetComments([token, id, aid, num], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);//如果是对象，true
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  PostComments: function (token, id, aid, content, commentid, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.PostComments([token, id, aid, content, commentid], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, false, result.msg);//写接口需要改三个方面，函数名，IS后的函数名，相关参数，最重要的是在最上面的数组中写上，在控制台测试时不要传空，会502
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetTopic: function (token, id, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetTopic([token, id], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        // console.log(result.data);
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  GetCourse: function (token, id, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.GetCourse([token, id], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        // console.log(result.data);
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  AddLike: function (token, id, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.AddLike([token, id], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result);
      } else {
        XO.exec(errFr, true, result);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  DelLikeMessage: function (token, id, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.DelLikeMessage([token, id], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result);
      } else {
        XO.exec(errFr, true, result);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  BindUser: function (token, Ty, key, zip, tel, code, unionid, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    //alert(token + '|' + Ty + '|' + key + '|' + zip + '|' + tel + '|' + code);
    IS.BindUser([token, Ty, key, zip, tel, code, unionid], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      // console.log(JSON.stringify(result));
      if (result.status) {
        XO.exec(callFr, false, result.msg);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },

  PostUser: function (token, nickname, sex, birthday, company, industry, profession, province, address, stage, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.PostUser([token, nickname, sex, birthday, company, industry, profession, province, address, stage], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, false, result.msg);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  PostTopicComments: function (token, id, content, location, address, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.PostTopicComments([token, id, content, location, address], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, false, result.msg);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  DelLike: function (token, id, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.DelLike([token, id], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result);
      } else {
        XO.exec(errFr, true, result);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  Profile: function (token, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.Profile(token, function (result) {
      //console.log(result);
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result);
      } else {
        XO.exec(errFr, true, result);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  TopicList: function (token, num, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.TopicList([token, num], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  MsgList: function (token, callFr, errFr) {
    if (!XO.Online) {
      return XO.Offline();
    }
    IS.MsgList(token, function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      if (result.status) {
        if (typeof result.data == 'string') {
          result.data = JSON.parse(result.data);
        }
        XO.exec(callFr, true, result.data);
      } else {
        XO.exec(errFr, false, result.msg);
      }
    }, function (result) {
      XO.exec(errFr, false, '');
    });
  },
  Debug: function (type, msg) {

  },
  exec: function (Fr, type, msg) {
    if ((typeof Fr == 'object') && Fr.hasOwnProperty('name')) {
      if (type) {
        if (typeof msg == 'object') {
          var msg = JSON.stringify(msg);
          msg = msg.replace(/'/ig, "\\'");
          msg = msg.replace(/"/ig, '\\"');
          msg = msg.replace(/(\\r\\n)/g, "<br>&nbsp;&nbsp;")
          msg = msg.replace(/(\n)+|(\r\n)+/g, " ");
          msg = msg.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
          msg = msg.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
          if (Fr.name == 'searchResult') {
            api.execScript({name: 'search', frameName: Fr.name, script: Fr.fun + "('" + msg + "');"});
          } else if (Fr.name == 'audioContent' || Fr.name == 'audioMessage' || Fr.name == 'audioTask' || Fr.name == 'audioFoot' || Fr.name == 'controller') {
            api.execScript({name: 'audio', frameName: Fr.name, script: Fr.fun + "('" + msg + "');"});
          } else if (Fr.name == 'FM' || Fr.name == 'home') {
            api.execScript({name: 'root', frameName: Fr.name, script: Fr.fun + "('" + msg + "');"});
          } else {
            api.execScript({name: Fr.name, script: Fr.fun + "('" + msg + "');"});
          }
        } else {
          api.execScript({name: Fr.name, script: Fr.fun + '();'});
        }
      } else {
        if (typeof msg == 'object') {
          var msg = JSON.stringify(msg);
          msg = msg.replace(/'/ig, "\\'");
          msg = msg.replace(/(\n)+|(\r\n)+/g, "");
          msg = msg.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
          msg = msg.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
          api.execScript({name: 'root', frameName: Fr.name, script: Fr.fun + "('" + msg + "');"});
        } else if (typeof msg == 'number') {
          if (Fr.name == 'FM' || Fr.name == 'home') {

            api.execScript({name: 'root', frameName: Fr.name, script: Fr.fun + "('" + msg + "');"});
          } else {
            api.execScript({name: Fr.name, script: Fr.fun + "('" + msg + "');"});
          }
        } else {
          msg = msg.replace(/'/ig, "\\'");
          msg = msg.replace(/(\n)+|(\r\n)+/g, "");
          msg = msg.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
          msg = msg.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
          if (Fr.name == 'FM' || Fr.name == 'home') {
            api.execScript({name: 'root', frameName: Fr.name, script: Fr.fun + "('" + msg + "');"});
          } else {
            api.execScript({name: Fr.name, script: Fr.fun + "('" + msg + "');"});
          }
        }
      }
    }
  },
  PinTime: 1000,
  Pin: function () {
    var _indexFrameGroup = $api.getStorage('indexFrameGroup');
    if (!_indexFrameGroup || (_indexFrameGroup != '1')) {
      return;
    }
    var connect = api.connectionType;
    //console.log(connect);
    if (XO.logContent.length > 1024) {
      XO.logContent = connect + '|1024';
    } else if (XO.logContent == '') {
      XO.logContent = connect;
    } else {
      XO.logContent = connect + '|' + XO.logContent;
    }

    if (!XO.Online) {
      setTimeout(function () {
        XO.Pin();
      }, 20000);
      return XO.Offline();
    }
    if (!$api.getStorage('token') && $api.getStorage('nickname')) {
      var dialogBox = api.require('dialogBox');
      dialogBox.taskPlan({
        rect: {
          w: 300
        },
        texts: {
          mainTitle: '自动退出',
          subTitle: '您的账户已在其他设备登录，应用将退出本账户',
          content: [],
          btnTitle: '好的，明白了'
        },
        styles: {
          bg: '#fff',
          main: {
            marginT: 20,
            color: '#636363',
            size: 13,
            bold: true,
          },
          sub: {
            marginT: 8,
            color: '#999999',
            size: 12,
          },
          content: [],
          ok: {
            marginT: 20,
            marginB: 10,
            marginL: 20,
            w: 280,
            h: 40,
            bg: '#fff',
            color: '#007FFF',
            size: 12
          }
        }
      }, function (ret) {
        if (ret.eventType == 'ok') {
          var dialogBox = api.require('dialogBox');
          dialogBox.close({
            dialogName: 'taskPlan'
          });
          $api.clearStorage();
          api.removePrefs({key: 'face'});
          api.removePrefs({key: 'token'});
          api.removePrefs({key: 'user_id'});
          api.removePrefs({key: 'nickname'});
          api.removePrefs({key: 'company'});
          api.removePrefs({key: 'position'});
          api.removePrefs({key: 'tel'});
          api.rebootApp();
        }
      });
      /*
       setTimeout(function(){
       XO.Pin();
       },8000);
       */
      return;
    }

    var token = $api.getStorage('token');
    var iphone = (window.navigator.userAgent.toLowerCase().indexOf(' mac') > -1) ? 1 : 0;

    IS.Pin([token, iphone, connect, XO.logContent], function (result) {
      if (typeof result == 'string') {
        var result = JSON.parse(result);
      }
      //alert(JSON.stringify(result));
      if ((typeof result.msg == 'string') && (result.msg.indexOf('权失败') > 0)) {
        $api.clearStorage('token');
        var dialogBox = api.require('dialogBox');
        dialogBox.taskPlan({
          rect: {
            w: 300
          },
          texts: {
            mainTitle: '自动退出',
            subTitle: '您的账户已在其他设备登录，应用将退出本账户',
            content: [],
            btnTitle: '好的，明白了'
          },
          styles: {
            bg: '#fff',
            main: {
              marginT: 20,
              color: '#636363',
              size: 13,
              bold: true,
            },
            sub: {
              marginT: 8,
              color: '#999999',
              size: 12,
            },
            content: [],
            ok: {
              marginT: 20,
              marginB: 10,
              marginL: 20,
              w: 280,
              h: 40,
              bg: '#fff',
              color: '#007FFF',
              size: 12
            }
          }
        }, function (ret) {
          if (ret.eventType == 'ok') {
            var dialogBox = api.require('dialogBox');
            dialogBox.close({
              dialogName: 'taskPlan'
            });
            $api.clearStorage();
            api.removePrefs({key: 'face'});
            api.removePrefs({key: 'token'});
            api.removePrefs({key: 'user_id'});
            api.removePrefs({key: 'nickname'});
            api.removePrefs({key: 'company'});
            api.removePrefs({key: 'position'});
            api.removePrefs({key: 'tel'});
            api.rebootApp();
          }
        });
        //XO.Pin(token);
        return;
      }
      XO.logContent = '';
      if (result.status) {
        var data = result.data;
        if (typeof data == 'string') {
          var data = JSON.parse(data);
        }
        switch (data.type) {
          case 1:
            //信封消息
            break;
          case 2:
            //私人消息
            //私人消息
            $api.setStorage('red_' + token, 1);
            api.execScript({name: 'home', script: "red(1)"});

            var setting = $api.getStorage('setting');
            var sett = null;
            if (setting.indexOf('|') > 0) {
              sett = setting.split('|');
            }
            if (!XO.SysBg) {
              if (sett && (sett[0] == '1')) {
                api.startPlay({path: 'widget://res/ring.mp3'}, function (ret, err) {
                });
              }
              //alert(JSON.stringify(data));
              //api.execScript({name: 'chat',script: "news("+ data.msg[0].uid  +")"});
            } else {
              if (data.msg[0].content.length > 16) {
                data.msg[0].content = data.msg[0].content.substring(0, 16) + '...';
              }

              var ibadge = $api.getStorage('badge');
              if (ibadge) {
                ibadge = ibadge + 1;
              } else {
                ibadge = 1;
              }
              $api.setStorage('badge', ibadge);
              api.setAppIconBadge({
                badge: ibadge
              });

              if (sett && (sett[0] == '1')) {
                api.notification({
                  vibrate: [300, 500],
                  sound: 'default',
                  light: true,
                  notify: {
                    title: data.msg[0].uname,
                    content: data.msg[0].content,
                    extra: 'tidings|' + data.msg[0].uid
                  }
                }, function (ret, err) {
                  if (ret) {
                    //api.alert(ret.id);
                  }
                });
              }
            }
            break;
          case 3:
            break;
          case 4:
            break;
          case 5:
            var dialogBox = api.require('dialogBox');
            dialogBox.taskPlan({
              rect: {
                w: 300
              },
              texts: {
                mainTitle: '自动退出',
                subTitle: '您的账户已在其他设备登录，应用将退出本账户',
                content: [],
                btnTitle: '好的，明白了'
              },
              styles: {
                bg: '#fff',
                main: {
                  marginT: 20,
                  color: '#636363',
                  size: 13,
                  bold: true,
                },
                sub: {
                  marginT: 8,
                  color: '#999999',
                  size: 12,
                },
                content: [],
                ok: {
                  marginT: 20,
                  marginB: 10,
                  marginL: 20,
                  w: 280,
                  h: 40,
                  bg: '#fff',
                  color: '#007FFF',
                  size: 12
                }
              }
            }, function (ret) {
              if (ret.eventType == 'ok') {
                var dialogBox = api.require('dialogBox');
                dialogBox.close({
                  dialogName: 'taskPlan'
                });
                $api.clearStorage();
                api.removePrefs({key: 'face'});
                api.removePrefs({key: 'token'});
                api.removePrefs({key: 'user_id'});
                api.removePrefs({key: 'nickname'});
                api.removePrefs({key: 'company'});
                api.removePrefs({key: 'position'});
                api.removePrefs({key: 'tel'});
                api.rebootApp();
              }
            });
            //XO.Pin();
            return;
            break;
          case 6:
            break;
          case 7:
            var weval = 0;
            if (typeof data.cv == 'string') {
              if (data.cv == '1') {
                weval = 1;
                if (data.ver != api.appVersion) {
                  weval = 2;
                }
              }

              if (weval != 1) {
                if (data.msg && (data.msg.length > 0)) {
                  var msgid = $api.getStorage('auto_ver_' + data.msg[0].id);
                  if (!msgid || (msgid != '1')) {
                    $api.setStorage('auto_ver_' + data.msg[0].id, '1');
                    if (data.msg[0].title && (data.msg[0].title.length > 1)) {
                      api.confirm({
                        title: data.msg[0].title,
                        msg: data.msg[0].content,
                        buttons: [data.msg[0].btn1, data.msg[0].btn2]
                      }, function (ret, err) {
                        var index = ret.buttonIndex;
                        if (index == 1) {
                          eval(data.msg[0].code1);
                        } else {
                          eval(data.msg[0].code2);
                        }
                      });
                    } else {
                      eval(data.msg[0].code1);
                    }
                  }
                }
              }

            }
            break;
          default:
        }
        setTimeout(function () {
          XO.Pin();
        }, 20000);
      } else {
        setTimeout(function () {
          XO.Pin();
        }, 20000);
      }
    }, function (result) {
      setTimeout(function () {
        XO.Pin();
      }, 20000);
    });
  },
  Bind: function () {
    if (($api.getStorage('user_id') && $api.getStorage('nickname')) && !$api.getStorage('isbind')) {
      var uid = $api.getStorage('user_id');
      var name = $api.getStorage('nickname');
      push.leaveAllGroup();
      push.bind({
        userName: name,
        userId: uid
      }, function (ret, err) {
        if (!ret) {
          XO.Debug();
        } else {
          $api.setStorage('isbind', '1');
          XO.popOpen({name: 'root', fun: 'Badge'});
        }
      });
    } else {
      setTimeout(function () {
        XO.Bind();
      }, 5000);
    }
  },
  Unbind: function (token) {
    if ($api.getStorage('user_id')) {
      var uid = $api.getStorage('user_id');
      push.unbind({
        userId: uid
      }, function (ret, err) {
        if (ret) {
        } else {
        }
      });
    }
  },
  joinGroup: function (gname) {
    push.joinGroup({
      groupName: gname
    }, function (ret, err) {
      if (ret) {
      } else {
      }
    });
  },
  leaveGroup: function (gname) {
    push.leaveGroup({
      groupName: gname
    }, function (ret, err) {
      if (ret) {
      } else {
      }
    });
  },
  leaveAllGroup: function () {
    push.leaveAllGroup(function (ret, err) {
      if (ret) {
      } else {
      }
    });
  },
  popOpen: function (callFr) {
    push.setListener(function (ret, err) {
      if (ret) {
        //alert( JSON.stringify( ret) );
        XO.exec(callFr, true, ret);
      }
    });
  },
  popClose: function () {
    push.removeListener();
  },
  pages: [],
  page: function () {
    api.addEventListener({
      name: 'IndexEvent'
    }, function (ret, err) {
      //alert(JSON.stringify(ret.value.page));
      if (ret.value.page.length < 1) {
        return;
      }
      var jump = false;
      for (var i in XO.pages) {
        if (XO.pages[i] == ret.value.page) {
          jump = true;
          break;
        }
      }
      if (!jump) {
        XO.pages[XO.pages.length] = ret.value.page;
      }
    });
  },
  HasPage: function (name, callFr, ErrFr) {
    for (var i in XO.pages) {
      if (XO.pages[i] == name) {
        XO.exec(callFr, false);
        return true;
        break;
      }
    }
    XO.exec(ErrFr, false);
    return false;
  },
  ClosePage: function (win) {
    var Fr = win.split(' ');
    var Hv = '';
    for (var i in Fr) {
      if ((typeof Fr[i] == 'string') && (Fr[i].length > 0)) {
        /*
         api.closeFrame({
         name: Fr[i]
         });
         */
        api.closeWin({
          name: Fr[i]
        });

        for (var j in XO.pages) {
          if ((XO.pages[j].length > 0) && (XO.pages[j] != Fr[i])) {
            Hv = Hv + ' ' + XO.pages[j];
          } else {
            Hv = Hv.replace(' ' + Fr[i], '');
          }
        }
      }
    }
    XO.pages = Hv.split(' ');
  },
}
