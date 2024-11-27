package com.finalproject.mainpage.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class KopisApiRunner{
	
	// 서비스 키
	@Value("${api.service.key}")
    private String serviceKey;
	
	public void run() {
		// 서비스 키와 URL 설정
        String url = "http://www.kopis.or.kr/openApi/restful/pblprfr/PF132238?service=" + serviceKey;

        // RestTemplate을 사용하여 API 요청
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);

        // 콘솔에 XML 데이터 출력
        System.out.println("Received XML Data: \n" + response);
	}

}
