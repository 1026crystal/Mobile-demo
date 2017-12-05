; (function () {
  //1. 从localStorage中获取到history对应的值
  //2. 把字符串转换成数组

  // var history=localStorage.getItem("history");
  // console.log(history);//["特步","阿迪达斯"]
  // var arr=JSON.parse(history);
  // console.log(arr); //(2) ["特步", "阿迪达斯"]
  // $(".lt_history").html(template("myTpl",{list:arr}));

  function getHistoryArr() {
    var history = localStorage.getItem("history") || '[]';
    var arr = JSON.parse(history);
    return arr;

  }
  // 数据渲染函数
  function render() {
    var arr = getHistoryArr();
    $(".lt_history").html(template("myTpl", { list: arr }));
    console.log(arr);
  }
  //1、列表渲染功能
  //1. 从本地缓存中获取到数据，并且转换成了数组
  //2. 结合模版引擎，把数据渲染出来
  render();


  // 2、清空数据的逻辑
  //1. 注册点击事件
  //2. 把localStorage中的history清除
  //3. 重新渲染
  $(".lt_history").on('click', ".btn_empty", function () {
    mui.confirm("确定要清空所有的关键字吗？", "温馨提示", ["取消", "确定"], function (e) {
      // console.log(e);
      if (e.index === 1) {
        localStorage.removeItem("history");
        render();
      }
    });
  });

  //3、删除的逻辑
  //1. 给x注册点击事件
  //2. 获取到点击的x的下标
  //3. 获取本地缓存，得到数组
  //4. 删除数组对应下标的那一项
  //5. 重新设置缓存
  //6. 重新渲染
  $(".lt_history").on("click", ".btn_delete", function () {
    mui.confirm("确定要删除这个关键字吗？", "温馨提示", ["取消", "确定"], function (e) {
      // console.log(e);
      if (e.index === 1) {
        var index = $(this).data("index");
        var arr = getHistoryArr();
        arr.splice(index, 1);
        localStorage.setItem("history", JSON.stringify(arr));
        render();
      }
    });
  });

  //4、添加的逻辑
  //1. 注册点击事件
  //2. 获取到输入的关键字
  //3. 获取本地缓存，得到数组
  //4. 把关键字添加到数组的最前面
  //5. 重新设置缓存
  //6. 重新渲染
  $(".lt_search button").on('click', function () {
    var value = $(".lt_search input").val().trim();
    $(".lt_search input").val('');
    if (value === '') {
      mui.toast("请输入搜索关键字");
      return false;
    }
    var arr = getHistoryArr();
    //判断key在数组中是否存在，如果存在，删除它。
    var index = arr.indexOf(value);
    if (index != -1) {
      arr.splice(index, 1);
    }
    //判断，如果数组的长度已经是10了，删除最后一个
    if (arr.length >= 10) {
      arr.pop();
    }
    arr.unshift(value);
    localStorage.setItem("history", JSON.stringify(arr));
    render();

    // 页面跳转到商品列表页
    location.href="productList.html?key="+value;

  });









})();