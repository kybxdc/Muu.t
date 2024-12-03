package com.fp.muut.service;

import java.io.IOException;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.fp.muut.repository.APIRepository;
import com.fp.muut.dto.Dbs;
import com.fp.muut.dto.MusicalDTO;
import com.fp.muut.entity.Musical;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class APIService {
    private final APIRepository apiRepository;

    @Transactional
    public void save() throws IOException {
        int musicalIdStart = 132238;
        String musicalId = "";

        for (int i = 0; i < 30; i++) {
            musicalId = "PF" + (musicalIdStart + i);

            // 외부 API 호출
            String url = "http://www.kopis.or.kr/openApi/restful/pblprfr/" + musicalId + "?service=3ca6587ae8704899b3e865e74484f3bb";
            RestTemplate restTemplate = new RestTemplate();
            String response = restTemplate.getForObject(url, String.class);

            // XML 파싱 및 데이터 변환
            XmlMapper xmlMapper = new XmlMapper();
            Dbs dbs = xmlMapper.readValue(response, Dbs.class);

            if (dbs != null && dbs.getMuDTOlist() != null) {
                for (MusicalDTO mdto : dbs.getMuDTOlist()) {
                    Musical musical = new Musical();
                    musical.setMusical_title(mdto.getMusicalTitle());
                    musical.setHall_Info(null);
                    musical.setMusical_genre(mdto.getMusicalGenre());
                    musical.setMusical_run_time(mdto.getMusicalRunTime());
                    musical.setMusical_area(mdto.getMusicalArea());
                    musical.setMusical_age(mdto.getMusicalAge());
                    musical.setMusical_entrpsnm(mdto.getMusicalEntrpsnm());
                    musical.setMusical_image(mdto.getMusicalImage());
                    musical.setMusical_actor(mdto.getActor());
                    musical.setMusical_start_date(mdto.getMusicalStartDate());
                    musical.setMusical_end_date(mdto.getMusicalEndDate());
                	musical.setMusical_seat_grade_info(mdto.getMusicalSeatGradeInfo());
                	musical.setMusical_description(mdto.getMusicalDescription());

                    // 데이터베이스 저장
                    apiRepository.save(musical);
                }
            }
        }
    }
}

