// pages/details/details.js
const Http = require("../../http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    film:{}, //总数据
    actors:[], //演员
    isDown:false, //是否收起
    title:'' // 详情标题
  },
  // 点击向下箭头显示
  upShow(){
    if (!this.data.isDown){
      this.setData({
        isDown: true
      });
    }else{
      this.setData({
        isDown: false
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    let $this = this;
    
    // 获取电影详情Id
    // const movieId = wx.getStorageSync('movieId');
    const movieId = options.idD;
    // console.log(movieId);
    // 真实接口
    Http.movieInfo_real(movieId, function (res) {
      wx.hideLoading();
      let obj = JSON.parse(res.data.data);
      // console.log(obj);
      // 判断是否有数据
      if (obj.resultcode == '200'){
        // 演员名分割
        let tempActors = obj.result.actors.split(',');
        $this.setData({
          film: obj.result,
          actors: tempActors
        });
        // 设置详情页的标题
        wx.setNavigationBarTitle({
          title: obj.result.title
        });
      }else{
        wx.showToast({
          title: obj.reason,
          icon: 'none',
          mask:true,
          duration: 3000
        });
        
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