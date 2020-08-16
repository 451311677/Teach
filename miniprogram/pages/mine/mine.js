//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    user: [], //用户信息
    isusers: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function() {
    // 查看是否授权  
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo

          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //获取本地个人信息
    this.setData({
      user: wx.getStorageSync('mymessage') || []
    })
    console.log("获取本地个人信息：", this.data.user)
    if (this.data.user.length == 0) {

      //本地没有个人信息，从数据库导入个人信息
      const db = wx.cloud.database()
      var openid = wx.getStorageSync("openid")
      console.log("myopenid:", openid)
      db.collection('Users').where({
        _openid: openid
      }).get({
        success: res => {
          if (res.data.length == 0) {
            //数据库没有个人信息，提示完善个人信息
            wx.showToast({
              icon: 'none',
              title: '请完善个人信息'
            })
          } else {
            this.setData({
              user: JSON.parse(JSON.stringify(res.data, null, 2))
            })
            wx.setStorage({
              key: 'mymessage',
              data: this.data.user,
              success: function(res) {
                console.log(res)
              }
            })
            app.globalData.counterId = this.data.user[0]._id
          }
          // app.globalData.counterId = app.globalData.user[0]._id
          console.log("[数据库] [查询记录] [个人信息] 成功：", this.data.user[0])
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '网络超时'
          })
          console.error('[数据库] [查询记录] [个人信息] 失败：', err)
        }
      })


    } else {
      app.globalData.counterId = this.data.user[0]._id
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  bindOrder: function() {
    wx.navigateTo({
      url: '../order/order'
    })
  },
  bindLookedOrder: function() {
    wx.navigateTo({
      url: '../lookedorder/lookedorder'
    })
  },
  bindEditTeacher: function() {
    wx.navigateTo({
      url: '../editteacher/editteacher'
    })
  },
  bindEditPersonal: function() {
    wx.navigateTo({
      url: '../editpersonal/editpersonal'
    })
  },
  onReady: function() {
    //do something
  },
  onShow: function() {
    //do something
  },
  onHide: function() {
    //do something
  },
  onUnload: function() {
    //do something
  },
  onPullDownRefresh: function() {
    this.onLoad()
    wx.stopPullDownRefresh()
  },
  onShareAppMessage: function() {
    //return custom share data when user share
    return {
      title: "找家教，做兼职，就来伯乐家教",
      path: "/pages/home/home",
      imageUrl: "../../images/share.png",
    }
  },
  
  background: function() {
    var openid = wx.getStorageSync("openid")
    if (openid == "oWn3x5LKV1qydKaa41LpHoqUwkiA" || openid == "oWn3x5MKchem5q9n5Hq2xxHzC7a4") {
      //获取所有用户信息
      wx.cloud.callFunction({
        name: 'getUsers',
        success: res => {
          app.globalData.users = res.result.data

          console.log('[云函数] [getUsers] 调用成功: ', res.result.data)
        },
        fail: err => {
          console.error('[云函数] [getUsers] 调用失败', err)
        }
      })
      wx.navigateTo({
        url: '../background/background'
      })
    }
  }
})