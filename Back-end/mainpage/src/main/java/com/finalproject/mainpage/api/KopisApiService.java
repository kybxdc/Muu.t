package com.finalproject.mainpage.api;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
/*
	외부 API와 직접 통신하여 데이터를 받아오는 역할을 수행합니다.
	이 클래스는 WebClient를 사용해 KOPIS API와 HTTP 요청을 통해 데이터를 가져오게 됩니다.
	XML 응답 데이터를 Java 객체로 변환하여 반환하는 로직이 포함됩니다.
 */
@Service
public class KopisApiService {
	// 비동기적으로 HTTP 요청을 보낼 수 있는 클래스입니다.
    private final WebClient webClient;
    // XML 데이터를 Java 객체로 변환하기 위해 사용합니다.
    private final XmlMapper xmlMapper;

    public KopisApiService() {
        this.webClient = WebClient.builder()
                                  .baseUrl("http://www.kopis.or.kr/openApi/restful")
                                  .build();
        this.xmlMapper = new XmlMapper();
    }

    public Mono<Dbs> getPerformanceData(String performanceId, String serviceKey) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/pblprfr/{performanceId}")
                        .queryParam("service", serviceKey)
                        .build(performanceId))
                .retrieve()
                .bodyToMono(String.class)
                .flatMap(responseXml -> {
                    try {
                        Dbs dbs = xmlMapper.readValue(responseXml, Dbs.class);
                        return Mono.just(dbs);
                    } catch (Exception e) {
                        e.printStackTrace();
                        return Mono.error(new RuntimeException("XML Parsing Failed: " + e.getMessage()));
                    }
                });
    }
}