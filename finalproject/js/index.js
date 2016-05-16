/**
 * Created by home on 2016-4-13.
 */

// var ip = "http://123.206.83.190:8080/";
var ip = "http://localhost:8080/";
var pageusername;
var nowstage;
var controlload =[0,0,0,0,0,0,0,0];//用0和1控制 0代表未加载 1代表已加载


function pageonload(){

    var realurl1 =ip+"TradingSystem/loginview.action?";


    $.ajax({
        type: "POST",
        async:true,
        url:realurl1,
        data:{
            username:pageusername
        },
        dataType:"jsonp",
        jsonp:"callback",
        jsonpCallback : "handler1",
        success:function (data) {
            //alert("data"+data.result);
            //alert("stage"+data.stage);
            nowstage = data.stage;
            $("#laststagenumber").html("操作"+data.stage);
            $("#laststrequest").html(data.latestrequest);
            //$("#latestfbk").html(data.latestfbk);
        },
        error:function () {
            alert("AJAX请求失败");
        }
    });

    var realurl2 =ip+"TradingSystem/evaluation.action?";
    $.ajax({
        type: "POST",
        async:true,
        url:realurl2,
        data:{
            stuname:pageusername
        },
        dataType:"jsonp",
        jsonp:"callbackeva",
        jsonpCallback : "callbackeva",
        success:function (data) {
            //alert("data"+data.result);
            //alert("stage"+data.stage);
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
                    "<strong class='primary-font'>"+"第"+item.dostage+"次操作点评"+"</strong> <small class='text-muted'>"+item.time+"</small>"+
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


    var realurl3 =ip+"TradingSystem/refer_list.action?";
    var arrayObj2 = new Array();　//创建一个数组存分数

    var ToDolist = new Array(16);　//创建一个数组存分数
    ToDolist[0]="建交";
    ToDolist[1]="报价";
    ToDolist[2]="发盘";
    ToDolist[3]="还价";
    ToDolist[4]="还盘";
    ToDolist[5]="成交";
    ToDolist[6]="签约";
    ToDolist[7]="审证";
    ToDolist[8]="改订";
    ToDolist[9]="订舱";
    ToDolist[10]="报关";
    ToDolist[11]="装船";
    ToDolist[12]="制单";
    ToDolist[13]="审单";
    ToDolist[14]="善后";
    ToDolist[15]="总结";
    setTimeout(function(){
        $.ajax({
            type: "POST",
            async:true,
            url:realurl3,
            data:{
                stuname:pageusername
            },
            dataType:"jsonp",
            jsonp:"callbackrefer",
            jsonpCallback : "callbackrefer",
            success:function (data) {
                //alert("data"+data.result);
                //alert("stage"+data.stage);
                arrayObj2[1]=data.refer1;
                arrayObj2[2]=data.refer2;
                arrayObj2[3]=data.refer3;
                arrayObj2[4]=data.refer4;
                arrayObj2[5]=data.refer5;
                arrayObj2[6]=data.refer6;
                arrayObj2[7]=data.refer7;
                arrayObj2[8]=data.refer8;
                arrayObj2[9]=data.refer9;
                arrayObj2[10]=data.refer10;
                arrayObj2[11]=data.refer11;
                arrayObj2[12]=data.refer12;
                arrayObj2[13]=data.refer13;
                arrayObj2[14]=data.refer14;
                arrayObj2[15]=data.refer15;
                arrayObj2[16]=data.refer16;

                for(var i=1;i<=nowstage;i++){
                    // alert(arrayObj[i]);
                    // $("#gradeinsertpoint").append("<tr> <td>操作"+i+"</td> <td>"+arrayObj[i]+"</td> </tr>");

                    $("#mainreferinsertpoint").append(
                        "<li class='left clearfix'>"+
                        "<span class='chat-img pull-left'>"+
                        "<img src='photo/g8201306142323_jpg!article.jpg' alt='User Avatar' class='img-circle' style='height: 80px;width: 80px'/>"+
                        "</span>"+
                        "<div class='chat-body clearfix'>"+
                        "<div class='header'>"+
                        "<strong class='primary-font'>"+"第"+i+"次参考答案"+"</strong> "+
                        "</div>"+
                        "<a>"+arrayObj2[i] +"</a>"+
                        "</div>"+
                        "</li>")
                }
                //$("#latestfbk").html(data.latestfbk);
            },
            error:function () {
                alert("AJAX请求失败");
            }
        })



        for(var j=0;j<=15-nowstage;j++){

            $("#Todolistinsertpoint").append(
                "<li class='todo-list-item'>"+
                "<label>"+(Number(j)+Number(1))+". "+ToDolist[Number(j)+Number(nowstage)]+"</label>"+
            "<div class='pull-right action-buttons'>"+
                "<a onclick='bussinesspage()'><span class='glyphicon glyphicon-pencil'></span></a>"+
                "<a href='' class='flag'><span class='glyphicon glyphicon-flag'></span></a>"+
                "</div>"+
                "</li>"
            )
        }
    },500);

}

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
    $('#changepasswordpage').hide(2000);
    $('#helppage').hide(2000);
    $('#tablepage').hide(2000);
    $('#otherpage').hide(2000);

    $('#ligradepage').attr("class", "");
    $('#libussinesspage').attr("class", "");
    $('#lisearchpage').attr("class", "");
    $('#lihelppage').attr("class", "");
     $('#litablepage').attr("class", "");
     $('#liotherpage').attr("class", "");
    $('#mainpage').show(2000);
    $('#limainpage').attr("class", "active");


}
function bussinesspage(){
    if(controlload[1]==0){
        bussinessstepload();
    }

    $('#gradepage').hide(2000);
    $('#mainpage').hide(2000);
    $('#searchpage').hide(2000);
    $('#changepasswordpage').hide(2000);
    $('#helppage').hide(2000);
    $('#tablepage').hide(2000);
    $('#otherpage').hide(2000);


    $('#ligradepage').attr("class", "");
    $('#limainpage').attr("class", "");
    $('#lisearchpage').attr("class", "");
    $('#lihelppage').attr("class", "");
    $('#litablepage').attr("class", "");
    $('#liotherpage').attr("class", "");
    $('#bussinesspage').show(2000);
    $('#libussinesspage').attr("class", "active");
    controlload[1]=1;
}
function showgradepage(){
    if(controlload[2]==0){
        gradepageonload();
    }

    $('#mainpage').hide(2000);
    $('#bussinesspage').hide(2000);
    $('#searchpage').hide(2000);
    $('#changepasswordpage').hide(2000);
    $('#helppage').hide(2000);
    $('#tablepage').hide(2000);
    $('#otherpage').hide(2000);


    $('#limainpage').attr("class", "");
    $('#libussinesspage').attr("class", "");
    $('#lisearchpage').attr("class", "");
    $('#lihelppage').attr("class", "");
    $('#litablepage').attr("class", "");
    $('#liotherpage').attr("class", "");

    $('#gradepage').show(2000);
    $('#ligradepage').attr("class", "active");
    controlload[2]=1;

}
function showsearchpage() {
    $('#mainpage').hide(2000);
    $('#bussinesspage').hide(2000);
    $('#gradepage').hide(2000);
    $('#changepasswordpage').hide(2000);
    $('#helppage').hide(2000);
    $('#tablepage').hide(2000);
    $('#otherpage').hide(2000);


    $('#ligradepage').attr("class", "");
    $('#libussinesspage').attr("class", "");
    $('#limainpage').attr("class", "");
    $('#lihelppage').attr("class", "");
    $('#litablepage').attr("class", "");
    $('#liotherpage').attr("class", "");

    $('#searchpage').show(2000);
    $('#lisearchpage').attr("class", "active");
}
function showchangepasswordpage(){

    $('#gradepage').hide(2000);
    $('#bussinesspage').hide(2000);
    $('#searchpage').hide(2000);
    $('#mainpage').hide(2000);
    $('#helppage').hide(2000);
    $('#tablepage').hide(2000);
    $('#otherpage').hide(2000);

    $('#ligradepage').attr("class", "");
    $('#libussinesspage').attr("class", "");
    $('#lisearchpage').attr("class", "");
    $('#lihelppage').attr("class", "");
    $('#litablepage').attr("class", "");
    $('#liotherpage').attr("class", "");
    $('#changepasswordpage').show(2000);
    $('#limainpage').attr("class", "active");
}
function showhelppage(){

    if(controlload[5]==0){
        advisepageonload();
    }

    $('#gradepage').hide(2000);
    $('#bussinesspage').hide(2000);
    $('#searchpage').hide(2000);
    $('#mainpage').hide(2000);
    $('#tablepage').hide(2000);
    $('#otherpage').hide(2000);

    $('#ligradepage').attr("class", "");
    $('#libussinesspage').attr("class", "");
    $('#lisearchpage').attr("class", "");
    $('#limainpage').attr("class", "");
    $('#litablepage').attr("class", "");
    $('#liotherpage').attr("class", "");
    $('#helppage').show(2000);
    $('#lihelppage').attr("class", "active");
    controlload[5]=1;
}

function showtablepage(){

    $('#gradepage').hide(2000);
    $('#bussinesspage').hide(2000);
    $('#searchpage').hide(2000);
    $('#mainpage').hide(2000);
    $('#helppage').hide(2000);
    $('#changepasswordpage').hide(2000);
    $('#otherpage').hide(2000);


    $('#ligradepage').attr("class", "");
    $('#libussinesspage').attr("class", "");
    $('#lisearchpage').attr("class", "");
    $('#lihelppage').attr("class", "");
    $('#limainpage').attr("class", "");
    $('#liotherpage').attr("class", "");
    $('#tablepage').show(2000);
    $('#litablepage').attr("class", "active");
}

function showotherpage(){

    $('#gradepage').hide(2000);
    $('#bussinesspage').hide(2000);
    $('#searchpage').hide(2000);
    $('#mainpage').hide(2000);
    $('#helppage').hide(2000);
    $('#changepasswordpage').hide(2000);
    $('#tablepage').hide(2000);


    $('#ligradepage').attr("class", "");
    $('#libussinesspage').attr("class", "");
    $('#lisearchpage').attr("class", "");
    $('#lihelppage').attr("class", "");
    $('#limainpage').attr("class", "");
    $('#litablepage').attr("class", "");
    $('#otherpage').show(2000);
    $('#liotherpage').attr("class", "active");
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

            for(var j=1;j<=16;j++){
                if(j<nowstage){
                    $("#processinsertpoint").append("<tr> <td>操作"+j+"</td> <td>已完成</td> </tr>");
                }else if(j==nowstage){
                    $("#processinsertpoint").append("<tr> <td>操作"+j+"</td> <td>正在进行</td> </tr>");
                }else if(j>nowstage){
                    $("#processinsertpoint").append("<tr> <td>操作"+j+"</td> <td>尚未完成</td> </tr>");
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

/*
*
* function:修改密码
*
* */
function changepwd(){


    var realurl =ip+"TradingSystem/changestupwd2.action?";
    alert($("#newpwd1").val());


    $.ajax({
        type: "POST",
        async:false,
        url:realurl,
        data:{
            username:pageusername,
            password:$("#newpwd1").val(),
            password2:$("#newpwd2").val()
        },
        dataType:"jsonp",
        jsonp:"callback",
        jsonpCallback : "handler1",
        success:function (data) {
            // alert("data"+data.result);
            $("#changepwdresult").html(data.result);
            //$("#latestfbk").html(data.latestfbk);
        },
        error:function () {
            alert("AJAX请求失败");
        }
    });
}

/*
*
* function:操作要求
* */

function bussinessstepload(){

    var realurl =ip+"TradingSystem/request_list.action?";
    var realurl1 =ip+"TradingSystem/fbk_list.action?";

    var arrayObj = new Array();　//创建一个数组存操作
    $("#bussinessheading").html("当前"+pageusername+"的操作表单");
    $("#feadbackheading").html("当前"+pageusername+"的反馈表单");
    $.ajax({
        type: "POST",
        async:true,
        url:realurl,
        data:{
            stuname:pageusername
        },
        dataType:"jsonp",
        jsonp:"callback",
        // jsonpCallback : "handler1",
        success:function (data) {
            //alert("name"+data.stuname);
            // alert("stage"+data.grade1);
            arrayObj[1]=data.request1;
            arrayObj[2]=data.request2;
            arrayObj[3]=data.request3;
            arrayObj[4]=data.request4;
            arrayObj[5]=data.request5;
            arrayObj[6]=data.request6;
            arrayObj[7]=data.request7;
            arrayObj[8]=data.request8;
            arrayObj[9]=data.request9;
            arrayObj[10]=data.request10;
            arrayObj[11]=data.request11;
            arrayObj[12]=data.request12;
            arrayObj[13]=data.request13;
            arrayObj[14]=data.request14;
            arrayObj[15]=data.request15;
            arrayObj[16]=data.request16;

            for(var i=1;i<=16;i++){
                // alert(arrayObj[i]);
                $("#bussinessinsertpoint").append("<tr> <td>操作"+i+"</td> <td>"+arrayObj[i]+"</td> </tr>");
            }

            // $("#laststagenumber").html("操作"+data.stage);
            // $("#laststrequest").html(data.latestrequest);
            //$("#latestfbk").html(data.latestfbk);

        },
        error:function () {
            alert("AJAX请求失败");
        }
    })
    //alert("开始了");
    $.ajax({
        type: "POST",
        async:true,
        url:realurl1,
        data:{
            stuname:pageusername
        },
        dataType:"jsonp",
        jsonp:"callbackfadeback",
         jsonpCallback : "callbackfadeback",
        success:function (data) {
            //alert("name"+data.stuname);
            // alert("stage"+data.grade1);
            arrayObj[1]=data.fbk1;
            arrayObj[2]=data.fbk2;
            arrayObj[3]=data.fbk3;
            arrayObj[4]=data.fbk4;
            arrayObj[5]=data.fbk5;
            arrayObj[6]=data.fbk6;
            arrayObj[7]=data.fbk7;
            arrayObj[8]=data.fbk8;
            arrayObj[9]=data.fbk9;
            arrayObj[10]=data.fbk10;
            arrayObj[11]=data.fbk11;
            arrayObj[12]=data.fbk12;
            arrayObj[13]=data.fbk13;
            arrayObj[14]=data.fbk14;
            arrayObj[15]=data.fbk15;
            arrayObj[16]=data.fbk16;

            for(var i=1;i<=16;i++){
                // alert(arrayObj[i]);
                $("#fadebackinsertpoint").append("<tr> <td>操作"+i+"</td> <td>"+arrayObj[i]+"</td> </tr>");
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

/*
*
* function:操作提问
* */

function putquestion(){
    var realurl =ip+"TradingSystem/commuwithta_res.action?";

    $.ajax({
        type: "POST",
        async:false,
        url:realurl,
        data:{
            title:$("#questionselecttitle").val(),
            title_other:$("#questionselectothertitle").val(),
            content:$("#questiontextarea").val()
        },
        dataType:"jsonp",
        jsonp:"callback",
        jsonpCallback : "handler1",
        success:function (data) {
             //alert("data"+data.result);
            $("#questionresult").html(data.result);
            //$("#latestfbk").html(data.latestfbk);
        },
        error:function () {
            alert("AJAX请求失败");
        }
    });


}
/*
* function:操作提示
* position:帮助中心中右侧表单
*
* */
function advisepageonload(){

    var realurl =ip+"TradingSystem/advise_list.action?";
    var realurl1 =ip+"TradingSystem/questionanswer.action?";
    var step=1;//初始化步骤加载
    var arrayObj = new Array();　//创建一个数组存分数
    //alert("到这");

    $("#adviseheading").html("当前"+pageusername+"用户的操作提示");

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
            arrayObj[1]=data.advise;
            arrayObj[2]=data.stage2;

            //
            // for(var i=1;i<=nowstage;i++){
            //     // alert(arrayObj[i]);
            //     $("#adviseinsertpoint").append("<tr> <td>操作"+i+"</td> <td>"+arrayObj[i]+"</td> </tr>");
            // }
            $("#adviseinsertpoint").append("<tr> <td>"+arrayObj[2]+"</td> <td>"+arrayObj[1]+"</td> </tr>");


            // $("#laststagenumber").html("操作"+data.stage);
            // $("#laststrequest").html(data.latestrequest);
            //$("#latestfbk").html(data.latestfbk);
        },
        error:function () {
            alert("AJAX请求失败");
        }
    })
    //两次ajax请求中间隔时间,防止发生冲突
    setTimeout(function(){
        var itemno;
        $.ajax({
            type: "POST",
            async:true,
            url:realurl1,
            data:{
                stuname:pageusername
            },
            dataType:"jsonp",
            jsonp:"callback",
            jsonpCallback : "callback",
            success:function (data) {
                $.each(data.QuestionAndAnswerList, function(i, item) {
                    itemno = i+1;
                    $("#questioninsertpoint").append(
                        // "<div>" + item.dostage + "</div>" +
                        // "<div>" + item.dianping    + "</div>" +
                        // "<div>" + item.time + "</div><hr/>");
                        "<li class='left clearfix'>"+
                        "<span class='chat-img pull-left'>"+
                        "<img src='photo/g8201306142323_jpg!article.jpg' alt='User Avatar' class='img-circle' style='height: 80px;width: 80px'/>"+
                        "</span>"+
                        "<div class='chat-body clearfix'>"+
                        "<div class='header'>"+
                        "<strong class='primary-font'>"+"第"+itemno+"个问题"+"</strong> <small class='text-muted'>"+item.time+"</small>"+
                        "</div>"+
                        "<p>提问主题:"+item.title +"</p>"+
                        "<p>提问主题说明:"+item.title_other +"</p>"+
                        "<p>提问问题:"+item.content +"</p>"+
                        "<p>教师回复答案:"+item.answer +"</p>"+
                        "</div>"+
                        "</li>")
                });
                // for(var i=1;i<=16;i++){
                //     // alert(arrayObj[i]);
                //     $("#fadebackinsertpoint").append("<tr> <td>操作"+i+"</td> <td>"+arrayObj[i]+"</td> </tr>");
                // }

                // $("#laststagenumber").html("操作"+data.stage);
                // $("#laststrequest").html(data.latestrequest);
                //$("#latestfbk").html(data.latestfbk);
            },
            error:function () {
                alert("AJAX请求失败");
            }
        })

    },500)

}

/*
* function:显示查询商品结果
* position:查询界面第一栏
*
* */
function searchcommdity(){

    alert("haha"+$("#com_class").val()+"122"+$("#com_id").val());
    var realurl =ip+"TradingSystem/commodity_inquiry.action?";
    var orgclassname = $("#com_class").val();
    var encondename = encodeURIComponent(orgclassname);//通过url加密方式防止中文乱码
    alert("encondename"+encondename);
    $("#cominsertpoint").empty();
    $.ajax({
        type: "POST",
        async:true,
        url:realurl,
        data:{
            com_class:encondename,
            com_id:$("#com_id").val()
        },
        dataType:"jsonp",
        jsonp:"callback",
        jsonpCallback : "callback",
        success:function (data) {
            if(data.result=="不可以同时选择按照商品大类和商品的货号查询！"){
                alert("不可以同时选择按照商品大类和商品的货号查询");
            }else if(data.result=="数据库中没有该数据！"){
                alert("数据库中没有该数据！");
            }else{
                $.each(data.commoditylist, function(i, item) {
                    $("#cominsertpoint").append(
                        // "<div>" + item.dostage + "</div>" +
                        // "<div>" + item.dianping    + "</div>" +
                        // "<div>" + item.time + "</div><hr/>");
                        "<tr>"+
                        "<td><img src="+item.com_image+" alt='User Avatar' class='img-circle' style='height: 80px;width: 80px'/></td>"+
                        "<td>"+item.com_class+"</td>"+
                        "<td>"+item.com_id+"</td>"+
                        "<td>"+item.com_name+"</td>"+
                        "<td>"+item.com_package+"</td>"+
                        "<td>"+item.com_pkgmeas+"</td>"+
                        "<td>"+item.com_taxin+"</td>"
                    )
                });
            }

        },
        error:function () {
            alert("AJAX请求失败");
        }
    })

}

/*
*
* function:上传文件控制
* */

$('input[id=lefile]').change(function() {
    $('#photoCover').val($(this).val());
});

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
    //alert("用户名："+pageusername);
    pageonload();
    nowtimeshow();


});