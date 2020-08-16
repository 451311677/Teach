// pages/look/look.js
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
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('Reservation').where({
      to_id:app.globalData.look_id
    }).get({
      success: res => {
        this.setData({
          teachers: JSON.parse(JSON.stringify(res.data, null, 2)),
        })
        console.log('[数据库] [查询自己教员信息] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '网络延迟'
        })
        console.error('[数据库] [查询自己教员信息] 失败：', err)
        //返回首页
        wx.navigateBack()({
          delta: 1
        })
      }
    })

  },
  bindcopy:function(e){
    var self = this;
    wx.setClipboardData({
      data: self.data.teachers[e.target.id].phone,
      success: function (res) {
        // self.setData({copyTip:true}),
        wx.showToast({
          icon: 'success',
          title: '复制成功'
        })
      }
    });

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