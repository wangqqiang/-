// pages/product/product.js
const Http = require("../../http.js");
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存储城市的地址
    cinema_info: {},
    // 存储所有数据列表
    saleGoods: [],
    dataIndex:0,
    // 用来标记购物车列表是否为空，true表示为空，false表示不为空
    // 为true则结算按钮是金色，否则为灰色
    isCartListEmpty:true,
    // 定义商品总价
    totalPrice:0,
    // 定义购物车角标的数量
    countMarker:0,
    // 点击购物车出现或隐藏购物车列表
    isShowCartList:false,
    // 购物车列表数据
    cartlist:[]
  },
  setSaleData(event){
    // 设置标题的index数
    this.setData({
      dataIndex: event.currentTarget.id -1
    });
  },
  checkout(){
    if(this.data.isCartListEmpty){
      return;
    }
    let $this = this;
    // 设置cartlist通过APP给order页面
    App.globalData.newOrder = $this.data.cartlist;
    
    wx.navigateTo({
      url: '../order/order',
      success(){
        // 生成订单列表
        $this.createOrder($this.data.cartlist);
        // 清空购物车
        $this.clearCartlist();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.removeStorageSync("cartlist");
    wx.showLoading({
      title: '加载中..',
    });
    let $this = this;
    // 设置存储城市的地址
    this.setData({
      cinema_info: wx.getStorageSync('cinemainfo')
    });
    // 商品数据
    Http.saleGoods(function(res){
      $this.setData({
        saleGoods: res.data.result
      });
      wx.hideLoading();
    });
  },
  // 生成订单
  createOrder(){
    // 生成订单
    let goodsOrderList = wx.getStorageSync('goodsOrderList') ? wx.getStorageSync('goodsOrderList') : {};      //key为订单编号
    let key = 'wx' + new Date().Format("yyyyMMddhhmmss");
    goodsOrderList[key] = { 'orderTime': new Date().Format("yyyy-MM-dd hh:mm"), 'orderData': this.data.cartlist };

    wx.setStorage({
      key: 'goodsOrderList',
      data: goodsOrderList
    })
    console.log(goodsOrderList);
  },
  // 购物车按钮
  showCartList(){
    if (this.data.isShowCartList){
      this.setData({
        isShowCartList: false
      })
    }else{
      if(!this.data.isCartListEmpty){
        this.setData({
          isShowCartList: true
        })
      }
    }
  },
  // 加减
  addMoney(event){
    // 获取商品的id
    let goodsId = event.currentTarget.dataset.goodsid;
    // 获取当前点的是加还是减
    let type = event.currentTarget.dataset.type;
    // 第一层循环获取所有的商品
    for (let i = 0; i < this.data.saleGoods.length; i++) {
      let tempGoods = this.data.saleGoods[i];
      // 第二层循环获取某个商品类的具体商品
      for (let j = 0; j < tempGoods.data.length; j++) {
        if (tempGoods.data[j].id == goodsId) {
          // type ==1 加法
          if (type == 1) {
            tempGoods.data[j].count++;
            // 添加一个持久存储
            this.storage(tempGoods.data[j],1);
          }
          // 减法
          else if (type == 0) {
            if (tempGoods.data[j].count > 0){
              tempGoods.data[j].count--;
              // 删除一个持久存储
              this.storage(tempGoods.data[j], 0);
            }
              
          }
          let newGoods = this.data.saleGoods;
          // console.log(newGoods);
          this.setData({
            saleGoods: newGoods,
          });
          return;
        }
      }
    }

  },
  /*
    持久存储
    goods表示要存储或删除的商品
    type为1 表示新增 0 表示删除
  */ 
  storage(goods,type){
    // 第一次添加数据storage为为空，则使用一个空数组添加goods商品，第二次，第三次往后storage不为空，则在当前storage基础上进行添加和删除
    let cartlist = wx.getStorageSync('cartlist') ? wx.getStorageSync('cartlist') : [];
    // type 1表示添加数据
    if(type == 1){
      // flag用来标记goods商品在购物车列表中是否存在，false表示不存在，true表示存在
      let flag = false;
      // 循环整个购物车列表寻找是否goods已经存在
      for(let i =0; i<cartlist.length; i++){
        // 如果if条件成立，则找到了已有的goods商品
        if(cartlist[i].id == goods.id){
          flag = true;
          cartlist[i] = goods;
          break;
        }
      }
      if(flag == false){
        cartlist.unshift(goods);
      }
    }else{ //表示删除数据
      // 循环整个购物车列表寻找是否goods已经存在
      for (let i = 0; i < cartlist.length; i++) {
        // 如果if条件成立，则找到了已有的goods商品
        if (cartlist[i].id == goods.id) {
          // 判断购物车商品数量，大于1 则减一 等于一则直接删除
          if(cartlist[i].count > 1){
            cartlist[i] = goods;
          }else{
            cartlist.splice(i,1);
          }
         
        }
      }
    }
    if(cartlist.length > 0){
      this.setData({
        // 不为空
        isCartListEmpty :false
      })
    }else{
      this.setData({
        // 为空
        isCartListEmpty: true
      })
    }
    // 处理总价totalPrice和处理购物车角标
    let tempTotal = 0; //记录总价
    let tempCount = 0; //记录总数量
    // 遍历购物车里面所有商品
    for(let i=0; i<cartlist.length; i++){
      // 总价等于每个商品的 单价*数量
      tempTotal += cartlist[i].price * cartlist[i].count;
      tempCount += cartlist[i].count;
    }
    this.setData({
      totalPrice: tempTotal,
      countMarker: tempCount
    });
    
    // 在cartlist的首位添加商品
    wx.setStorage({
      key: 'cartlist',
      data: cartlist,
      success(){
        // console.log(cartlist)
      }
    });
    // 给模板的购物车列表赋值
    this.setData({
      cartlist:cartlist
    });
  },
  // 清空购物车
  clearCartlist() {
    // 清空购物车列表
    wx.removeStorageSync('cartlist');
    // 还原saleGoods原始数据
    let newSaleGoods = this.data.saleGoods;
    for (let i = 0; i < newSaleGoods.length; i++) {
      for (let j = 0; j < newSaleGoods[i].data.length; j++) {
        newSaleGoods[i].data[j].count = 0;
      }
    }
    //  还原数据源
    this.setData({
      saleGoods: newSaleGoods,
    });
    // 还原其他数据
    this.setData({
      isCartListEmpty: true,
      isShowCartList: false,
      totalPrice: 0,
      countMarker: 0,
      cartlist: []
    })
  },
  // 返回城市页面
  cinemas() {
    let cityId = wx.getStorageSync('cityinfo').id;
    wx.navigateTo({
      url: `../cinema/cinema?id=${cityId}`,
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    Date.prototype.Format = function (fmt) { //author: meizz 
      var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      cinema_info:wx.getStorageSync('cinemainfo')
    });
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