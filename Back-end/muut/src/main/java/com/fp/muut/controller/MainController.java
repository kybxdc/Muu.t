package com.fp.muut.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fp.muut.dto.MusicalDTO;
import com.fp.muut.service.MainService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MainController {
	private final MainService mainService;
	
	// 메인페이지에 musical 데이터 보내기
	@GetMapping("/api/musicals")
	public List<MusicalDTO> getMusicalData() {
		return mainService.findmusicalDatas();
	}

}
