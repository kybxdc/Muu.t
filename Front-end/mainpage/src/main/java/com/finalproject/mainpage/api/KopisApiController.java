package com.finalproject.mainpage.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;
/*
	React 프론트엔드가 이 백엔드에서 데이터를 요청할 수 있도록 
	REST API를 제공하는 컨트롤러 클래스를 작성합니다.
 */

//이 클래스가 REST API 엔드포인트임을 나타냅니다.
@RestController
public class KopisApiController {

    @Autowired
    private KopisApiService kopisApiService;

    @GetMapping("/api/performance")
    public Mono<Dbs> getPerformance(@RequestParam String performanceId, @RequestParam String serviceKey) {
        return kopisApiService.getPerformanceData(performanceId, serviceKey);
    }
}