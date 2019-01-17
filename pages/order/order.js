// pages/order/order.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 总数据
    list:[],
    // 临时数据
    cartlist:[],
    // 总价
    totalPrice:'0',
    cinema_info:{}, //城市地址信息
    isShowMore:false
  },
  initCartlist(){
    let count = 2; //最多能显示2条数据
    let tempCartlist = [];
    for (let i = 0; i < this.data.list.length; i++) {
      if (i < count) {
        tempCartlist.push(this.data.list[i]);
      } else {
        break
      }
    }
    this.setData({
      cartlist: tempCartlist
    });
    // console.log(this.data.cartlist)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取APP中的数据
    let cartlist = App.globalData.newOrder;
    // console.log(cartlist);
    this.setData({
      list: cartlist
    });
    // 数据量
    this.initCartlist();
    // 调用计算总价
    this.totalPrice();
  },
  // 显示更多
  loadmord(){
    // 需要收起
    if(this.data.isShowMore){
      this.initCartlist();
    } else { // 需要展开
      this.setData({
        cartlist:this.data.list
      })
    }
    // 设置more的状态
    this.setData({
      isShowMore:!this.data.isShowMore
    })
  },
  // 处理总价
  totalPrice(){
    // 处理总价totalPrice
    let tempTotal = 0; //记录总价
    // 遍历购物车里面所有商品
    for (let i = 0; i < this.data.list.length; i++) {
      // 总价等于每个商品的 单价*数量
      tempTotal += this.data.list[i].price * this.data.list[i].count;
    }
    this.setData({
      totalPrice: tempTotal,
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
    this.setData({
      cinema_info: wx.getStorageSync('cimemainfo')
    })
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