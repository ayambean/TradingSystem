/**
 * Created by home on 2016-4-13.
 */

var ip = "http://123.206.83.190:8080/";
var pageusername;
var nowstage;

function pageonload(){

    var realurl1 =ip+"TradingSystem/loginview.action?";


    $.ajax({
        type: "POST",
        async:false,
        url:realurl1,
        data:{
            username:pageusername
        },
        dataType:"jsonp",
        jsonp:"callback",
        jsonpCallback : "handler1",
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

    var realurl2 =ip+"TradingSystem/evaluation.action?";
    $.ajax({
        type: "POST",
        async:false,
        url:realurl2,
        data:{
            stuname:pageusername
        },
        dataType:"jsonp",
        jsonp:"callbackeva",

        success:function (data) {
            //alert("data"+data.result);
            alert("stage"+data.stage);
            $.each(data.commentlist, function(i, item) {
                $("#maindianpinginsertpoint").append(
                    // "<div>" + item.dostage + "</div>" +
                    // "<div>" + item.dianping    + "</div>" +
                    // "<div>" + item.time + "</div><hr/>");
                "<li class='left clearfix'>"+
                    "<span class='chat-img pull-left'>"+
                    "<img src='photo/g8201306142323_jpg!article.jpg' alt='User Avatar' class='img-circle' style='height: 80px;width: 80px'/>"+
                    "</span>"+
                    "<div class='chat-body clearfix'>"+
                    "<div class='header'>"+
                    "<strong class='primary-font'>"+item.dostage+"</strong> <small class='text-muted'>"+item.time+"</small>"+
                    "</div>"+
                    "<p>"+item.dianping +"</p>"+
                    "</div>"+
                    "</li>")
            });
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

    $('#ligradepage').attr("class", "");
    $('#libussinesspage').attr("class", "");
    $('#lisearchpage').attr("class", "");
    $('#test').attr("class", "");
    $('#test').attr("class", "");
    $('#test').attr("class", "");
    $('#mainpage').show(2000);
    $('#limainpage').attr("class", "active");


}

function showgradepage(){

    gradepageonload();

    $('#mainpage').hide(2000);
    $('#bussinesspage').hide(2000);
    $('#searchpage').hide(2000);
    $('#test').hide(2000);
    $('#test').hide(2000);
    $('#test').hide(2000);

    $('#limainpage').attr("class", "");
    $('#libussinesspage').attr("class", "");
    $('#lisearchpage').attr("class", "");
    $('#test').attr("class", "");
    $('#test').attr("class", "");
    $('#test').attr("class", "");

    $('#gradepage').show(2000);
    $('#ligradepage').attr("class", "active");

}

function showsearchpage() {
    $('#mainpage').hide(2000);
    $('#bussinesspage').hide(2000);
    $('#gradepage').hide(2000);
    $('#test').hide(2000);
    $('#test').hide(2000);
    $('#test').hide(2000);

    $('#ligradepage').attr("class", "");
    $('#libussinesspage').attr("class", "");
    $('#limainpage').attr("class", "");
    $('#litest').attr("class", "");
    $('#litest').attr("class", "");
    $('#litest').attr("class", "");

    $('#searchpage').show(2000);
    $('#lisearchpage').attr("class", "active");
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
    //alert("到这");

    $("#gradeheading").html("当前"+pageusername+"的成绩单");
    $("#processheading").html("当前"+pageusername+"的进度表单");

    $.ajax({
        type: "POST",
        async:true,
        url:realurl,
        data:{
            stuname:pageusername
        },
        dataType:"jsonp",
        jsonp:"callback",
        jsonpCallback : "handler1",
        success:function (data) {
            //alert("data"+data.result);
               // alert("stage"+data.grade1);
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
               // alert(arrayObj[i]);
                $("#gradeinsertpoint").append("<tr> <td>操作"+i+"</td> <td>"+arrayObj[i]+"</td> </tr>");
            }

            for(var i=1;i<=16;i++){
                if(i<nowstage){
                    $("#processinsertpoint").append("<tr> <td>操作"+i+"</td> <td>已完成</td> </tr>");
                }else if(i==nowstage){
                    $("#processinsertpoint").append("<tr> <td>操作"+i+"</td> <td>正在进行</td> </tr>");
                }else if(i>nowstage){
                    $("#processinsertpoint").append("<tr> <td>操作"+i+"</td> <td>尚未完成</td> </tr>");
                }



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


});