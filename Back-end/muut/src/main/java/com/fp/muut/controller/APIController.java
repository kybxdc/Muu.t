package com.fp.muut.controller;

import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fp.muut.service.APIService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class APIController {
	private final APIService apiservice;
	
	// KOPIS API에서 뮤지컬 상세내용, 홀 정보를 가져와 저장하기
	@GetMapping("/APIget")
	public String musicalDataGet() throws IOException {
		apiservice.save();
		return "APIDataGet";
	}

	
}
