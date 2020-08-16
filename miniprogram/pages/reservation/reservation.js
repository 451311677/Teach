// pages/reservation/reservation.js
const util = require('../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: "",
    message_length: 0,
    flag: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.globalData.reser_id)
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('Teachers').where({
      _openid: wx.getStorageSync("openid")
    }).get({
      success: res => {
        this.setData({
          teacher: JSON.parse(JSON.stringify(res.data, null, 2)),
          length: res.data.length
        })
        console.log('[数据库] [预约] 成功: ', res)


      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '网络延迟'
        })
        console.error('[数据库] [预约] 失败：', err)
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

  },
  bindinput: function(e) {

    this.setData({
      message: e.detail.value,
      message_length: e.detail.value.length
    })
  },
  yes: function() {
    //提交预约信息保存在云端
    if (this.data.flag) {
      const db = wx.cloud.database()
      db.collection('Reservation').add({
        data: {
          to_id: app.globalData.reser_id,
          name: this.data.teacher[0].name,          //姓名
          age: this.data.teacher[0].age,           //年龄
          phone: this.data.teacher[0].phone,         //电话
          subject: this.data.teacher[0].subject,       //授课科目
          classtime: this.data.teacher[0].classtime,     //授课时间
          classadress: this.data.teacher[0].classadress,   //授课区域
          sex: this.data.teacher[0].sex,           //性别
          major: this.data.teacher[0].major,         //专业
          education: this.data.teacher[0].education,     //学历
          wage: this.data.teacher[0].wage,          //薪水
          date: this.data.teacher[0].date, //返回日期
          message: this.data.message
        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          // wx.showToast({
          //   icon: 'success',
          //   title: '预约成功',
          // })
          wx.showModal({
            title: '预约成功',
            content: '感谢您对伯乐家教的信任与关注！你的预约我们已经收到。预约就有机会！但预约成功并不一定代表这份订单一定会安排给你。因为每一份订单同时会有多位教员预定，伯乐家教会择优推荐或者听取家长的推荐',
            success: function (res) {
              
            }
          })

          console.log('[数据库] [新增学员记录] 成功，记录 _id: ', res._id)
          this.setData({
            flag:false
          })

          // 异步方式将已查看学员订单存入缓存
          var lookedorders = wx.getStorageSync('lookedorders') || []
          lookedorders.unshift(app.globalData.reser_student)
          wx.setStorage({
            key: 'lookedorders',
            data: lookedorders,
            success: function (res) {
              console.log(res)
            }
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '网络超时'
          })
          console.error('[数据库] [新增学员记录] 失败：', err)
        }
      })
    }
    else{
      wx.showToast({
        icon: 'none',
        title: '请勿重复预约'
      })
    }
  },
  back: function() {
    wx.navigateBack({
      //返回的页面数
      delta: 1
    })
  }
})
