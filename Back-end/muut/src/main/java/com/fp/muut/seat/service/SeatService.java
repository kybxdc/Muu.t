package com.fp.muut.seat.service;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fp.muut.entity.Hall_Info;
import com.fp.muut.seat.repository.SeatRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SeatService {

	private final SeatRepository seatRepository;
	
	@Transactional
	public void saveInfo(Entry<String, Object> seats) {
		int hall_id = Integer.valueOf(seats.getKey());
		
		ObjectMapper objectMapper = new ObjectMapper();
		String seatData=null;
		try {
			seatData = objectMapper.writeValueAsString(seats.getValue());
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		if(seatData!=null) {
			seatRepository.saveInfo(hall_id, seatData);
		}
		
	}

	public Object getSeat(Long hall_id) {
		String str_seatData = seatRepository.get(hall_id);
		
		ObjectMapper objectMapper = new ObjectMapper();
		Object json_seatData = null;
		try {
			json_seatData = objectMapper.readValue(str_seatData, Object.class);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		return json_seatData;
	}

    private static final Logger logger = LoggerFactory.getLogger(SeatService.class);

    // 저장 경로 기본값은 Render의 `/tmp` 디렉토리
    @Value("${seat.storage.path:/tmp/}")
    private String seatStoragePath;

    @Transactional
    public void saveSeats(Long id, String seats, String id_type) {
        String seatPath;
        if ("h".equals(id_type)) {
            seatPath = seatStoragePath + "seatData" + id + ".json";
        } else if ("m".equals(id_type)) {
            seatPath = seatStoragePath + "Musical" + id + ".json";
        } else {
            throw new IllegalArgumentException("Invalid id_type: " + id_type);
        }

        try (OutputStream out = new FileOutputStream(seatPath)) {
            out.write(seats.getBytes(StandardCharsets.UTF_8));
            logger.info("Seat data saved successfully at {}", seatPath);
        } catch (IOException e) {
            logger.error("Error saving seat data to file: {}", seatPath, e);
            throw new RuntimeException("Failed to save seat data", e);
        }

        seatRepository.saveSeats(id, seatPath, id_type);
    }

    public String findSeatByMusicalId(Long musical_id, String seat_type) {
        String positionPath = seatRepository.findSeatByMusicalId(musical_id, seat_type);

        if (positionPath == null || positionPath.isEmpty()) {
            throw new RuntimeException("Seat data file not found for musical_id: " + musical_id);
        }

        try (InputStream in = new FileInputStream(positionPath)) {
            String seatData = new String(in.readAllBytes(), StandardCharsets.UTF_8);
            logger.info("Seat data read successfully from {}", positionPath);
            return seatData;
        } catch (IOException e) {
            logger.error("Error reading seat data from file: {}", positionPath, e);
            throw new RuntimeException("Failed to read seat data", e);
        }
    }
	public Long getSeatDataByMusical(Long musical_id) {
		// performance_id로 hall_id 검색
		Hall_Info hall_id = seatRepository.findHall_IdByMusical_Id(musical_id);
		return hall_id.getId();
	}

	public Long findMusicalByPerformanceId(Long performance_id) {
		return seatRepository.findMusicalByPerformanceId(performance_id);
	}

	public Map<String,Object> findHallByMusical(Long musical_id) {
		Hall_Info hi = seatRepository.findHall_IdByMusical_Id(musical_id);
		Map<String, Object> hall_id_name = new HashMap<>();
		hall_id_name.put("id", hi.getId());
		hall_id_name.put("name", hi.getHall_name());
		return hall_id_name;
	}
	
	
}
