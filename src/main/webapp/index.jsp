<%--
  Created by IntelliJ IDEA.
  User: HONOR
  Date: 2022/10/22
  Time: 15:37
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page isELIgnored="false" %>
<html>
<head>
    <title>login</title>
    <link rel="shortcut icon" href="web\img\favicon.ico">
    <link rel="stylesheet" href="web\css\login.css">
    <script>
        var TurnToRegister = () => {
            document.getElementById('form_register').style.display = "block";
            document.getElementById('logo_B').style.display = "block";
            document.getElementById('form_login').style.display = "none";
        }
        var TurnToLogin = () => {
            document.getElementById('form_login').style.display = "block";
            document.getElementById('form_register').style.display = "none";
        }
    </script>
</head>
<body>
<div id="form_register">
    <h1 class="title retitle">Register</h1>
    <form action="/project2_war/registerServlet" id="form_id" method="post">
        <div class="number">
            <input type="num" name="username" required placeholder="输入手机号" />
        </div>
        <div class="Ipassword">
            <input type="password" name="password" id="Ipassword" required placeholder="输入密码" />
        </div>
        <div class="checkCode">验证码:
            <input type="text" name="checkCode" class="checkC" style="width: 100px;
    height: 25px;"><img src="/project2_war/CheckCodeServlet" id="checkCodeImg">
            <a href="#" id="changeImg">看不清？</a>
        </div>
        <div class="registerdiv">
            <input type="submit" value="注册" class="registerButton" />
        </div>
    </form>
    <from>
        <div class="loginButton">
            <label for="log">已有账号？点击 <input type="button" onclick="TurnToLogin()" value="登录" class="log" /></label>
        </div>
    </from>
</div>

<div id="form_login" class="loginform">
    <div class="logo_box" id="logo_B"><img class="logo_img" src="web\img\user.png" /></div>
    <h1 class="title"> Login </h1>
    <div name="error_msg" class="error_msg" style="margin: 0;padding: 0;color: red;position: absolute;top: 110px; left: 175px;font-size: 18px;" >${login_msg}</div>
    <form id="form_id" action="/project2_war/loginServlet" method="post">
        <div class="email">
            <input class="inputBox" required type="num" placeholder="账号" id="username" name="username" value="${cookie.username.value}" />
        </div>
        <div class="password">
            <input class="inputBox" required type="password" id="password" name="password" placeholder="密码" value="${cookie.password.value}" />
        </div>
        <div class="remember">
            <input class="checkbox" type="checkbox" id="remember" name="remember" value="1" />
            <label for="remember">记住密码</label>
            <input class="checkbox" type="checkbox" id="autoLogin" name="autoLogin"  value="1"/>
            <label for="autoLogin">自动登录</label>
        </div>
        <div class="login">
            <input class="Lbotton" type="submit" value="登录" />
        </div>
    </form>
    <form>
        <div class="register">
            <label for="reg">没有账号？点击 <input type="button" onclick="TurnToRegister()" value="注册" class="reg" /></label>
        </div>
    </form>
</div>

<script>
    document.getElementById("changeImg").onclick = function (){
        document.getElementById("checkCodeImg").src="/project2_war/CheckCodeServlet?"+new Date().getMilliseconds();
    }
</script>
</body>
</html>
