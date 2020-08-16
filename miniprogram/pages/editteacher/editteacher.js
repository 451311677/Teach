// pages/editteacher/editteacher.js
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
    this.getTeacher()
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
  onShareAppMessage: function () {
    //return custom share data when user share
    return {
      title: "找家教，做兼职，就来伯乐家教",
      path: "/pages/home/home",
      imageUrl: "../../images/share.png",
    }
  },


  getTeacher:function(){
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('Teachers').where({
      _openid:wx.getStorageSync("openid")
    }).get({
      success: res => {
        this.setData({
          teacher: JSON.parse(JSON.stringify(res.data, null, 2)),
          length:res.data.length
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
  }
})