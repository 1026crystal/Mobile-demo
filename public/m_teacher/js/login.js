/**
 * Created by HUCC on 2017/12/4.
 */
$(function () {

  $(".btn_login").on("click", function () {

    var username = $("[name='username']").val();
    var password = $("[name='password']").val();

    //校验
    if(!username){
      mui.toast("请输入用户名");
      return false;
    }
    if(!password){
      mui.toast("请输入密码");
      return false;
    }

    $.ajax({
      type:"post",
      url:"/user/login",
      data: {
        username:username,
        password:password
      },
      success:function (data) {
        if(data.error === 403){
          mui.toast(data.message);
        }

        if(data.success){
          //跳去哪儿？
          //如果是购物车（其他需要登录的页面），跳转到登录页，登录成功了是需要回到原来的页面的。
          //如果是直接访问的登录页，跳转到用户中心
          //如果参数中有retUrl,说明需要回跳，如果没有，默认跳到user.html
          var search = location.search;
          if(search.indexOf("retUrl") === -1){
            //不包含, 跳转到用户中心
            location.href = "user.html";
          }else {
            search = search.replace("?retUrl=", "");
            location.href = search;
          }


        }
      }
    });

  });

});