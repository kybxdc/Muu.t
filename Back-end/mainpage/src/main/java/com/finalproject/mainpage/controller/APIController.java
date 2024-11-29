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
	
	@GetMapping("/APIget")
	public String APIget() throws IOException {
		apiservice.save();
		return "test";
	}
	
}
