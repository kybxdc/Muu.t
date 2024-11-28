package com.finalproject.mainpage.api;

import org.springframework.web.client.RestTemplate;

public class APIget {
	public void run() {
        // 서비스 키와 URL 설정
        String url = "http://www.kopis.or.kr/openApi/restful/pblprfr/PF132238?service=3ca6587ae8704899b3e865e74484f3bb";

        // RestTemplate을 사용하여 API 요청
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);

        // 콘솔에 XML 데이터 출력
        System.out.println("Received XML Data: \n" + response);
    }

}
