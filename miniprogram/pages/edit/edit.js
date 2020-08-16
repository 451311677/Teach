// pages/edit/edit.js
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
      orderNum:app.globalData.orderNum,
      teacherNum:app.globalData.teacherNum,
      userNum:app.globalData.userNum
    })
  },
  save:function(){
    const db = wx.cloud.database()
    db.collection('Data').doc("451311677").update({
      data: {
        ordernum:this.data.order*1,
        teachernum:this.data.teacher*1,
        usernum:this.data.user*1 
      },
      success: res => {
        wx.showToast({
          icon: 'success',
          title: '更新成功'
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '更新失败'
        })
        console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  },
  order:function(e){
    this.setData({
      order:e.detail.value
    })
  },
  teacher:function(e){
    this.setData({
      teacher: e.detail.value
    })
  },
  user:function(e){
    this.setData({
      user: e.detail.value
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