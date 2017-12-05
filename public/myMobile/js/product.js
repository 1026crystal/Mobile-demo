$(function(){
  //获取地址栏中的参数，得到商品的id
  //发送ajax请求，获取商品的数据
  var id=tools.getParam("productId");
  // console.log(id);

// 渲染商品信息
  $.ajax({
    type:"get",
    url:"/product/queryProductDetail",
    data:{
      id:id
    },
    success:function(data){
      // var sizeArray=[];
      // var temp=data.size.split("-");
      // for(var i=+temp[0];i<=temp[1];i++){
      //   sizeArray.push(i);
      // }
      // data.sizeArray=sizeArray;
     console.log(data);
      $(".mui-scroll").html(template("myTpl",data));
      // 重新初始化轮播图
      mui(".mui-slider").slider({
        interval:1000
      });
      // 重新初始化数字输入框
      mui(".mui-numbox").numbox();
      // 尺码选择
      $(".lt_size span").on('click',function(){
        $(this).addClass("now").siblings().removeClass("now");
      });
    }
  });

// 点击加入购物车按钮
$(".btn_add_cart").on("click",function(){
  var productId=tools.getParam("productId");
  var size=$(".lt_size span.now").text();
  var num=$(".mui-numbox-input").val();
  if(!size){
    mui.toast("请选择合适的尺码");
    return false;
  }

  $.ajax({
    type:"post",
    url:"/cart/addCart",
    data:{
      productId:productId,
      num:num,
      size:size
    },
    success:function(data){
      // console.log(data);
      if(data.error===400){
        //未登录
        // 需要传递一个参数，这个参数指定了回跳的地址。
        location.href="login.html?returnUrl="+location.href;
      }
      if(data.success){
        mui.confirm("添加商品成功","提示",["去购物车","继续逛逛"],function(e){
          if(e.index===0){
            location.href="cart.html";
          }
        });


      }
    }
  });
  
  
  

});



});
