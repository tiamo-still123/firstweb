package com.example.web;

import com.example.mapper.UserMapper;
import com.example.pojo.User;
import com.example.util.SqlSessionFactoryUtils;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;


import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;

@WebServlet("/registerServlet")
public class registerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    //1.接收用户数据
        String username = req.getParameter("username");
        String password = req.getParameter("password");

        //获取用户输入的验证码
        String checkCode = req.getParameter("checkCode");
        //从session中获取生成的验证码
        HttpSession session = req.getSession();
        String checkCodeGen = (String)session.getAttribute("checkCodeGen");

        //在注册之前比对验证码正确
        if(!checkCodeGen.equalsIgnoreCase(checkCode)){
            //验证码不一样不允许注册
//            resp.sendRedirect("/project2_war/index.jsp");
            resp.setContentType("text/html;charset=UTF-8");
            resp.getWriter().write("验证码错误");
            return;
        }
        //封装用户
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        //2.调用mybatis完成查询
        //2.1获取SqlSessionFactory对象
//        String resource = "mybatis-config.xml";
//        InputStream inputStream = Resources.getResourceAsStream(resource);
//        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSessionFactory sqlSessionFactory = SqlSessionFactoryUtils.getSqlSessionFactory();
        //2.2获取SqlSession对象
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        //2.3获取Mapper
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        //2.4调用方法
        User U = userMapper.selectByUsername(username);
        //判断用户U是否存在
        if(U == null){
            //不存在 则添加
            userMapper.add(user);
            //释放资源，上面已经开启自动提交事务
            resp.sendRedirect(req.getContextPath()+"/web/login.html");
            sqlSession.close();
        }else {
            //存在则给出提示信息
            resp.setContentType("text/html;charset=UTF-8");
            resp.getWriter().write("用户名已存在,请重新输入");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req, resp);
    }
}
