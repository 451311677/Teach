// pages/pubstudent/pubstudent.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "", //联系人
    phone: "", //联系电话
    weixin: "", //微信
    sex: "", //性别
    grade: "", //年级
    subject: "", //求教科目
    time: "", //可上课时间
    message: "", //学员情况
    require: "", //对教员要求
    wage: "", //收费要求

    address: "点击获取位置",
    latitude: "", //纬度
    longitude: "", //经度

  },

  bindPhoneinput: function(e) {
    this.setData({
      phone: e.detail.value,
      phonenull: true
    })
  },
  bindWeixininput: function(e) {
    this.setData({
      weixin: e.detail.value,
      weixinnull: true
    })
  },
  bindaddress: function(e) {
    var that=this
    //定位当前位置
    wx.chooseLocation({
      type: "wgs84",
      success: function(res) {
        console.log(res)
        that.setData ({
          address:res.address,
          latitude:res.latitude,
          longitude:res.longitude
        })
      },
    })
  },
  bindSexinput: function(e) {
    this.setData({
      sex: e.detail.value
    })
  },
  bindGradeinput: function(e) {
    this.setData({
      grade: e.detail.value
    })
  },
  bindSubjectinput: function(e) {
    this.setData({
      subject: e.detail.value
    })
  },
  bindTimeinput: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindMessageinput: function(e) {
    this.setData({
      message: e.detail.value
    })
  },
  bindRequireinput: function(e) {
    this.setData({
      require: e.detail.value
    })
  },
  bindWageinput: function(e) {
    this.setData({
      wage: e.detail.value
    })
  },
  bindNameinput: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindNameinput: function(e) {
    this.setData({
      name: e.detail.value
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


  /*上传学员订单 */
  bindSubmitStud: function() {
    if (this.data.name && this.data.phone && this.data.weixin && this.data.subject) {
      //提交教员信息保存在云端
      const db = wx.cloud.database()
      db.collection('Students').add({
        data: {
          online: true, //是否已被预约
          name: this.data.name, //联系人
          phone: this.data.phone, //联系电话
          weixin: this.data.weixin, //微信
          address: this.data.address, //授课区域
          sex: this.data.sex, //性别
          grade: this.data.grade, //年级
          subject: this.data.subject, //求教科目
          time: this.data.time, //可上课时间
          message: this.data.message, //学员情况
          require: this.data.require, //对教员要求
          wage: this.data.wage, //收费要求
          date: util.formatTime(new Date()), //返回日期
          newDateTime: (new Date()).valueOf(), //时间戳
          latitude:this.data.latitude,//纬度
          longitude:this.data.longitude,//经度
        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          wx.showToast({
            icon:'none',
            title: '发布成功，下拉刷新',
          })
          console.log('[数据库] [新增学员记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '网络超时'
          })
          console.error('[数据库] [新增学员记录] 失败：', err)
        }
      })
      //返回首页
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '请将资料填写完整'
      })
    }
  },
})