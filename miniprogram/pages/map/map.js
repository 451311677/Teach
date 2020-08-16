// pages/map/map.js
var app=getApp()
let plugin = requirePlugin("myPlugin")
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
      routeInfo: {

      // startLat: 39.90469,    //起点纬度 选填
      // startLng: 116.40717,    //起点经度 选填
      startName: "currentLocation",   // 起点名称 选填
      endLat: app.globalData.students[app.globalData.mapindex].latitude,    // 终点纬度必传
        endLng: app.globalData.students[app.globalData.mapindex].longitude,  //终点经度 必传
        endName: app.globalData.students[app.globalData.mapindex].address,  //终点名称 必传
      }
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

  }
})