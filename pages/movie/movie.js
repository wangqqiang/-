// pages/movie/movie.js
const Http = require("../../http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cinema_info:{}, //影院地址
    imgUrls: [], //轮播图片
    movieLists:[] //总数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (this.data.movieLists != [] && this.data.movieLists != null) {
      wx.showToast({
        title: '没有店铺',
        icon: 'none',
        duration: 3000
      });
    }
  },
  // 获取列表数据
  movieList(){
    // 加载等待
    wx.showLoading({
      title: '加载中',
    });

    
    // 获取电影院id
    let cinemaid = wx.getStorageSync('cinemainfo').id;
    let $this = this;
    // 影院上映影片信息
    Http.cinemasMovies(cinemaid,function(res){
      // 讲json字符串转为json对象
      let obj = JSON.parse(res.data.data);
      // console.log(obj)
      $this.setData({
        cinema_info:obj.result.cinema_info,
        movieLists: obj.result.lists
      });
      // 数据回来消失
      wx.hideLoading();
    });
    
  },
  // 获取轮播数据
  movieSwiper(){
    let $this = this;
    // 请求轮播图的图片
    Http.imgUrls(function (res) {
      // 设置轮播图的数据
      $this.setData({
        imgUrls: res.data.data
      });
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
    this.movieList();
    this.movieSwiper();
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

  },
  // 影片详情
  videoDetails(event){
    let $this = this;
    // 电影Id
    let movieId = event.currentTarget.id;
    // 跳转影片详情页面
    wx.navigateTo({
      url: `../details/details?idD=${movieId}`,
      // success(){
      //   // 给详情页的电影Id
      //   wx.setStorage({
      //     key: 'movieId',
      //     data: movieId,
      //   })
      // }
    });
  },
  // 购票
  ticket(event){
    let index = event.currentTarget.dataset.index;
    // 跳转 购票
    wx.navigateTo({
      url: `../ticket/ticket?idx=${index}`
    });
  },
  // 返回城市页面
  cinemas(){
    let cityId = wx.getStorageSync('cityinfo').id;
    wx.navigateTo({
      url: `../cinema/cinema?id=${cityId}`,
    });
  }
})