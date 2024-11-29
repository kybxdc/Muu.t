package com.finalproject.mainpage.controller;

import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.finalproject.mainpage.service.APIService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class APIController {
	private final APIService apiservice;
	
	// KOPIS API에서 뮤지컬 공연의 상세내용을 가져와 저장하기
	@GetMapping("/APIget")
	public String APIget() throws IOException {
		apiservice.save();
		return "APIdataGet";
	}
	
}
