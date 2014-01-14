package servlet;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import net.minidev.json.*;

@SuppressWarnings("serial")
public class MyServlet extends HttpServlet {
	/**
	 * @param args
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		response.setContentType("text/html; charset=Big5");
//		String msg = request.getParameter("msg");
//		String img = request.getParameter("img");
		PrintWriter out = response.getWriter();
//		out.println("[MSG] : " + msg + "<br>" + "[IMG] : "
//				+ img + "<br>");
		
		String example = "{\"key\": 123}";
		JSONObject object = (JSONObject)JSONValue.parse(example);
		object.put("key2", 456);
		//out.println(object.toString());
		
		JSONArray arr = new JSONArray();
		String[] test_str = {"1", "2", "3"};
		arr.add(test_str);
		object.put("key3", test_str);
		out.println(object.toString());
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String msg = request.getParameter("msg");
		String img = request.getParameter("img");
		PrintWriter out = response.getWriter();
		// out.println(request.getParameterNames());
		out.println("[MSG]" + msg);
		out.println("[IMG]" + img);
	}
}
