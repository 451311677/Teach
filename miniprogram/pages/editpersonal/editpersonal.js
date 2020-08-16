const util = require('../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  bindPhoneinput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  bindNameinput: function(e) {
    this.setData({
      name: e.detail.value
    })
  },

  bindSexinput: function(e) {
    this.setData({
      sex: e.detail.value
    })
  },
  bindAgeinput: function(e) {
    this.setData({
      age: e.detail.value
    })
  },
  bindProvinceinput: function(e) {
    this.setData({
      province: e.detail.value
    })
  },
  bindMajorinput: function(e) {
    this.setData({
      major: e.detail.value
    })
  },
  bindCityinput: function(e) {
    this.setData({
      city: e.detail.value
    })
  },
  bindIdentityinput: function(e) {
    this.setData({
      identity: e.detail.value
    })
  },
  bindQQinput: function(e) {
    this.setData({
      qq: e.detail.value
    })
  },
  bindWeixininput: function(e) {
    this.setData({
      weixin: e.detail.value
    })
  },
  /*提交按钮 */
  bindSubmitTeach: function() {
    if (app.globalData.counterId) {
      //删除原有信息
      const dbb = wx.cloud.database()
      dbb.collection('Users').doc(app.globalData.counterId).remove({
        success: res => {
          console.error('[数据库] [删除记录] [个人信息] 成功：', err)
        },
        fail: err => {
          console.error('[数据库] [删除记录] [个人信息] 失败：', err)
        }
      })
    }
    //提交教员信息保存在云端
    const db = wx.cloud.database()
    db.collection('Users').add({
      data: {
        name: this.data.name, //姓名
        age: this.data.age, //年龄
        phone: this.data.phone, //电话
        gender: this.data.sex, //性别
        major: this.data.major, //职业
        province: this.data.province,
        city: this.data.city,
        identity: this.data.identity,
        qq: this.data.qq,
        weixin: this.data.weixin,
        newDateTime: (new Date()).valueOf(), //时间戳
        date: util.formatTime(new Date()) //返回日期
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        //将个人信息缓存到本地
        var mymessage = [{
          _id: res._id,
          name: this.data.name, //姓名
          age: this.data.age, //年龄
          phone: this.data.phone, //电话
          gender: this.data.sex, //性别
          major: this.data.major, //职业
          province: this.data.province,
          city: this.data.city,
          identity: this.data.identity,
          qq: this.data.qq,
          weixin: this.data.weixin,
          newDateTime: (new Date()).valueOf(), //时间戳
          date: util.formatTime(new Date()) //返回日期
        }]
        wx.setStorage({
          key: 'mymessage',
          data: mymessage,
          success: function (res) {
            console.log(res)
          }
        })   
        wx.showToast({
          title: '下拉刷新',
        })
        console.log('[数据库] [新增教员记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '网络超时'
        })
        console.error('[数据库] [新增教员记录] 失败：', err)
      }
    })
    

    //返回首页
    wx.navigateBack({
      delta: 1
    })



  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


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

  },
  onShareAppMessage: function () {
    //return custom share data when user share
    return {
      title: "找家教，做兼职，就来伯乐家教",
      path: "/pages/home/home",
      imageUrl: "../../images/share.png",
    }
  },


})