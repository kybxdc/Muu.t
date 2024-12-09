package com.fp.muut.service;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.fp.muut.repository.APIRepository;
import com.fp.muut.dto.Dbs;
import com.fp.muut.dto.HallInfoDTO;
import com.fp.muut.dto.MusicalDTO;
import com.fp.muut.dto.dbs_hallInfo;
import com.fp.muut.entity.Hall_Info;
import com.fp.muut.entity.Musical;
import com.fp.muut.entitybak.HallInfo;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class APIService {
    private final APIRepository apiRepository;
    private static final String SERVICE_KEY = "3ca6587ae8704899b3e865e74484f3bb";

    @Transactional
    public void save() throws IOException {
        // 여러 공연 정보를 가져오는 API URL
        String apiUrl = "http://www.kopis.or.kr/openApi/restful/pblprfr?"
        		+ "service=" + SERVICE_KEY
        		+ "&stdate=20241201"
        		+ "&eddate=20241203"
        		+ "&cpage=1"
        		+ "&rows=30"
        		+ "&signgucode=11"
        		+ "&signgucodesub=1111"
        		+ "&shcate=GGGA";

        // 외부 API 호출
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(apiUrl, String.class);

        // XML 파싱 및 데이터 변환
        XmlMapper xmlMapper = new XmlMapper();
        Dbs dbs = xmlMapper.readValue(response, Dbs.class);

        if (dbs != null && dbs.getMuDTOlist() != null) {
            List<MusicalDTO> musicalDTOList = dbs.getMuDTOlist();

            // 각 공연의 mt20id를 사용하여 상세 정보 처리
            for (MusicalDTO mdto : musicalDTOList) {
                String mt20id = mdto.getMusicalId();
                String detailUrl = "http://www.kopis.or.kr/openApi/restful/pblprfr/" 
                					+ mt20id 
                					+ "?service="
                					+ SERVICE_KEY;

                // 상세 정보 API 호출
                String detailResponse = restTemplate.getForObject(detailUrl, String.class);

                // 상세 정보 XML 파싱
                Dbs detailDbs = xmlMapper.readValue(detailResponse, Dbs.class);

                if (detailDbs != null && detailDbs.getMuDTOlist() != null) {
                    for (MusicalDTO detailMdto : detailDbs.getMuDTOlist()) {
                        // 엔티티 생성 및 데이터 매핑
                        Musical musical = new Musical();
                        musical.setMusical_title(detailMdto.getMusicalTitle());
                        musical.setMusical_genre(detailMdto.getMusicalGenre());
                        musical.setMusical_run_time(detailMdto.getMusicalRunTime());
                        musical.setMusical_area(detailMdto.getMusicalArea());
                        musical.setMusical_age(detailMdto.getMusicalAge());
                        musical.setMusical_entrpsnm(detailMdto.getMusicalEntrpsnm());
                        musical.setMusical_image(detailMdto.getMusicalImage());
                        musical.setMusical_actor(detailMdto.getActor());
                        musical.setMusical_start_date(detailMdto.getMusicalStartDate());
                        musical.setMusical_end_date(detailMdto.getMusicalEndDate());
                        musical.setMusical_seat_grade_info(detailMdto.getMusicalSeatGradeInfo());
//                        musical.setMusical_description(detailMdto.getMusicalDescription());
                        musical.setHall_name_tem(detailMdto.getHallName());
                        musical.setHallId_mt10id(detailMdto.getHallId_mt10id());
                        // styurls를 JSON으로 변환
                        if (detailMdto.getMusicalDescription() != null) {
                            ObjectMapper objectMapper = new ObjectMapper();
                            String styurlsJson = objectMapper.writeValueAsString(detailMdto.getMusicalDescription());
                            musical.setMusical_description(styurlsJson);
                        }
                        // Hall_Info 외래키 설정
                        Hall_Info hallInfo = apiRepository.findHallByID(detailMdto.getHallId_mt10id());
                        if (hallInfo == null) {
                            // 4. 해당 홀 ID로 API 요청하여 홀 정보 저장
                            String hallApiUrl = "http://kopis.or.kr/openApi/restful/prfplc/" 
                            					+ detailMdto.getHallId_mt10id()
                            					+ "?service="
                            					+ SERVICE_KEY;
                            String hallResponse = restTemplate.getForObject(hallApiUrl, String.class);

                            dbs_hallInfo hallDbs = xmlMapper.readValue(hallResponse, dbs_hallInfo.class);
                            if (hallDbs != null && hallDbs.getHIDTOlist() != null) {
                                for (HallInfoDTO hallDto : hallDbs.getHIDTOlist()) {
                                    hallInfo = new Hall_Info();
                                    hallInfo.setHallId_mt10id(hallDto.getHallId_mt10id());
                                    hallInfo.setHall_name(hallDto.getHall_name());
                                    hallInfo.setHall_addr(hallDto.getHall_addr());

                                    apiRepository.save_hallInfo(hallInfo);
                                }
                            }
                        }

                        // 5. 홀 정보 설정 후 뮤지컬 저장
                        musical.setHall_Info(hallInfo);
                        
                        // 데이터베이스 저장
                        apiRepository.save(musical);
                    }
                }
            }
        }
    }
}
