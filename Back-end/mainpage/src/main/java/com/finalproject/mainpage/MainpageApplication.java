package com.finalproject.mainpage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.finalproject.mainpage.api.APIget;
import com.finalproject.mainpage.api.KopisApiRunner;
import com.finalproject.mainpage.api.KopisApiRunner2;

@SpringBootApplication
public class MainpageApplication {
	
	public static void main(String[] args) throws Exception {
		SpringApplication.run(MainpageApplication.class, args);
		
//		KopisApiRunner api = new KopisApiRunner();
//		api.run();
		
//		KopisApiRunner2 api2 = new KopisApiRunner2();
//		api2.run();
		
		// KOPIS API에서 데이터를 가져오는 기능만 존재하는 클래스
		APIget api3 = new APIget();
		api3.run();
	}
	
}
