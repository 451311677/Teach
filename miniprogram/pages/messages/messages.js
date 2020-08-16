// pages/messages/messages.js
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
      allUsermessages: app.globalData.allUsermessages,
      // messages: app.globalData.messages,
    })

    // var newDateTime = (new Date()).valueOf()
    // //获取本地缓存的预约教员表单，
    // var reversed = wx.getStorageSync('reversed') || []
    // console.log(reversed)
    // for(var i=0;i<reversed.length;i++)
    //   if(newDateTime-reversed[i].newDateTime>259200){
    //     //删除超过三天的预约信息
    //     const dbb = wx.cloud.database()
    //     dbb.collection('Messages').doc(reversed[i]._id).remove({
    //       success: res => {
    //         console.error('[数据库] [删除记录] [预约信息] 成功：', err)
    //         //本地缓存该条信息置空
    //         reversed[i]={}
    //         //同步更新本地缓存，
    //         wx.setStorage('reversed',reversed)   
    //       },
    //       fail: err => {
    //         console.error('[数据库] [删除记录] [预约信息] 失败：', err)
    //       }
    //     })
    //   }


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


})