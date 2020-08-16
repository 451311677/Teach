// pages/pubteacher/pubteacher.js
const util = require('../../utils/util.js')
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  bindPhoneinput:function(e){
    this.setData({
      phone:e.detail.value
    })
  },
  bindUserinput: function (e) {
    this.setData({  
      user: e.detail.value
    })
  },
  bindNameinput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindSexinput: function (e) {
    this.setData({
      sex: e.detail.value
    })
  },
  bindAgeinput: function (e) {
    this.setData({
      age: e.detail.value
    })
  },
  bindEducationinput: function (e) {
    this.setData({
      education: e.detail.value
    })
  },
  bindMajorinput: function (e) {
    this.setData({
      major: e.detail.value
    })
  },
  bindSubjectinput: function (e) {
    this.setData({
      subject: e.detail.value
    })
  },
  bindAdressinput: function (e) {
    this.setData({
      classadress: e.detail.value
    })
  },
  bindTimeinput: function (e) {
    this.setData({
      classtime: e.detail.value
    })
  },
  bindWageinput: function (e) {
    this.setData({
      wage: e.detail.value
    })
  },
  /*提交按钮 */
  bindSubmitTeach:function(){
    //提交教员信息保存在云端
    if(this.data.phone&&this.data.name&&this.data.education&&this.data.subject&&this.data.classadress&&this.data.wage){
    const db = wx.cloud.database()
    db.collection('Teachers').add({
      data: {
        user: this.data.user,          //用户名
        name: this.data.name,          //姓名
        age: this.data.age,           //年龄
        phone: this.data.phone,         //电话
        subject: this.data.subject,       //授课科目
        classtime: this.data.classtime,     //授课时间
        classadress: this.data.classadress,   //授课区域
        sex: this.data.sex,           //性别
        major: this.data.major,         //专业
        education: this.data.education,     //学历
        wage: this.data.wage,          //薪水
        date: util.formatTime(new Date()) //返回日期
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          teacherId: res._id,
        })
        wx.showToast({
          title: '发布成功',
        })
        console.log('[数据库] [新增教员记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '稍后再试'
        })
        console.error('[数据库] [新增教员记录] 失败：', err)
      }
    })
    //返回首页
    wx.navigateBack({
      delta:1
    })
    }
    else{
      wx.showToast({
        icon: 'none',
        title: '请将资料填写完整'
      })
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  
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