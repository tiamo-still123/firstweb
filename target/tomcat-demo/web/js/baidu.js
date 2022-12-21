        // 获取链接并显示在网页上
        function getLink() {
            document.getElementById('link').style.display = "block";
            var value = document.getElementById('search').value;
            var base_url = location.href;
            url = base_url + "?" + value;
            document.getElementById('url').value = url;
            document.getElementById('url').select();
            document.getElementById('instrcutions').innerText = "让我帮你百度一下？";
        }
        // 将链接自动拷贝到剪切板中
        function copyLink() {
            document.execCommand('copy');
        }
        // 跳转网页到所生成的链接上
        function skipLink() {
            location.href = url;
        }
        // 获取网页顶部get传递的参数,如:http://127.0.0.1/?123,问号后面的123就是get传递的参数
        function getVariable() {
            var link = location.href;
            var variable = link.split('?')[1];
            return variable;
        }
        // 自动执行
        (function(window) {
            var variable = getVariable(); // 获取网页链接的get参数
            // 实现点击"百度一下"按钮就获取链接并显示在网页上
            document.getElementById('get').addEventListener('click', function() {
                getLink();
            });
            // 实现点击"复制"按钮就将生成的链接复制到剪切板上
            document.getElementById('copy').addEventListener('click', function() {
                copyLink();
            });
            // 实现点击"预览"按钮就跳转到生成的链接上
            document.getElementById('skip').addEventListener('click', function() {
                skipLink();
            });
            // 实现点击"?"文本就弹出提示声明
            document.getElementsByClassName('about')[0].addEventListener('click', function() {
                alert('这个页面纯属恶搞，与百度公司无关');
            });
            if (variable) { // 判断有没有get传递的参数,有就进入动画效果,没有就保持不变
                var arrow = document.getElementById('arrow');
                var search = document.getElementById('search');
                var instrcutions = document.getElementById('instrcutions');
                var search_offsetX = search.offsetLeft + 8; // 获取搜索框的X轴位置
                var search_offsetY = search.offsetTop + 10; // 获取搜索框的Y轴位置
                arrow.style.display = "block";
                instrcutions.innerText = "1、找到输入框并选中"; // 鼠标进行第一层动画的提示语
                setTimeout(function() { // 鼠标进行第一层动画
                    arrow.style.transform = "translate(" + search_offsetX + "px," + search_offsetY + "px)";
                }, 0);
                (function() {
                    setTimeout(function() { // 鼠标进行第二层动画
                        var variable = decodeURIComponent(getVariable());
                        var index = 0; // 给与一个下标号
                        arrow.style.display = "none";
                        instrcutions.innerText = "2、输入你的问题"; // 鼠标进行第二层动画的提示语
                        var a = setInterval(function() { // 文字一一输入的特效
                            if (index == variable.length) { // 判断输出字符串是否到达极限,并且鼠标进行第三层动画
                                clearInterval(a); // 到达极限删除自身,避免死循环浪费内存
                                instrcutions.innerText = "3、按下“百度一下”按钮"; // 鼠标进行第三层动画的提示语
                                arrow.style.display = "block";
                                var get = document.getElementById('get');
                                var get_offsetX = get.offsetLeft + 51; //获取"百度一下"按钮的X轴位置
                                var get_offsetY = get.offsetTop + 20; //获取"百度一下"按钮的Y轴位置
                                arrow.style.transform = "translate(" + get_offsetX + "px," + get_offsetY + "px)";
                                setTimeout(function() {
                                    instrcutions.innerText = "这对你来说很难是吧"; // 第三层动画结束语
                                }, 2000);
                                setTimeout(function() {
                                    location.href = "https://www.baidu.com/s?ch=3&ie=utf-8&wd=" + variable; // 自动跳转到百度搜索界面
                                }, 5000);
                            }
                            search.value = variable.substr(0, index++); // 没达到极限继续输出字符串
                        }, 200);
                    }, 2000);
                })();
            }
        })(window);