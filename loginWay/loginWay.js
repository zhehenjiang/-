
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    //页面展示状态（授权，登录）  unauthorized：未授权，authorized：已授权
    pageStatus: 'unauthorized',
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    //判断授权
    wx.getSetting({
      success(res) {
        console.log(res.authSetting);
        if (res.authSetting["scope.userInfo"]) {
          that.setData({
            pageStatus: 'authorized',
          });
        } else {
          that.setData({
            pageStatus: 'unauthorized',
          });
        }
      }
    })
  },

  //授权微信信息
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo);
    var that = this;
    var type = typeof (e.detail.userInfo);
    if (type == "undefined") {
      //拒绝授权
      that.setData({
        pageStatus: 'unauthorized',
      });
    } else if (type == "object") {
      //同意授权
      that.setData({
        pageStatus: 'authorized',
      });
    }
  },
  //手机号登陆
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  //获取code
  checkCode() {
    var that = this;
    wx.login({
      //获取code
      success: function (res) {
        var code = res.code;
        that.setData({
          js_code: code,
        });
      }
    })
  },
  //微信绑定手机快捷登录
  getPhoneNumber(e) {
    var that = this
    console.log("iv:" + e.detail.iv);
    console.log("未转 encryptedData:" + e.detail.encryptedData);
    var iv = e.detail.iv;
    var encryptedData = e.detail.encryptedData;
    this.setData({
      encryptedData: encryptedData,
      iv: iv
    });
  },

})