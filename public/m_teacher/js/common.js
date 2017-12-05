mui(".mui-scroll-wrapper").scroll({
  indicators:false
});

mui(".mui-slider").slider({
  interval:1000
});


////获取参数
//function getParamObj(){
//  //获取参数列表
//  var search = location.search;
//
//  //对参数进行解码  ?name=hucc&age=18&desc=帅的一匹
//  search = decodeURI(search);
//
//  //把?切掉  name=hucc&age=18&desc=帅的一匹
//  search = search.slice(1);
//
//  //把字符串切割成一个数组  ["name=hucc", "age=18", "desc=帅的一匹"]
//  var arr = search.split("&");
//
//  //遍历数组，把值存到对象中
//  var obj = {}
//  arr.forEach(function (e) {
//    var key = e.split("=")[0];
//    var value = e.split("=")[1];
//    obj[key] = value;
//  });
//
//  return obj;
//}
//
////获取指定参数
//function getParam(key){
//  return getParamObj()[key];
//}

var Tools = {
  getParamObj: function () {
    //获取参数列表
    var search = location.search;

    //对参数进行解码  ?name=hucc&age=18&desc=帅的一匹
    search = decodeURI(search);

    //把?切掉  name=hucc&age=18&desc=帅的一匹
    search = search.slice(1);

    //把字符串切割成一个数组  ["name=hucc", "age=18", "desc=帅的一匹"]
    var arr = search.split("&");

    //遍历数组，把值存到对象中
    var obj = {}
    arr.forEach(function (e) {
      var key = e.split("=")[0];
      var value = e.split("=")[1];
      obj[key] = value;
    });

    return obj;
  },
  getParam: function (key) {
    return this.getParamObj()[key];
  }
}