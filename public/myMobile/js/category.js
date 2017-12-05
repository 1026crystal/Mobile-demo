/**
 * Created by Administrator on 2017/12/3.
 */
;(function(){
    //发送ajax请求，获取一级分类的数据
    $.ajax({
        type:"get",
        url:"/category/queryTopCategory",
        success:function(data){
            console.log(data);
            $(".category_left ul").html(template("tpl_left" ,data));


        //    渲染二级分类的第一项
            var id=data.rows[0].id;
            renderSecond(id);

        }
    });

    //发送ajax请求，获取对应一级分类id的二级分类
    function renderSecond(id){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategory",
            data:{
                id:id
            },
            success:function(data){
                //console.log(data);
                $(".category_right ul").html(template("tpl_right" ,data));
            }
        });
    }

//   给所有的一级分类注册点击事件
    $(".category_left ul").on('click','li',function(){
        $(this).addClass("now").siblings().removeClass("now");
    //    获取到对应的id
        var id=$(this).data("id");
        renderSecond(id);

        //mui('.mui-scroll-wrapper').scroll()
        // 获取到页面中所有的滚动容器,如果有多个，会返回一个数组

        mui(".mui-scroll-wrapper").scroll()[1].scrollTo(0,0,400);

    });


})();