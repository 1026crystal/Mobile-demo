$(function(){
//表单校验功能:
  //1. 用户名不能为空
  //2. 密码不能为空
  //3. 密码长度是6-12

  var $form=$("form");
  //在调用了bootstrapValidator方法初始化了表单校验之后，
  //可以通过$form.data('bootstrapValidate')可以得到一个插件对象，
  //通过对象可以调用插件给我们提供的方法

//   form表单验证
  $form.bootstrapValidator({
    //配置校验的小图标
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
    
    //指定校验字段
    //配置的参数
    //配置校验规则,需要校验的字段,对应表单中的name属性
    fields: {
        //校验用户名，对应name表单的name属性
        username: {
            validators: {
                //不能为空
                notEmpty: {
                    message: '用户名不能为空'
                },
                callback:{
                    message:"用户不存在"
                }
            }
        },
        password: {
            validators: {
                //不能为空
                notEmpty: {
                    message: '密码不能为空'
                },
                //长度校验
                stringLength: {
                    min: 6,
                    max: 12,
                    message: '用户名长度必须在6-12位之间'
                },
                callback:{
                    message:"密码错误"
                }
            }
        }
    }


  });

//   注册表单验证成功事件，
//禁止表单的自动提交，使用ajax进行表单的提交
$form.on('success.form.bv',function(e){
    //阻止浏览器的默认行为
    e.preventDefault();
    //发送ajax请求
    $.ajax({
        type:"post",
        url:'/employee/employeeLogin',
        // dataType:'json',  //如果后端返回的响应头中是text/html
        data:$form.serialize(),
        success:function(data){
            // console.log(data);
            if(data.success){
                location.href="index.html";
            }
            if(data.error==1000){
                $form.data("bootstrapValidator").updateStatus("username","INVALID","callback");
            }

            if(data.error==1001){
                $form.data("bootstrapValidator").updateStatus("password","INVALID","callback");
            }
        }
    });

});

//重置样式
$("[type='reset']").on('click',function(){
  //需要重置表单的样式,需要获取到插件对象
  $form.data("bootstrapValidator").resetForm(); 

});







}); 


