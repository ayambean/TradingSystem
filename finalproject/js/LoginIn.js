/**
 * Created by home on 2016-4-12.
 */

var ip = "http://localhost:8080/";

$("#confirm").click(function (){
    alert("hehe");

    var realurl =ip+"TradingSystem/user_auth1.action?";


    $.ajax({
        type: "GET",
        async:false,
        url:realurl,
        data:{
            username:$("#username").val(),
            password:$("#userpassword").val()
        },
        dataType:"jsonp",
        jsonp:"callback",
        success:function (data) {
            //alert("data"+data.result);

            if(data.result=="登录成功！"){
                alert("登陆成功");
                window.location.href ="index.html?user="+$("#username").val();
            }else {
                alert("您的用户名或密码输入错误！");
                $("#loginstage").css("display","inline");
            }
        },
        error:function () {
            alert("AJAX请求失败");
        }
    })

});
