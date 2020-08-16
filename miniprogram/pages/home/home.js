//index.js
//获取应用实例
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
const app = getApp()
Page({
  data: {
    // adverPath:"https://7a78-zxg-b90230-1256536097.tcb.qcloud.la/111.png?sign=52078d450737ffdcd6ff13c37e8978d7&t=1564055314",
    adverPath: "111.png",
    city: "城市",
    
    // fileid: ['cloud://zxg-b90230.7a78-zxg-b90230/advertisement/advertisement.jpg', 'cloud://zxg-b90230.7a78-zxg-b90230/advertisement/advertisement.jpg', 'cloud://zxg-b90230.7a78-zxg-b90230/advertisement/advertisement.jpg']
  },
  //事件处理函数
  // bindCityTap: function() {

  //   // wx.getLocation({
  //   //   type:"wgs84",
  //   //   success: function(res) {
  //   //     console.log(res)
  //   //   },
  //   // })
  //   wx.openLocation({
  //     type: "wgs84",
  //     latitude: 34.223569,
  //     longitude: 108.948362,
  //     success: function(res) {
  //       console.log(res)
  //     },
  //   })
  // },
  bindStudentTap: function() {
    wx.navigateTo({
      url: '../students/students'
    })
  },
  bindTeacherTap: function() {
    wx.navigateTo({
      url: '../teachers/teachers'
    })
  },
  bindPubStudent: function() {
    wx.navigateTo({
      url: '../beforeshare/beforeshare'
    })
  },
  bindPubTeacher: function() {
    wx.navigateTo({
      url: '../pubteacher/pubteacher'
    })
  },
  bindCooperation: function() {
    wx.navigateTo({
      url: '../cooperation/cooperation'
    })
  },
  bindIntroduce: function() {
    wx.navigateTo({
      url: '../introduce/introduce'
    })
  },
  onLoad: function() {
    //获取广告图片文件路径
    // wx.cloud.downloadFile({
    //   fileID: 'cloud://zxg-b90230.7a78-zxg-b90230/advertisement/advertisement.jpg', // 文件 ID
    //   success: res => {
    //     // 返回临时文件路径
    //     this.setData({
    //       adverPath: res.tempFilePath
    //     })
    //   },
    //   fail: console.error
    // })

    qqmapsdk = new QQMapWX({
      key: 'UHTBZ-S3MWI-LRNGV-5W2HL-LE5BK-WZBFK'
    });

    var that = this
    //获取市区
    wx.getLocation({
      success: function(res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude,
          },
          success: function(res) {
            console.log("获取城市",res)
            that.setData({
              city: res.result.ad_info.city
            })
          }
        })
      },
    })

    // app.globalData.myopenid = wx.getStorageSync('openid')
    // console.log("myopenid:", app.globalData.myopenid)
    this.getmessages()
    this.getStudents()
    this.getTeachers()
    this.getnum()
  },
  onReady: function() {
    //do something
  },
  onShow: function() {
    //do something
    if (app.globalData.isshare) {
      app.globalData.isshare = false
      wx.navigateTo({
        url: '../pubstudent/pubstudent'
      })
    }
  },
  onHide: function() {
    //do something
  },
  onUnload: function() {
    //do something
  },
  onPullDownRefresh: function() {
    //do something
    this.onLoad()
    wx.stopPullDownRefresh()
  },
  onReachBottom: function() {
    //do something
  },
  onShareAppMessage: function() {
    //return custom share data when user share
    return {
      title: "找家教，做兼职，就来伯乐家教",
      path: "/pages/home/home",
      imageUrl: "../../images/share.png",
    }
  },
  viewTap: function() {
    this.setData({
      text: "set some data for updating view"
    })
  },
  // 查询所有学员订单
  getStudents: function() {
    wx.cloud.callFunction({
      name: 'getStudents',
      // data: {},
      success: res => {
        res.result.data.reverse()
        for(var i=0;i<30;i++){
        app.globalData.students[i]=res.result.data[i]
        }
        //统计订单数
        this.setData({
          orderNum: res.result.data.length
        })
        
        console.log("订单总数:", res.result.data.length)
        console.log('[云函数] [getStudents] 学员库: ', res.result.data)
      },
      fail: err => {
        console.error('[云函数] [getStudents] 调用失败', err)
      }
    })
    //本地函数，读取学生订单
    // const db = wx.cloud.database()
    // db.collection('Students').where({}).get({
    //   success: res => {
    //     app.globalData.students = JSON.parse(JSON.stringify(res.data, null, 2))
    //     //按时间降序排序
    //     for (var i = 0; i < app.globalData.students.length - 1; i++) {
    //       var k = i
    //       for (var j = i + 1; j < app.globalData.students.length; j++)
    //         if (app.globalData.students[k].newDateTime < app.globalData.students[j].newDateTime)
    //           k = j
    //       if (k != i) {
    //         var temp = app.globalData.students[i]
    //         app.globalData.students[i] = app.globalData.students[k]
    //         app.globalData.students[k] = temp
    //       }
    //     }
    //     console.log("[数据库] [查询记录] 成功:学员订单：", app.globalData.students)
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '网络超时'
    //     })
    //     console.error('[数据库] [查询记录] 失败：', err)

    //   }
    // })
  },
  getmessages: function() {
     var openid = wx.getStorageSync("openid")
    const db = wx.cloud.database()
    // 查询当前用户所有的 消息
    // db.collection('Messages').where({
    //   toOpenid: openid,
    // }).get({
    //   success: res => {
    //     app.globalData.messages = JSON.parse(JSON.stringify(res.data, null, 2))
    //     //按时间降序排序
    //     app.globalData.messages.reverse() //逆序
    //     console.log("[数据库] [查询记录] 成功:预约消息：", app.globalData.messages)
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '网络延迟'
    //     })
    //     console.error('[数据库] [查询记录] 失败：', err)
    //   }
    // })

    //获取全员消息
    db.collection('Messages').where({
      toOpenid: "All"
    }).get({
      success: res => {
        app.globalData.allUsermessages = JSON.parse(JSON.stringify(res.data, null, 2))
        console.log("[数据库] [查询记录] 成功:全员消息：", app.globalData.allUsermessages)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '网络延迟'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  getTeachers: function () {
    wx.cloud.callFunction({
      name: 'getTeachers',
      // data: {},
      success: res => {
        //统计订单数
        app.globalData.teachers= res.result.data
        for(var i=0;i<30;i++){
          app.globalData.teachers0[i]=res.result.data[i];
        }
        
        console.log('[云函数] [getTeachers] 教员库: ', res.result.data)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '网络延迟'
        })
        console.error('[云函数] [getTeachers] 失败：', err)
        //返回首页
        wx.navigateBack()({
          delta: 1
        })
      }
    })
  },


  getnum: function() {
    var that = this
    const db = wx.cloud.database()
    db.collection('Teachers').where({}).count({
      success: function(res) {
        that.setData({
          teacherNum: res.total
        })
      
        console.log("教员总数：", that.data.teacherNum)
      }
    })

    db.collection('Users').where({}).count({
      success: function(res) {
        that.setData({
          userNum: res.total
        })
        
        console.log("用户总数：", that.data.userNum)
      }
    })
    db.collection('Data').where({
      _id: "451311677"
    }).get({
      success: res => {
        var s = JSON.parse(JSON.stringify(res.data, null, 2))
        console.log("[数据库] [查询记录] 成功:后台数据：", s)
        that.setData({
          orderstart:s[0].ordernum,
          teacherstart:s[0].teachernum,
          userstart:s[0].usernum,       
          })
        app.globalData.teacherNum = s[0].teachernum
        app.globalData.orderNum = s[0].ordernum
        app.globalData.userNum = s[0].usernum
      },
      
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '网络延迟'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },


})