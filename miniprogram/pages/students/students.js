// pages/students/students.js
var app = getApp()
let plugin = requirePlugin("myPlugin")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    students:[],
    routeInfo: {
      startLat: 39.90469, //起点纬度 选填
      startLng: 116.40717, //起点经度 选填
      startName: "currentLocation", // 起点名称 选填
      endLat: 39.94055, // 终点纬度必传
      endLng: 116.43207, //终点经度 必传
      endName: "目的地", //终点名称 必传
      mode: "bus" //算路方式 选填
    }


  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      students: app.globalData.students
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

  reservation: function(e) {
    if (this.data.students[e.target.id].online) {
      app.globalData.reser_id = this.data.students[e.target.id]._id
      app.globalData.reser_student=this.data.students[e.target.id]
      wx.navigateTo({
        url: '../reservation/reservation'
      })
    }
    else{
      wx.showToast({
        icon: 'success',
        title: '已安排教员'
      })
    }
  },
  getline: function(e) {
    //打开腾讯内置地图
    app.globalData.mapindex = e.target.id
    wx.navigateTo({
      url: '../map/map'
    })
    //打开本地地图
    // wx.openLocation({
    //    type: "wgs84",
    //    latitude: app.globalData.students[e.target.id].latitude,
    //    longitude: app.globalData.students[e.target.id].longitude,
    //    success: function(res) {
    //    },
    //  })

  },
})