$(function(){
  var page=1;
  var pageSize=5;
  var render=function(){
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function(data){
        // console.log(data);
        // 把数据渲染到tbody中
        var html=template('myTpl',data);
        $('tbody').html(html);

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

  //按钮的启用、禁用事件
  $('tbody').on('click','button',function(){
    $('#userModal').modal('show');
    // 获取id
    // console.log(this);
    var id=$(this).parent().data('id');
    var isDelete=$(this).hasClass("btn-danger") ? 0:1;
    console.log(id);
    console.log(isDelete);

    $(".btn_confirm").off().on('click',function(){
      $.ajax({
        type:"post",
        url:"/user/updateUser",
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function(data){
          // console.log(data);
          if(data.success){
            // 关闭模态框
            $('#userModal').modal('hide');
            // 重新渲染页面
            render();
          }
        }
      });     
    });
  }); 

 
});