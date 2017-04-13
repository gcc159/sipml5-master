/**
 * Created by 郭骋城 on 2017/4/12.
 */
$(function () {
    $("#submit").click(function () {
        var ip='10.206.16.51'
        //var pass=window.
        $.ajax({
            url:'http://'+ip+':8080/myapp/servlets/helloworld.html',
            type:'POST',
            async:true,
            data:{
                Method:'SET-NEW-CALL',
                password:$("#auth").val(),
                caller:$("#caller").val(),
                callee:$("#callee").val()
            },
            encoding:'utf-8',
            timeout:4000,
            dataType:'json',
            beforeSend:function (xhr) {
                console.log(xhr)
                console.log('发送前')
                console.log($("#auth").val())
                console.log($("#caller").val())
            },
            success:function (data,textStatus) {
                console.log("正确");
                txtTPStatus.innerHTML='<i>'+data["statusCode"]+":"+data["reason"]+'</i>';
                //console.log(data);

                //console.log(textStatus)
            },
            error:function (xhr) {
                console.log("出错");
                console.log(xhr);
            }
        })

    })
})

function test() {
    //console.log("城市")
    var ip='10.206.16.51'
    $.ajax({
        url:'http://'+ip+':8080/myapp/servlets/helloworld.html',
        type:'POST',
        async:true,
        data:{
            Method:'HAS-MY-CALL',
            caller:window.localStorage.getItem("org.doubango.identity.display_name")

        },
        timeout:4000,
        dataType:'json',
        beforeSend:function (xhr) {
            console.log(xhr)
            console.log('发送前')
        },
        success:function (data,textStatus) {
            console.log("正确");
            var statusCode=data["statusCode"];
            if(statusCode=="NULL")
                console.log("没有新的呼叫");
            else if(statusCode=="SUCCESS")
            {
                alert("You have a new Three-Way Calling! callee:"+data["callee"]);
                txtPhoneNumber.value=data["callee"];
                sipCall("call-audiovideo");
            }


           // console.log(data['callee']);

           // console.log(textStatus)

        },
        error:function (xhr) {
            console.log("出错");
            txtTPStatus.innerHTML="未知错误，连接未建立？";
            console.log(xhr)
        }
    })

}