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
}
