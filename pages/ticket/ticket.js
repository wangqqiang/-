// pages/cinemaMovieInfo/cinemaMovieInfo.js
const Http = require('../../http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cinemaInfo: {},
    cinemaList: [],
    swiperH: '',//swiper高度
    nowIdx: 0,//当前swiper索引
    datetime: ''
  },
  getHeight: function (e) {
    // wx.getSystemInfoSync().windowWidth 获取屏幕宽度
    // 2*30 表示 previous-margin 和 next-margin 的 和
    // 除以 3 表示 display-multiple-items='3' 的设置显示swiper是显示3个图片的
    // 总结来说：它的最终目的是计算每一个图片的宽度；屏幕宽度减去左右的30rpx后剩余值除以3得到图片的宽度，然后等比例计算后得到最终的高度。
    let calcW = (wx.getSystemInfoSync().windowWidth - 2 * 30) / 3;
    var imgh = e.detail.height;//图片高度
    var imgw = e.detail.width;
    var sH = calcW * imgh / imgw + "px"
    this.setData({
      swiperH: sH//设置高度
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初次进入的位置
    this.setData({
      nowIdx:options.idx
    });
    let cinemaId = wx.getStorageSync("cinemainfo").id;
    var myDate = new Date();
    var datetime = myDate.getMonth() + 1 + '-' + myDate.getDate();
    wx.showLoading({
      title: '加载中',
    })
    let $this = this;
    Http.cinemasMovies(cinemaId,function (res) {
      wx.hideLoading();
      let obj = JSON.parse(res.data.data);
      // console.log(obj);
      $this.setData({
        cinemaInfo: obj.result.cinema_info,
        cinemaList: obj.result.lists,
        datetime: datetime
      });
    });
   
  },
  //swiper滑动事件
  swiperChange(e) {
    // console.log(e)
    this.setData({
      nowIdx: e.detail.current
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