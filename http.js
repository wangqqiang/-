class Http{
  // 请求城市列表
  static citys(callback){
    wx.request({
      url: 'https://www.bestqingshan.top/movie/citys.php',
      success(res){
        callback(res);
      },
      fail(err){
        callback(err);
      }
    })
  }
  // 请求城市id对应的影院
  static cinemas(callback) {
    wx.request({
      url: 'https://www.bestqingshan.top/movie/movieInfo.json',
      success(res) {
        callback(res);
      },
      fail(err) {
        callback(err);
      }
    })
  }
  // 请求电影详情
  static getDetails(callback) {
    wx.request({
      url: 'https://www.bestqingshan.top/movie/movie.json',
      success(res) {
        callback(res);
      },
      fail(err) {
        callback(err)
      }
    });
  }
  // 根据城市名称获取城市id
  static getCityIdByName(cityname, callback) {
    wx.request({
      url: `https://www.bestqingshan.top/movie/getCityIdByName.php?cityname=${cityname}`,
      success(res) {
        callback(res);
      },
      fail(err) {
        callback(err)
      }
    })
  }


  // 请求轮播图的图片 
  static imgUrls(callback) {
    wx.request({
      url: 'https://www.bestqingshan.top/movie/getSwiper.php',
      success(res) {
        callback(res);
      },
      fail(err) {
        callback(err);
      }
    })
  }
  // 影院列表真实接口数据  过
  static cinemas_real(cityid, page, callback) {
    wx.request({
      url: 'https://www.bestqingshan.top/demo/Juhe.php',
      data: {
        url: 'http://v.juhe.cn/movie/cinemas.search',
        param: {
          cityid: cityid,
          key: this.key,
          page: page,
          pagesize: 20
        }
      },
      success(res) {
        callback(res)
      },
      fail(err) {
        callback(err)
      }
    })
  }
  // 请求真实影片信息接口数据
  static movieInfo(movieId, callback) {
    wx.request({
      url: 'https://www.bestqingshan.top/demo/Juhe.php',
      data: {
        url: 'http://v.juhe.cn/movie/query',
        param: {
          movieid: movieid,
          key: this.key,
          dtype: 'json'
        }
      },
      success(res) {
        callback(res)
      },
      fail(err) {
        callback(err)
      }
    })
  }
  // 影院上映影片信息真实
  static cinemasMovies(cinemaid,callback){
    wx.request({
      url: 'https://www.bestqingshan.top/demo/Juhe.php',
      data: {
        url: 'http://v.juhe.cn/movie/cinemas.movies',
        param: {
          cinemaid: cinemaid,
          key: this.key,
        }
      },
      success(res) {
        callback(res)
      },
      fail(err) {
        callback(err)
      }
    })
  }
  // 真实电影详情真实
  static movieInfo_real(movieId,callback){
    wx.request({
      url: 'https://www.bestqingshan.top/demo/Juhe.php',
      data: {
        url: 'http://v.juhe.cn/movie/query',
        param: {
          movieid: movieId,
          key: this.key,
        }
      },
      success(res) {
        callback(res)
      },
      fail(err) {
        callback(err)
      }
    })
  }
  // 请求商品列表的接口
  static saleGoods(callback){
    wx.request({
      url: 'https://www.bestqingshan.top/movie/saleGoods.json',
      success(res) {
        callback(res);
      },
      fail(err) {
        callback(err)
      }
    });
  }
  
  
}
Http.key = 'fa248f5a1d13e6d20063d5dc43b4048c';
module.exports = Http;