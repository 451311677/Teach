// pages/teachers/teachers.js
const util = require('../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      teachers: app.globalData.teachers0
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
      duration:1000
    }) 
    var length = app.globalData.teachers0.length
    for (var i = length; i < length + 50 && i < app.globalData.teachers.length; i++) {
      console.log(i)
      app.globalData.teachers0[i] = app.globalData.teachers[i]
    }
    this.onLoad()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    //return custom share data when user share
    return {
      title: "找家教，做兼职，就来伯乐家教",
      path: "/pages/home/home",
      imageUrl: "../../images/share.png",
    }
  },


  // const db = wx.cloud.database()
  // // 查询当前用户所有的 counters
  // db.collection('Teachers').where({}).get({
  //   success: res => {
  //     this.setData({
  //       teachers: JSON.parse(JSON.stringify(res.data, null, 2))
  //     })
  //     console.log('[数据库] [查询记录] 成功: ', res)
  //   },
  //   fail: err => {
  //     wx.showToast({
  //       icon: 'none',
  //       title: '网络延迟'
  //     })
  //     console.error('[数据库] [查询记录] 失败：', err)
  //     //返回首页
  //     wx.navigateBack()({
  //       delta: 1
  //     })
  //   }
  // })

  bindcontact: function(e) {
    wx.showToast({
      title: '预约成功',
    })
    // var toOpenid = this.data.teachers[e.target.id]._openid
    // //读取已预约教员列表
    // var reversed = wx.getStorageSync('reversed') || []
    // var flag = true
    // for (var i = 0; i < reversed.length; i++)
    //   if (toOpenid == reversed[i].toOpenid)
    //     flag = false
    // if (flag) {
    //   //读取本地个人信息
    //   var mymessage = wx.getStorageSync('mymessage') || []
    //   const db = wx.cloud.database()
    //   db.collection('Messages').add({
    //     data: {
    //       toOpenid: toOpenid,
    //       user: mymessage,
    //       newDateTime: (new Date()).valueOf(), //时间戳
    //       date: util.formatTime(new Date()) //返回日期
    //     },
    //     success: res => {
    //       // 在返回结果中会包含新创建的记录的 _id

    //       wx.showToast({
    //         title: '预约成功',
    //       })
    //       //异步方式将已预约教员存入本地
    //       var to = {
    //         _id: res._id,
    //         toOpenid: toOpenid,
    //         newDateTime: (new Date()).valueOf() //时间戳
    //       }
    //       reversed.unshift(to)
    //       wx.setStorage({
    //         key: 'reversed',
    //         data: reversed,
    //         success: function (res) {
    //           console.log(res)
    //         }
    //       })   
    //       console.log('[数据库] [预约教员] 成功，记录 _id: ', res._id)
    //     },
    //     fail: err => {
    //       wx.showToast({
    //         icon: 'none',
    //         title: '稍后再试'
    //       })
    //       console.error('[数据库] [预约教员] 失败：', err)
    //     }
    //   })
    // }
    // else{
    //   wx.showToast({
    //     title: '已预约',
    //   })
    // }
  }


})