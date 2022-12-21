package com.example.web.fliter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

//登陆验证过滤器

@WebFilter("/*")
public class LoginFilter implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) servletRequest;

        //判断访问路径资源是否和登录相关的
        String[] urls = {"/web/css/","/web/img/","/web/js/","/login.jsp","/loginServlet","/registerServlet","/checkCodeServlet"};
        //获取当前访问的资源路径
        String url = req.getRequestURL().toString();
        //循环遍历
        for (String u: urls) {
            if (url.contains(u)){
                //找到了,放行
                filterChain.doFilter(servletRequest,servletResponse);
                return;
            }
        }


        //1.判断session中是否有user
        HttpSession session = req.getSession();
        Object user = session.getAttribute("user");
        //2.判断user是否为null
        if (user != null){
            //登陆过了 ，放行
            filterChain.doFilter(servletRequest,servletResponse);
        }else{
            //没有登录，存储提示信息，跳转登陆页面
            req.setAttribute("login_msg","尚未登录");
            req.getRequestDispatcher("/login.jsp").forward(req,servletResponse);
        }
    }


    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }


    @Override
    public void destroy() {
    }
}
