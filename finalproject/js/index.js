/**
 * Created by home on 2016-4-13.
 */

var ip = "http://192.168.3.11:8080/";
var pageusername;

function pageonload(){

    var realurl =ip+"TradingSystem/loginview.action?";


    $.ajax({
        type: "GET",
        async:false,
        url:realurl,
        data:{
            username:pageusername
        },
        dataType:"jsonp",
        jsonp:"callback",
        success:function (data) {
            //alert("data"+data.result);
            alert("stage"+data.stage);
            $("#laststagenumber").html(data.stage);
            $("#laststrequest").html(data.latestrequest);
            //$("#latestfbk").html(data.latestfbk);
        },
        error:function () {
            alert("AJAX请求失败");
        }
    })

};


$(document).ready(function () {

    //获取url中传入用户名称
    function getvl(name) {
        var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
        if (reg.test(location.href))
            return unescape(RegExp.$2.replace(/\+/g, " "));
        return "";
    };
    pageusername=getvl("user");

    $("#topusername").html(pageusername);
    alert("用户名："+pageusername);
    pageonload();

});