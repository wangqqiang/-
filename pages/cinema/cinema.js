// pages/cinema/cinema.js
const Http = require("../../http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cinemas:[],
    curPage:1,
    totalpage:1,
    cityid:0,
    cityName:''
  },
  goMovie(event) {
    // console.log(event)
    // 获取点影Id
    let cinemaInfo = event.currentTarget.dataset.cinemainfo;
    // console.log(cinemaInfo);
    wx.setStorageSync("cinemainfo", cinemaInfo);
    wx.switchTab({
      url: '../movie/movie',
    });
  },
  getcity(){
    // 获取选择页面中存储在StorageSync中的地方信息
    let cityName = wx.getStorageSync("cityinfo")
    // console.log(cityName);
    // 设置选择的城市
    this.setData({
      cityName: cityName.city_name
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getcity();
    let cityid = options.id;
    // console.log(cityid);
    this.setData({
      cityid: cityid
    });
    this.getCinemas(cityid,1);
  },
  // 返回城市列表
  backCitys(){
    wx.navigateTo({
      url: '../citys/citys?type=1',
    })
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
    this.getCinemas(this.data.cityid,this.data.curPage)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 获取影院数据
  getCinemas(cityid, page){
    // 判断当前页大于总页码的时候，提示没有更多数据，且不再请求
    if (this.data.curPage > this.data.totalpage) {
      wx.showToast({
        title: '没有更多数据了'
      })
      return;
    }

    // 加载等待
    wx.showLoading({
      title: '加载中',
    });

    let $this = this;
    Http.cinemas_real(cityid, page,function (res) {
      res = JSON.parse(res.data.data);
      // 判断是否请求成功，没有错误
      if (res.error_code == 0) {
        // 定义个变量把数据源赋给该变量
        let tempCineas = $this.data.cinemas;
        // 把新获取的数据和数据源做拼接，以作加载更多
        tempCineas = tempCineas.concat(res.result.data);
        $this.setData({
          curPage: ++res.result.page,
          totalpage: res.result.totalpage,
          cinemas: tempCineas
        });
      } else if (res.error_code == 204203){
        wx.showToast({
          title: '没有数据了'
        });
      }
      // 数据回来消失
      wx.hideLoading()
    })
  }
})