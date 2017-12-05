$(function(){

  //发送ajax请求，获取个人信息
  $.ajax({
    type:"get",
    url:"/user/queryUserMessage",
    success:function(data){
      console.log(data);
      if(data.error===400){
        location.href="login.html";
      }
      $(".userinfo").html(template("myTpl",data));
    }
  });







  // 退出功能
  $(".btn_logout").on("click",function(){
    $.ajax({
      type:"get",
      url:"/user/logout",
      success:function(data){
        // console.log(data);
        if(data.success){
          location.href="login.html";
        }
      }
    });

  });

});