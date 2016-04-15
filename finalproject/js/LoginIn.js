/**
 * Created by shibowen on 16/4/8.
 */

var ip ="http://localhost:8080/"

$("#confirmbtn").click(function(){
    alert("1");

    var realurl = ip+"TradingSystem/user_auth1.action?";
    //  alert("url"+realurl);
    $.ajax({
        cache:false,
        type : "POST",
        url : realurl,
        data:{
            username:$("#username").val(),
            password:$("#userpassword").val()
        },
        dataType : 'json',
        // jsonp: "callback",
        // jsonpCallback: "callback",
        success : function (data) {

            //    alert("data="+data.result);
            if(data.result=="success"){
                alert("data="+data);

                window.location.assign("webpage.html");
            }else{

                     alert("error");
                // $("#LoginState").css("display","inline");
                // $("#tip").html("错误的用户名或密码");
            }

        }
    });

});

