package com.fp.muut.login;

import java.util.List;
import java.util.Map;

import org.springframework.boot.web.servlet.server.Session.Cookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fp.muut.entity.Customer;

import jakarta.servlet.ServletRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class JoinController {
    
    private final CustomerRepository customerRepository;
    private final CustomerService loginService;

    @PostMapping("/join")
    public String add(@RequestBody Customer customer) throws IllegalAccessException {
        loginService.join(customer);
        return "redirect:/";
    }

    @PostMapping("/login")
    public Customer login(@RequestBody Map<String, String> loginData, HttpServletRequest request, HttpServletResponse response) {
        String customer_id = loginData.get("customer_id");
        String customer_pw = loginData.get("customer_pw");
        Customer customer = loginService.login(customer_id, customer_pw);
        if (customer == null) {
            return null;
        }

        HttpSession session = request.getSession(true); 
        session.setAttribute("loginCustomer", customer);
        System.out.println("Session ID: " + session.getId());
        System.out.println("Logged in customer: " + session.getAttribute("loginCustomer"));

        ResponseCookie idCookie = ResponseCookie.from("customer_id", customer_id)
                .httpOnly(false)
                .secure(false)
                .sameSite("None")
                .path("/")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, idCookie.toString());

        return customer;
    }

    @GetMapping("/myinfo")
    public ResponseEntity<?> getMyInfo(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No active session found");
        }

        Customer loginCustomer = (Customer) session.getAttribute("loginCustomer");
        if (loginCustomer == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No logged-in user found in session");
        }

        return ResponseEntity.ok(loginCustomer);
    }
}
