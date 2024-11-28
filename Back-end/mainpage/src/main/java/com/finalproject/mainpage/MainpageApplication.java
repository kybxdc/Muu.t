package com.finalproject.mainpage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.finalproject.mainpage.api.APIget;

@SpringBootApplication
public class MainpageApplication {
	
	public static void main(String[] args) throws Exception {
		SpringApplication.run(MainpageApplication.class, args);
		
		// KOPIS API에서 데이터를 가져오는 기능만 존재하는 클래스
		// 하나의 뮤지컬 정보를 받아서 콘솔에 출력하는 기능이 존재
//		APIget api3 = new APIget();
//		api3.run();
	}
	
}
