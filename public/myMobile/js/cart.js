$(function () {
  //增加一个下拉刷新功能
  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        height: 50,//可选,默认50.触发下拉刷新拖动距离,
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        callback: function () {
          // //发送ajax请求，获取到购物车的数据，渲染到页面
          $.ajax({
            type: "get",
            url: "/cart/queryCart",
            success: function (data) {
              console.log(data);
              setTimeout(function () {
                if (data.error === 400) {
                  location.href = "login.href?returnUrl=" + location.href;
                }
                // data是一个数组
                $("#OA_task_2").html(template("myTpl", { list: data }));
                //结束下拉刷新的效果
                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
              }, 1000);
            }
          });
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });

  // 删除功能
  //1. 给删除按钮注册点击事件
  //2. 获取到点击的删除按钮的id
  //3. 发送ajax请求，删除数据，重新渲染页面
  //如果使用了下拉刷新功能，不能用click事件，使用tap事件来替代

  $("#OA_task_2").on("tap", ".btn_delete", function () {
    var id = $(this).data("id");
    // console.log(id);
    mui.confirm("您是否确定要删除这件商品？", "温馨提示", ["确定", "取消"], function (e) {
      if (e.index === 0) {
        $.ajax({
          type: "get",
          url: "/cart/deleteCart",
          data: {
            id: [id]
          },
          success: function (data) {
            // console.log(data);
            if (data.success) {
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();

            }
          }
        });
      }
    });
  });

  // 修改功能
  //1. 给修改按钮注册点击事件
  //2. 获取点击的按钮的id
  //3. 发送ajax请求，获取id对应的购物车的信息
  //4. 信息回显
  //5. 修改信息
  $("#OA_task_2").on("tap", ".btn_edit", function () {
    //dataset:原生js获取自定义属性的属性。所有data-开头的属性都会存储到dataset中。
    var data = this.dataset;
    console.log(data);
    var html = template("myTpl2", data);
    //应该把html中所有的换行\n给去掉
    html = html.replace(/\n/g, "");
    //获取到这件商品的信息
    mui.confirm(html,"编辑商品",["确定","取消"], function (e) {
      if(e.index === 0){

        //获取id 尺码 数量
        var id = data.id;
        var size = $(".lt_edit_size span.now").text();
        var num = $(".mui-numbox-input").val();
        //发送ajax请求
        $.ajax({
          type:"post",
          url:"/cart/updateCart",
          data: {
            id:id,
            size:size,
            num:num
          },
          success:function (data) {
            if(data.success){
              //下拉一次即可
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        })
      }
    });
    //选择尺码
    $(".lt_edit_size span").on("tap", function () {
      $(this).addClass("now").siblings().removeClass("now");
    })
    //重新渲染numbox
    mui(".mui-numbox").numbox();
  });

   //计算总金额
   $("#OA_task_2").on("change",".ckbox",function(){
     var total=0;
     $(":checked").each(function(){
       var price=$(this).data("price");
       var num=$(this).data("num");
      //  console.log(price);
      //  console.log(num);
       total+=price*num;
     });

     $(".lt_total .total").text(total.toFixed(2));
   });













});