$(function(){
  var page=1;
  var pageSize=5;

  var render=function(){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
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
            page=p;
            render();
          }
        });

      }
    });

  }
  render();


  // 点击添加按钮，显示模态框
  $(".btn_add").on('click',function(){
    $("#secondModal").modal("show");

    //需要发送ajax请求，获取到所有的一级分类，渲染到下拉菜单中 
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:page,
        pageSize:1000
      },
      success:function(data){
        $(".dropdown-menu").html(template("myTpl2",data));

      }
    });
  });


});