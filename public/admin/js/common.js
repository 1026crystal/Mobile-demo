$(function(){
    // 关闭进度环
    NProgress.configure({
        showSpinner:false
    });

    $(document).ajaxStart(function(){
        //开启进度条
        NProgress.start();
    });

    $(document).ajaxStop(function(){
        //关闭进度条
        setTimeout(function(){
            NProgress.done();
        },1000);  
    });

    // 验证用户是否登录
    if(location.href.indexOf("login.html")===-1){
        $.ajax({
            type:'get',
            url:'/employee/checkRootLogin',
            success:function(data){
                // console.log(data);
                if(data.error==400){
                    location.href="login.html";
                }
            }
        });
    }

    // 二级菜单的显示与隐藏
    $('.nav .child').prev().on('click',function(){
        // console.log(this);
        $(this).next().slideToggle("now");

    });

    // 侧边栏的显示与隐藏效果
    $(".topBar .icon_menu").on('click',function(){
        console.log(this);
        $(".lt_aside").toggleClass("now");
        $(".lt_main").toggleClass("now");
        $(".topBar").toggleClass("now");

    });

    // 退出
    $(".topBar .icon_logout").on('click',function(){
        console.log(this);
        $('#myModal').modal('show');

        //因为jquery注册事件不会覆盖。
        //off()解绑所有的事件
        //off("click")
        $(".btn_logout").off().on('click',function(){
            //发送ajax请求，告诉服务器，需要退出
            $.ajax({
                type:'get',
                url:"/employee/employeeLogout",
                success:function(data){
                    // console.log(data);
                    if(data.success){
                        location.href="login.html";
                    }
                }
            });
        });
    });
    
// ============实现退出   方法2================
    // $(".btn_logout").on('click',function(){
    //     $.ajax({
    //         type:'get',
    //         url:"/employee/employeeLogout",
    //         success:function(data){
    //             // console.log(data);
    //             if(data.success){
    //                 location.href="login.html";
    //             }
    //         }
    //     });
    // });

});


