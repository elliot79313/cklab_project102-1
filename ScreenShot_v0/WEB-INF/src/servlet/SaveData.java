package servlet;

import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.*;
import javax.servlet.http.*;

import net.minidev.json.*;

@SuppressWarnings("serial")
public class SaveData extends HttpServlet {
	
	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost:3306/";
	static final String DB_NAME = "screenshotrecord";

	static final String USER = "root";
	static final String PASS = "root";
	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		doPost(request, response);
		
	}
	
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		response.setContentType("text/html; charset=utf-8");
		PrintWriter out = response.getWriter();
		String time = request.getParameter("time");
		String domain = request.getParameter("domain");
		String msg = request.getParameter("msg");
		String img = request.getParameter("img");
		String SID = request.getParameter("SID");
				
		Connection conn = null;
		PreparedStatement stmt = null;
		try {
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL + DB_NAME, USER, PASS);
			String sql = "INSERT INTO record (time, domain, msg, img) VALUES(?,?,?,?)";
			stmt = conn.prepareStatement(sql);
			stmt.setString(1, time);
			stmt.setString(2, domain);
			stmt.setString(3, msg);
			stmt.setString(4, img);
			stmt.executeUpdate();
			JSONObject record = new JSONObject();
			record.put("time", time);
			record.put("domain", domain);
			record.put("msg", msg);
			record.put("img", img);
			out.println(record);
			stmt.close();
			conn.close();
		} catch (SQLException se) {
			se.printStackTrace();
			out.println(se.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
			out.println(e.getMessage());
		}
	}

}
