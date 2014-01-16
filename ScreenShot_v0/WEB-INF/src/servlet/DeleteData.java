package servlet;

import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.*;
import javax.servlet.http.*;

@SuppressWarnings("serial")
public class DeleteData extends HttpServlet {

	/*
	 * Database setting =======================================================
	 */
	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost:3306/";
	static final String DB_NAME = "screenshot";

	static final String USER = "root";
	static final String PASS = "";

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		doPost(request, response);

	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		response.setContentType("text/html; charset=utf-8");
		PrintWriter out = response.getWriter();

		/*
		 * Request parameter ==================================================
		 */
		String SID = request.getParameter("SID");

		Connection conn = null;
		Statement stmt = null;
		try {
			// connect to database
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(DB_URL + DB_NAME, USER, PASS);

			// SQL instruction
			stmt = conn.createStatement();
			String sql = "UPDATE record SET isdelete = 1 WHERE SID = " + SID;

			stmt.executeUpdate(sql);

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
