package com.finalproject.mainpage.api;

import org.springframework.stereotype.Component;

@Component
public class ApiData {
	private String apiServiceKey = "3ca6587ae8704899b3e865e74484f3bb";

	public String getApiServiceKey() {
		return apiServiceKey;
	}
}
