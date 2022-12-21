package com.example.web;

import com.example.util.CheckCodeUtil;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

@WebServlet("/CheckCodeServlet")
public class CheckCodeServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        //生成验证码
        ServletOutputStream os = resp.getOutputStream();
        String s = CheckCodeUtil.outputVerifyImage(100, 50, os, 4);

        //存入session中
        HttpSession session = req.getSession();
        session.setAttribute("checkCodeGen",s);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req, resp);
    }
}
