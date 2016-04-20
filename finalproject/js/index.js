/**
 * Created by home on 2016-4-13.
 */

var ip = "http://123.206.83.190:8080/";
var pageusername;
var nowstage;

function pageonload(){

    var realurl =ip+"TradingSystem/loginview.action?";


    $.ajax({
        type: "POST",
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
            nowstage = data.stage;
            $("#laststagenumber").html("操作"+data.stage);
            $("#laststrequest").html(data.latestrequest);
            //$("#latestfbk").html(data.latestfbk);
        },
        error:function () {
            alert("AJAX请求失败");
        }
    })

};

/*
*function 显示当前时间
*
*
* */
function nowtimeshow() {

    var NowTime=new Date().toLocaleTimeString();
    $('#nowtime').html("&nbsp"+NowTime);
    setTimeout("nowtimeshow();", 1000);

}

/*
* part function: 控制主界面显示与隐藏功能
*
*
* */

function showmainpage(){

    $('#gradepage').hide(2000);
    $('#bussinesspage').hide(2000);
    $('#searchpage').hide(2000);
    $('#test').hide(2000);
    $('#test').hide(2000);
    $('#test').hide(2000);

    $('#mainpage').show(2000);

}

function showgradepage(){

    $('#mainpage').hide(2000);
    $('#bussinesspage').hide(2000);
    $('#searchpage').hide(2000);
    $('#test').hide(2000);
    $('#test').hide(2000);
    $('#test').hide(2000);

    $('#gradepage').show(2000);

}

function showsearchpage() {
    $('#mainpage').hide(2000);
    $('#bussinesspage').hide(2000);
    $('#gradepage').hide(2000);
    $('#test').hide(2000);
    $('#test').hide(2000);
    $('#test').hide(2000);

    $('#searchpage').show(2000);
}




/*
*
* function:当前成绩显示
*
* */

function gradepageonload(){

    var realurl =ip+"TradingSystem/gradelist.action?";
    var step=1;//初始化步骤加载
    var arrayObj = new Array();　//创建一个数组存分数
    alert("到这");

    $("#gradeheading").html("当前"+pageusername+"的成绩单");

    $.ajax({
        type: "POST",
        async:true,
        url:realurl,
        data:{
            stuname:pageusername
        },
        dataType:"jsonp",
        jsonp:"callback",
        success:function (data) {
            //alert("data"+data.result);
                alert("stage"+data.grade1);
            arrayObj[1]=data.grade1;
            arrayObj[2]=data.grade2;
            arrayObj[3]=data.grade3;
            arrayObj[4]=data.grade4;
            arrayObj[5]=data.grade5;
            arrayObj[6]=data.grade6;
            arrayObj[7]=data.grade7;
            arrayObj[8]=data.grade8;
            arrayObj[9]=data.grade9;
            arrayObj[10]=data.grade10;
            arrayObj[11]=data.grade11;
            arrayObj[12]=data.grade12;
            arrayObj[13]=data.grade13;
            arrayObj[14]=data.grade14;
            arrayObj[15]=data.grade15;
            arrayObj[16]=data.grade16;

            for(var i=1;i<=nowstage;i++){
                alert(arrayObj[i]);
                $("#gradeinsertpoint").append("<tr> <td>操作"+i+"</td> <td>"+arrayObj[i]+"</td> </tr>");
            }


            // $("#laststagenumber").html("操作"+data.stage);
            // $("#laststrequest").html(data.latestrequest);
            //$("#latestfbk").html(data.latestfbk);
        },
        error:function () {
            alert("AJAX请求失败");
        }
    })


}


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
    nowtimeshow();
    gradepageonload();

});