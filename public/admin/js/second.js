$(function () {
  var page = 1;
  var pageSize = 5;

  var render = function () {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (data) {
        // console.log(data);
        $("tbody").html(template("myTpl", data));

        // 渲染分页
        $("#pagination").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(data.total / data.size),
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        });

      }
    });

  }
  render();


  // 点击添加按钮，显示模态框
  $(".btn_add").on('click', function () {
    $("#secondModal").modal("show");

    //需要发送ajax请求，获取到所有的一级分类，渲染到下拉菜单中 
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: page,
        pageSize: 1000
      },
      success: function (data) {
        $(".dropdown-menu").html(template("myTpl2", data));

      }
    });
  });

  //给下拉框中的a注册点击事件
  $(".dropdown-menu").on('click', 'a', function () {
    //  获取当前a标签的文本
    var text = $(this).text();
    //  设置给按钮的文本
    $(".dropdown-text").text(text);

    //获取到id值，设置给categoryId
    $("[name='categoryId']").val($(this).data['id']);

    //让categoryId校验成功 
    $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");

  });

  // 图片上传
  $("#fileupload").fileupload({
    // 指定响应的数据格式
    dataType: "json",
    //图片上传完成后，会执行的一个函数,通过data.result可以获取到结果
    done: function (e, data) {
      // console.log(data);
      // 获取图片的途径
      // console.log(data.result.picAddr)
      $(".img_box img").attr("src", data.result.picAddr);

      //把上传的图片的地址赋值给 brandLogo
      $("[name='brandLogo']").val(data.result.picAddr);

      $form.data("bootstrapValidator").updateStatus("brandLogo","VALID");

    }
  });

  // 表单校验
  $form = $('form');
  $form.bootstrapValidator({
    excluded: [],
    //  校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //  校验规则
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },

      brandName: {
        validators: {
          notEmpty: {
            message: "请选择二级分类的名称"
          }
        }
      },

      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    },
  });

  //  给表单注册检验成功事件
  $form.on("success.form.bv", function (e) {
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/category/addSecondCategory',
      date:$form.serialize(),
      success:function(data){
        // console.log(data);
        if(data.success){
          // 关闭模态框
          $("#secondModal").modal("hide");
          // 重新渲染第一页
          page=1;
          render();

          // 重置样式和表单的值
          $form.data("bootstrapValidator").resetForm();
          $form[0].reset();

          $("[type='hidden']").val('');
          $("dropdown-text").text("请选择一级分类");
          $(".img_box img").attr("src","images/none.png");

        }
      }
    });
  });


});