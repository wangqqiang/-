// pages/sellorder/sellorder.js
const App =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsOrderList:{},
    hasOrder:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrder();
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

  },
  getOrder(){
    let templist = wx.getStorageSync('goodsOrderList');
    if (templist  && JSON.stringify(templist) != '{}') {
      // 渲染卖品订单列表页
      this.setData({
        goodsOrderList: templist,
        hasOrder: true
      });
    } else {
      // 渲染空白页
      this.setData({
        hasOrder: false
      })
    }
  },
  // 进入订单详情
  orderDetail(event){
    let orderId = event.currentTarget.id;
    App.globalData.newOrder = this.data.goodsOrderList[orderId].orderData;
    wx.navigateTo({
      url: '../order/order',
    })
  },
  // 取消订单
  cancelOrder(event){
    // 得到当前订单号
    let orderId = event.currentTarget.id;
    let templist = wx.getStorageSync('goodsOrderList');
    // 取消当前订单
    delete templist[orderId];
   
    let $this = this;
    wx.setStorage({
      key: 'goodsOrderList',
      data: templist,
      success(){
        // 删除订单后刷新数据
        $this.getOrder();
      }
    });
   
  }
})