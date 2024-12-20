package com.fp.muut.mypage;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fp.muut.dto.PerformanceDTO;
import com.fp.muut.dto.ReservationDTO;
import com.fp.muut.dto.ReservationInfoDTO;
import com.fp.muut.entity.Customer;
import com.fp.muut.entity.Reservation;
import com.fp.muut.login.CustomerRepository;
import com.fp.muut.login.CustomerService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/mypage")
@Controller
@RequiredArgsConstructor
public class MypageController {

	@Autowired
	private MypageService mypageSevice;
	private CustomerRepository customerRepository;
	
	//회원 정보 조회
	@GetMapping("/customer")
	public Customer getCustomer(HttpSession session) {
		Customer loginCustomer = (Customer) session.getAttribute("loginCustomer");
		String customer_id = loginCustomer.getCustomer_id();
		return mypageSevice.getCustomer(customer_id);
	}
	
	//회원 정보 변경
	@PostMapping("/update")
	public Customer updateCustomer(@RequestBody Map<String, String> updatedData, HttpServletRequest request) {
		
		Customer customer =
			mypageSevice.updateCustomer(updatedData, request);
		if (customer != null) {
	        // 세션 업데이트: 수정된 정보로 세션에 저장
	        HttpSession session = request.getSession();
	        session.setAttribute("loginCustomer", customer);
	        return customer;
	    } else {
	        return null;
	    }
	}
	
	//예매 목록 조회
	@GetMapping("/reserve")
	public List<ReservationDTO> getReserve(HttpSession session, Model model) {
		Customer loginCustomer = (Customer) session.getAttribute("loginCustomer");
		String customer_id = loginCustomer.getCustomer_id();
		List<ReservationDTO> reserv = mypageSevice.findReserv(customer_id);
		model.addAttribute("reserv", reserv);
		return reserv;
	}
	
	//예매 내역 조회
		@GetMapping("/reserve/showInfo/{reservation_num}")
		public ReservationInfoDTO showInfo(@PathVariable("reservation_num") long reservation_num){
			return mypageSevice.showInfo(reservation_num);
		}
	
	
}