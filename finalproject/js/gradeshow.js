/**
 * Created by shibowen on 16/4/20.
 */

var ip = "http://123.206.83.190:8080/";
var pageusername;

function gradeload(){

    var realurl =ip+"TradingSystem/gradelist.action?";

    $.ajax({
        type: "POST",
        async:false,
        url:realurl,
        data:{
            stuname:pageusername
        },
        dataType:"jsonp",
        jsonp:"callback",
        success:function (data) {
            //alert("data"+data.result);
            alert("stage"+data.stage);
            $("#laststagenumber").html("操作"+data.stage);
            $("#laststrequest").html(data.latestrequest);
            //$("#latestfbk").html(data.latestfbk);
        },
        error:function () {
            alert("AJAX请求失败");
        }
    })

};
