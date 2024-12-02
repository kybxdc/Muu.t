package com.fp.muut.login;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.fp.muut.entity.Customer;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class LoginController {
	
	private final CustomerService loginService;

	@PostMapping("/login")
	public String login(@ModelAttribute LoginForm form, Model model, HttpServletRequest request, @RequestParam(defaultValue = "/") String redirectURL) {
	  
		Customer customer = loginService.login(form.getLoginId(), form.getPassword());
	    if(customer == null) {
	        model.addAttribute("msg", "로그인 실패");
	        return "login/loginForm";
	    }
	    // 로그인 성공 (세션에 로그인 정보 저장)
	    HttpSession session = request.getSession();
	    //session.setAttribute(SessionConst.LOGIN_MEMBER, loginMember);
	    session.setAttribute("loginMember", customer);
	    return "redirect:" + redirectURL;
	}
	
	//로그아웃
		@PostMapping("/logout")
			public String logoutV2(HttpServletRequest request) {
				//세션 삭제
				HttpSession session = request.getSession(false);
				if(session != null) {
					session.invalidate();
				}
				return "redirect:/";
			}
	
	//로그인 후 1시간 이내 반응 없을 시 자동로그아웃
		@GetMapping("/home") //
		public String home(HttpSession session) {
		    if (session == null || session.getAttribute("user") == null) {
		        return "redirect:/login";
		    }
		    return "home";
		}
}
