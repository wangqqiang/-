// pages/person/person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname:'未登录 >', //登录用户
    avatar:'', //头像
    gender:'', //性别
    islogin: false //是否登录
  },
  login(){
    // 用户已经登录则不再前往授权界面
    if(this.data.islogin) return;
    wx.navigateTo({
      url: '../login/login',
    })
  },
  loginout() {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否退出登录？',
      success(res) {
        if (res.confirm) {
          wx.clearStorage();
          that.setData({
            nickname: "未登录>",
            avatar: "",
            gender: "",
            islogin: false
          })
        } else if (res.cancel) {

        }
      }
    })
  },
  // 卖品跳转页面
  sellorder(event){
    let eventId =  event.currentTarget.id;
    // 用户已经登录可以进入卖品界面
    if (this.data.islogin){
      if (eventId == '1'){
        // 影票订单
        console.log(eventId +" 影票订单")
      } else if (eventId == '2'){
        // 卖品订单
        wx.navigateTo({
          url: '../sellorder/sellorder',
        });
      } else if (eventId == '3') {
        // 我的钱包
        console.log(eventId + "我的钱包")
      }
     
    }else{
      this.login();
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
    var that = this;
    wx.getStorage({
      key: "userinfo",
      success(res) {
        that.setData({
          nickname: res.data.nickName,
          gender: res.data.gender,
          avatar: res.data.avatarUrl,
          islogin: true
        })
      }
    })
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