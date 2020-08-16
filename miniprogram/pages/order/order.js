// pages/order/order.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('Students').where({
      _openid: wx.getStorageSync("openid"),
    }).get({
      success: res => {
        this.setData({
          orders: JSON.parse(JSON.stringify(res.data, null, 2))
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '网络延迟'
        })
        console.error('[数据库] [查询记录] 失败：', err)
        //返回首页
        wx.navigateBack()({
          delta: 1
        })
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
    this.onLoad()
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

  bindchange:function(e){
    const db = wx.cloud.database()
    console.log(this.data.orders[e.target.id]._id)
    db.collection('Students').doc(this.data.orders[e.target.id]._id).update({
      data: {
        online: false
      },
      success: res => {
        wx.showToast({
          icon: 'success',
          title: '下拉刷新'
        })
        
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '网络超时'
        })
        console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  }
})