// pages/mystudent/mystudent.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      students: app.globalData.students
    })
  },
  bindcopy1: function (e) {
    var self = this;
    wx.setClipboardData({
      data: self.data.students[e.target.id].phone,
      success: function (res) {
        // self.setData({copyTip:true}),
        wx.showToast({
          icon: 'success',
          title: '复制成功'
        })
      }
    });
  },
  bindcopy2: function (e) {
    var self = this;
    wx.setClipboardData({
      data: self.data.students[e.target.id].weixin,
      success: function (res) {
        // self.setData({copyTip:true}),
        wx.showToast({
          icon: 'success',
          title: '复制成功'
        })
      }
    });
  }, 
  bindlook: function (e) {
    
    app.globalData.look_id = this.data.students[e.target.id]._id
      wx.navigateTo({
        url: '../look/look'
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
})