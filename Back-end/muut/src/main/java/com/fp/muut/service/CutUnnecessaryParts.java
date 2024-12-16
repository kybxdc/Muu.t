package com.fp.muut.service;
import java.util.regex.*;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

@Component
public class CutUnnecessaryParts {
	// 불필요한 부분을 제거한 데이터 얻기
    public String cutName(String input, String target) {
        int index = input.indexOf(target); 
        if (index == -1) {
            return input; 
        }
        return input.substring(0, index); 
    }
    
    public JSONObject extractSeatingInfo(String input) {
        // 정규식 패턴
        Pattern pattern = Pattern.compile("\\w+석 \\d{1,3}(,\\d{3})*원");
        Matcher matcher = pattern.matcher(input);

        // JSON 배열 생성
        JSONArray seatArray = new JSONArray();

        // 패턴 매칭된 결과를 JSON 배열에 추가
        while (matcher.find()) {
            String match = matcher.group();
            String[] parts = match.split(" "); // "R석 77,000원"을 공백으로 분리
            if (parts.length == 2) {
                JSONObject seatObject = new JSONObject();
                seatObject.put("type", parts[0]); // "R석"
                seatObject.put("price", parts[1]); // "77,000원"
                seatArray.put(seatObject);
            }
        }

        // 최종 JSON 객체 생성
        JSONObject result = new JSONObject();
        result.put("seating_info", seatArray);

        return result;
    }
}
