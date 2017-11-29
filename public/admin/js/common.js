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






    
});


