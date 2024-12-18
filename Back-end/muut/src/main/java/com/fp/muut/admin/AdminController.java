package com.fp.muut.admin;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.boot.web.servlet.server.Session.Cookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fp.muut.dto.MusicalDTO;
import com.fp.muut.dto.MusicalListDTO;
import com.fp.muut.dto.PerformanceDTO;
import com.fp.muut.entity.Customer;
import com.fp.muut.entity.Musical;
import com.fp.muut.entity.Performance;

import jakarta.servlet.ServletRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@Controller
@RequiredArgsConstructor
public class AdminController {
	
	private final AdminRepository adminRepository;
	private final AdminService adminService;
		
	//뮤지컬 목록 조회
	@GetMapping("/showList")
	public List<MusicalListDTO> musicals(){
		return adminService.findMusicals();
	}
	
	//뮤지컬 상세정보 추가
	@PostMapping("/updateMusical")
	public String updateMusical(@RequestParam("id") long id, @RequestParam("file") MultipartFile file) {
		System.out.println("Received ID: " + id);
		System.out.println("File uploaded successfully: " + file.getOriginalFilename());
		
		String fileName = file.getOriginalFilename();
		
		try {
		         Workbook workbook;
		         
		         if (fileName.endsWith(".xlsx")) {
		             workbook = new XSSFWorkbook(file.getInputStream());
		         } else if (fileName.endsWith(".xls")) {
		             workbook = new HSSFWorkbook(file.getInputStream());
		         } else {
		             throw new IllegalArgumentException("Invalid file format. Only .xlsx and .xls are supported.");
		         }
		     
			    Sheet worksheet = workbook.getSheetAt(0);
			    
			    for(int i=1;i<worksheet.getPhysicalNumberOfRows() ;i++) {
			        Performance performance = new Performance();
			           
			        
			        DataFormatter formatter = new DataFormatter();		        
			        Row row = worksheet.getRow(i);
			        
			        String musical_name = formatter.formatCellValue(row.getCell(0));
			        String hall_name = formatter.formatCellValue(row.getCell(1));
			        Date performance_date = row.getCell(2).getDateCellValue();
			        String performance_start_time = formatter.formatCellValue(row.getCell(3));
			        
			        System.out.println(musical_name);
			        System.out.println(hall_name);
			        System.out.println(performance_date);
			        System.out.println(performance_start_time);
			        
			        Musical musical = new Musical();
			        musical.setId(id);

			        performance.setHall_Info(adminService.findByhall(hall_name));
			        performance.setMusical(musical);
			        performance.setPerformance_date(performance_date);
			        performance.setPerformance_start_time(performance_start_time);
	      
			        adminService.update(performance);
			    }
		} catch (Exception e) {
		        // 예외 처리
		        e.printStackTrace();
		        return "redirect:/error"; // 에러 발생 시 리디렉션
			}
			    return "redirect:/success"; 
		}
	
	//뮤지컬 상세정보 조회
	@GetMapping("/showList/{selectedMusicalId}")
	public List<PerformanceDTO> detailShowList(@PathVariable("selectedMusicalId") long selectedMusicalId){
		return adminService.showList(selectedMusicalId);
	}
	
	//회원정보변경
	@PostMapping("/update")
	public Customer modifyCustomer(@RequestBody Map<String, String> updatedData, HttpServletRequest request) {
		Customer customer = adminService.updateCustomer(updatedData, request);
		if (customer != null) {
	        return customer;
	    } else {
	        return null;
	    }
	}
	
	//뮤지컬 상세정보변경
//	@PostMapping("/updateShow")
//	public Performance updateShow(@RequestBody Map<String, String> updatedData, HttpServletRequest request) {
//		Performance performance = adminService.updateShow(updatedData, request);
//		if (performance != null) {
//	        return performance;
//	    } else {
//	        return null;
//	    }
//	}
	
	
}