//图片轮播
var index = 0;

function ChangeImg() {
    index++;
    var a = document.getElementsByClassName("img-slide");
    if (index >= a.length) index = 0;
    for (var i = 0; i < a.length; i++) {
        a[i].style.display = 'none';
    }
    a[index].style.display = 'block';
}
setInterval(ChangeImg, 3000);

// 百度搜索
function formSubmit() {
    var searchValue = document.getElementById("kw").value; //获取搜索框内容
    var submitValue = searchValue + ""; //拼接百度搜索打开的链接
    var a = document.createElement('a'); //创建一个超链接a标签,按钮submit时，触发点击超级链接动作
    var href = "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=" + submitValue; //百度搜索需要打开的完整链接
    a.setAttribute('href', href); //为超链接添加href属性;
    a.setAttribute('target', '_blank'); //点击超链接时打开新的页面;
    a.setAttribute('id', 'myLink'); //为超链接添加id
    if (document.getElementById("myLink")) { //防止重复添加，如果页面中已经存在相同id的超链接，则删除
        document.body.removeChild(document.getElementById("myLink"));
    }
    document.body.appendChild(a); //把创建的超链接添加到页面
    a.click(); //模拟触发点击超链接的click动作	
}

function isEnter(ev) {
    var ev = ev || window.event;
    var keycode;
    if (window.event) keycode = ev.keyCode;
    else keycode = ev.which;
    if (keycode == 10 || keycode == 13) return true;
    else return false;
}

function ww() {
    location.href = '主页.html'
}

function ff() {
    alert("假的")
}

function TurnON() {
    document.getElementById("main").style.display = "none";
    document.getElementById("intt").style.display = "block";
}

function ring() {
    location.href = 'ring.html'
}

function music() {
    location.href = 'music.html'
}

function search() {
    location.href = 'baidu.html'
}