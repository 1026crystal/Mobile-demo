$(function(){

  var page=1;
  var pageSize=5;
  var imgs=[];


 //发送ajax请求，获取到商品的数据，渲染到页面中
  var render=function(){
    $.ajax({
      type:"get",
      url:"/product/queryProductDetailList",
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function(data){
        // console.log(data);
        $("tbody").html(template("myTpl",data));

        // 渲染分页
        $("#pagination").bootstrapPaginator({
          // 设定版本
          bootstrapMajorVersion:3,
          //当前页
          currentPage:page,
          // 总页数
          totalPages:Math.ceil(data.total/data.size),
          onPageClicked:function(a,b,c,p){
            page=p;
            render();
          },
          //控制每个操作按钮的显示文字。
          itemTexts:function(type,page,current){
            //type: 如果是具体的页码，类型是page
            //如果是首页，type：first
            //上一页：type:prev
            //下一页:type:next
            //尾页：last
            switch(type){
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              default:
                return page; 
            }
          },
          //设置操作按钮的title属性
          tooltipTitles:function(type,page,current){
            switch(type){
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              default:
              return "调到第"+page+"页";
            }
          },
          //设置是否使用Bootstrap内置的tooltip。
          useBootstrapTooltip:true,
        });
      }
    });

  }
  render();

  // 点击添加商品，显示模态框
  $(".btn_add").on('click',function(){
    $("#productModal").modal("show");
    //需要发送ajax请求，获取到所有的二级分类，渲染到下拉菜单中 
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:page,
        pageSize:100
      },
      success:function(data){
        console.log(data);
        $(".dropdown-menu").html(template("myTpl2",data));
      }
    });

  });

  // 点击下拉菜单的a标签，注册点击事件
  $(".dropdown-menu").on("click",'a',function(){
    $(".dropdown-text").text($(this).text());

    //获取到id值，设置给brandId
    $("[name='brandId']").val($(this).data("id"));
    // /让categoryId校验成功 
    $form.data("bootstrapValidator").updateStatus("brandId","VALID");

  });

  // 图片上传
  $("#fileupload").fileupload({
    dataType:"json",
    done:function(e,data){
      if(imgs.length >=3){
        return false;

      }
      console.log(data.result);
      //动态的往img_box添加一张图片
      $(".img_box").append('<img src="'+data.result.picAddr+'" width="100" height="100" alt="">');

      // 把返回的结果存储起来
      imgs.push(data.result);
      // 
      //判断imgs的长度，如果imgs的长度等于3，说明上传了3张，
      // 把productLogo改成校验成功
      if(imgs.length===3){
        $form.data("bootstrapValidator").updateStatus("productLogo","VALID");

      }else {
        $form.data("bootstrapValidator").updateStatus("productLogo","INVALID");

      }
    }

  });

  // 表单验证
  $form=$("form");
  $form.bootstrapValidator({
    excluded:[],
    // 校验的图标
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 指定校验字段
    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message:"请选择品牌"
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:"输入商品的名称"
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:"请输入商品的描述"
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:"请输入商品的库存"
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:"请输入非零的数字"
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:"请输入商品的尺码"
          },
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message:"请输入32-46的尺码"
          }      
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:"请输入商品的原价"
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:"请输入非零的数字"
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:"请输入商品的现价"
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:"请输入非零的数字"
          }
        }
      },
      productLogo:{
        validators:{
          notEmpty:{
            message:"请选择三张图片"
          }
        }
      },
    },
  });

  // 注册表单验证成功事件
  $form.on("success.form.bv",function(e){
    e.preventDefault();
    var params=$form.serialize();
    // console.log(params);
    params+= "&picName1="+imgs[0].picName+"&picAddr1="+imgs[0].picAddr;
    params += "&picName2="+imgs[1].picName + "&picAddr2=" + imgs[1].picAddr;
    params += "&picName3="+imgs[2].picName + "&picAddr3=" + imgs[2].picAddr;



    $.ajax({
      type:"post",
      url:"/product/addProduct",
      data:params,
      success:function(data){
        // console.log(data);
        if(data.success){

          // 关闭模态框
          $("#productModal").modal("hide");
          // 刷新页面
          page=1;
          render();
          //重置样式和表单的值
          $form.data("bootstrapValidator").resetForm();
          $form[0].reset();

          $(".dropdown-text").text("请选择二级目录");
          $("[type='hidden']").val('');
          // 删除图片
          $(".img_box img").remove();
          // 清空数组
          imgs=[];
        }
      }
    
    });
  });





});