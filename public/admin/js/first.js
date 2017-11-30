$(function(){
  var page=1;
  var pageSize=5;

  var render=function(){
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function(data){
        // console.log(data);
        $("tbody").html(template("myTpl",data));
        // 渲染分页
        $("#pagination").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:page,
          totalPages:Math.ceil(data.total/data.size),
          onPageClicked:function(a,b,c,p){
            console.log(p);
            page=p;
            render();
          }
        });
      }
    });

  }
  render();

  // 点击添加分类按钮，显示模态框
  $(".btn_add").on('click',function(){
    $("#firstModal").modal("show");
  });

  // 进行表单验证
  $form=$("#form");
  $form.bootstrapValidator({
    // 校验的小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 指定校验字段
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:"请输入一级分类的名称"
          }
        }        
      }
    }
  });

  // 表单验证成功事件
  $form.on('success.form.bv',function(e){
    e.preventDefault();
    // 发送ajax请求
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:$form.serialize(),
      success:function(data){
        // console.log(data);
        if(data.success){
          // 关闭模态框
          $("#firstModal").modal("hide");
          // 刷新页面
          render();
          // 重置表单
          $form.data("bootstrapValidator").resetForm();
          // 重置输入框的内容
          $form[0].reset();
        }

      }
    });

  });








});