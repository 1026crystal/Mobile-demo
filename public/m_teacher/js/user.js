/**
 * Created by HUCC on 2017/12/4.
 */
$(function () {

  //发送ajax请求，获取个人信息
  $.ajax({
    type:"get",
    url:"/user/queryUserMessage",
    success:function (data) {

      console.log(data);
      //失败了，就跳转到登录页
      if(data.error === 400){
        location.href = "login.html";
      }

      //渲染页面
      $(".userinfo").html( template("tpl",data) );

    }
  });


  //退出功能
  $(".btn_logout").on("click", function () {
    $.ajax({
      type:"get",
      url:"/user/logout",
      success:function (data) {
        if(data.success){
          location.href = "login.html";
        }
      }
    });
  })

});