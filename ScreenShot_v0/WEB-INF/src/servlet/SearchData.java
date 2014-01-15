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
public class SearchData extends HttpServlet {
	
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
		String SID = request.getParameter("SID")==null?"":request.getParameter("SID");;
		String domain = request.getParameter("domain")==null?"":request.getParameter("domain");
		String time1 = request.getParameter("time1")==null?"":request.getParameter("time1");
		String time2 = request.getParameter("time2")==null?"":request.getParameter("time2");
		
		Connection conn = null;
		Statement stmt = null;
		//out.println(SID);
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(DB_URL + DB_NAME, USER, PASS);
			
			stmt = conn.createStatement();
			Boolean check = false;
			String sql = "Select * from record where ";
			if(!check && !SID.equals("")){
				sql = sql + "SID = '" + SID + "'";
				check = true;
			}
			if(!check && !domain.equals("")){
				sql = sql + "domain like '%" + domain + "%'";
				check = true;
			}else if(!domain.equals(""))
				sql = sql + " and domain like '%" + domain + "%'";
			
			if(!check && !time1.equals("")){
				sql = sql + "time >= '" + time1 + "'";
				check = true;
			}else if(!time1.equals(""))
				sql = sql + " and time >= '" + time1 + "'";
				
			if(!check && !time2.equals("")){
				sql = sql + "time <= '" + time2 + "'";
				check = true;
			}else if(!time2.equals(""))
				sql = sql + " and time <= '" + time2 + "'";
			
			if(!check){
				sql = "Select * from record";
			}
			
			ResultSet rs = stmt.executeQuery(sql);
			JSONObject record = new JSONObject();
			while (rs.next()) {
				
				JSONObject temp = new JSONObject();
				temp.put("time", rs.getString("time"));
				temp.put("domain", rs.getString("domain"));
				temp.put("msg", rs.getString("msg"));
				temp.put("img", rs.getString("img"));
				record.put(rs.getString("SID"), temp);
			}
			if (! (record.isEmpty()))
				out.println(record);
			else{
				throw new Exception("Can,t find.");
			}
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
