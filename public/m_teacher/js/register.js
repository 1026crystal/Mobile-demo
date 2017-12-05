/**
 * Created by HUCC on 2017/12/4.
 */
$(function () {


  //获取验证码的功能
  $(".vcode_box button").on("click", function (e) {
    e.preventDefault();

    //只要点击了，就需要禁用掉按钮
    var $this = $(this);
    $this.prop("disabled", true).text("正在发送中...").addClass("disabled");

    $.ajax({

      type:"get",
      url:"/user/vCode",
      success:function (data) {
        console.log(data.vCode);//打印结果就是手机接收到的验证码

        //开启一个倒计时
        var count = 5;
        var timer = setInterval(function () {
          count--;
          $this.text(count+"秒后再次发送");
          if(count <= 0){
            //到时间了，需要清除定时器，重新启用按钮
            clearInterval(timer);
            $this.prop("disabled", false).removeClass("disabled").text("再次发送");
          }
        }, 1000);

      }

    });


  });



  //注册功能
  $(".btn_register").on("click", function (e) {
    e.preventDefault();

    var username = $("[name='username']").val();
    var password = $("[name='password']").val();
    var repassword = $("[name='repassword']").val();
    var mobile = $("[name='mobile']").val();
    var vCode = $("[name='vCode']").val();


    //校验
    if(!username) {
      mui.toast("请输入用户名");
      return false;
    }

    if(!password) {
      mui.toast("请输入密码");
      return false;
    }

    if(password != repassword){
      mui.toast("确认密码与密码不一致");
      return false;
    }

    if(!mobile) {
      mui.toast("请输入手机号");
      return false;
    }

    if(!/^1\d{10}$/.test(mobile)){
      mui.toast("请输入正确的手机号");
      return false;
    }

    if(!vCode){
      mui.toast("请输入验证码");
      return false;
    }


    //校验通过了  ide  编辑器
    $.ajax({
      type:"post",
      url:"/user/register",
      data: $("form").serialize(),
      success:function (data) {
        if(data.success){
          mui.toast("恭喜你，注册成功了，1秒后跳转到登录页面");
          setTimeout(function () {
            location.href = "login.html";
          }, 1000);
        }

        if(data.error){
          mui.toast(data.message);
        }
      }
    });

  });


});