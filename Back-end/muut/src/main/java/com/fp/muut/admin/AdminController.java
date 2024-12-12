package com.fp.muut.admin;

import java.util.List;
import java.util.Map;

import org.springframework.boot.web.servlet.server.Session.Cookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fp.muut.entity.Customer;
import com.fp.muut.entity.Musical;
import com.fp.muut.entity.Performance;

import jakarta.servlet.ServletRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@Controller
@RequiredArgsConstructor
public class AdminController {
	
	private final AdminRepository adminRepository;
	private final AdminService adminService;
		
	//뮤지컬 목록 조회
	@GetMapping("/showList")
	public List<Musical> musicals(){
		return adminService.findMusicals();
	}
	
	//뮤지컬 상세정보 추가
	@PostMapping("/updateMusical")
	public String updateMusical(@RequestBody Performance performance) throws IllegalAccessException {
		adminService.join(performance);
		System.out.println(performance);
		return "redirect:/";
	}
	
}