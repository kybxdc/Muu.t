package com.fp.muut.api;

import org.springframework.stereotype.Component;

// 현재는 쓰지 않는 클래스 파일
@Component
public class ApiData {
	private String apiServiceKey = "3ca6587ae8704899b3e865e74484f3bb";

	public String getApiServiceKey() {
		return apiServiceKey;
	}
}
