package com.finalproject.mainpage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.finalproject.mainpage.api.KopisApiRunner;

@SpringBootApplication
public class MainpageApplication {
	
	public static void main(String[] args) throws Exception {
		SpringApplication.run(MainpageApplication.class, args);
	}
	
	@Autowired
	private KopisApiRunner apiRunner;
	
	@Autowired
    public void runApiRunner() {
        apiRunner.run();
    }
}
