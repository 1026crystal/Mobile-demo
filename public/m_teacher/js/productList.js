/**
 * Created by HUCC on 2017/12/3.
 */
$(function () {

  //1. 获取到地址栏的参数，把key放到input框里面
  //2. 发送ajax请求，获取关键字对应的商品， 结合模版引擎渲染出来
  //3. 点击搜索按钮，再次发送ajax请求，获取关键字对应的商品，结合模版引擎渲染出来。
  //4. 排序功能，点击价格进行排序，多传一个排序的参数，获取到对应的商品，结合模版引擎渲染出来


  //准备好参数，发送ajax请求，获取到结果后渲染到页面
  function render() {
    var param = {};//参数对象
    param.page = 1;
    param.pageSize = 100;
    param.proName = $(".lt_search input").val().trim();

    //考虑排序字段，如果lt_sort下的a有now的类，说明需要排序，如果都没有now这个类，说明不需要排序,,,,,,,,,如果需要排序，只需要给param加一个参数即可（price/num）,如果不需要排序，不给param加个参数即可。

    //获取lt_sort下被选中的a
    var $now = $(".lt_sort a.now");
    if($now.length === 1){
      //说明需要排序
      var type = $now.data("type");//price num
      //根据箭头的方向获取排序的值
      var value = $now.find("span").hasClass("fa-angle-down")?2:1;
      param[type] = value;
    }

    //发送数据之前，开启加载状态
    $(".lt_product").html('<div class="loading"></div>');
    $.ajax({
      type:"get",
      url:"/product/queryProduct",
      data: param,
      success:function(data){
        setTimeout(function () {
          //console.log(data);
          //渲染到页面
          $(".lt_product").html( template("tpl",data) );
        }, 1000);
      }
    });
  }


  //1. 获取到地址栏的参数，把key放到input框里面
  var key = Tools.getParam("key");
  $(".lt_search input").val(key);

  //发送ajax请求
  /*$.ajax({
    type:"get",
    url:"/product/queryProduct",
    data:{
      proName:key,
      page:1,
      pageSize:100
    },
    success:function(data){
      console.log(data);

      //渲染到页面
      $(".lt_product").html( template("tpl",data) );
    }
  });*/
  render();


  //2. 注册点击事件，重新获取关键字，发送ajax请求
  $(".lt_search button").on("click", function () {
    render();
  })



  //排序
  //1. 需要给排序的a标签并且有排序类型的注册点击事件
  $(".lt_sort a[data-type]").on("click", function () {

    //如果当前a没有now，添加now，移除其他a的now,让所有的箭头都向下
    //如果当前a有now，改变箭头方向
    var $this = $(this);

    if($this.hasClass("now")){
      //改变箭头方向
      $this.find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    }else {
      $this.addClass("now").siblings().removeClass("now");
      $(".lt_sort span").addClass("fa-angle-down").removeClass("fa-angle-up");
    }

    //重新渲染
    render();
  });


});