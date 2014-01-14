package servlet;

import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.*;
import javax.servlet.http.*;

import net.minidev.json.*;

@SuppressWarnings("serial")
public class ExtractData extends HttpServlet {
	
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
		Connection conn = null;
		Statement stmt = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(DB_URL + DB_NAME, USER, PASS);
			stmt = conn.createStatement();
			String sql = "Select * from record where isdelete = 0 LIMIT 13";
			ResultSet rs = stmt.executeQuery(sql);
			JSONObject record = new JSONObject();
			int index = 1;
			while (rs.next()) {
				JSONObject temp = new JSONObject();
				temp.put("time", rs.getString("time"));
				temp.put("SID", rs.getString("SID"));
				temp.put("domain", rs.getString("domain"));
//				temp.put("msg", rs.getString("msg"));
//				temp.put("img", rs.getString("img"));
				record.put("" + index, temp);
				index++;
			}
			if (! (record.isEmpty()))
				out.println(record);
			else 
				throw new Exception("No record.");
			rs.close();
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
