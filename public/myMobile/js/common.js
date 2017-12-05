/**
 * Created by Administrator on 2017/12/2.
 */
    //轮播图
    mui(".mui-slider").slider({
        interval:1000
    });

//    区域滚动
    mui(".mui-scroll-wrapper").scroll({
        indicator:false
    });


// // 获取参数
// function getParamObj(){
//     var search=location.search;
//     // 对参数进行解码
//     search=decodeURI(search); // ?key=111
//     search=search.slice(1); // key=111
//     // console.log(search);
//     var arr=search.split("&");
//     // console.log(arr);
//     var obj={};
//     arr.forEach(function(e,i){
//         var key=e.split("=")[0];
//         var value=e.split("=")[1];
//         obj[key]=value;
//     });
//     return obj;        
// }

function getParam(){
    return getParamObj()[key];
}

var tools={
    getParamObj:function(){
        var search=location.search;
        // 对参数进行解码
        search=decodeURI(search); // ?key=111
        search=search.slice(1); // key=111
        // console.log(search);
        var arr=search.split("&");
        // console.log(arr);
        var obj={};
        arr.forEach(function(e,i){
            var key=e.split("=")[0];
            var value=e.split("=")[1];
            obj[key]=value;
        });
        return obj; 
    },
    getParam:function(key){
        return this.getParamObj()[key];
    }
};





