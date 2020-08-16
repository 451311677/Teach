// pages/lookedorder/lookedorder.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lookedorders:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      lookedorders: wx.getStorageSync('lookedorders') || []
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
    this.onLoad(),
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  onShareAppMessage: function () {
    //return custom share data when user share
    return {
      title: "找家教，做兼职，就来伯乐家教",
      path: "/pages/home/home",
      imageUrl: "../../images/share.png",
    }
  },
  bindclear:function(){
    wx.removeStorageSync("lookedorders");
    wx.showToast({
      icon: 'success',
      title: '下拉刷新'
    })
  }
})