package com.finalproject.mainpage.querydsl.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

//@Entity
@Table(name = "CUSTOMER")
@Getter @Setter
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_generator1")
    @SequenceGenerator(name = "seq_generator1", sequenceName = "customer_sequence", allocationSize = 1)
    @Column(name = "customer_num")
    private Long customerNum; // 고객번호

    @Column(name = "customer_id", nullable = false, length = 100)
    private String customerId; // 고객 아이디

    @Column(name = "customer_pw", length = 100)
    private String customerPw; // 고객 비밀번호

    @Column(name = "customer_name", length = 100)
    private String customerName; // 고객 이름

    @Column(name = "customer_phone", length = 100)
    private String customerPhone; // 고객 전화번호

    @Column(name = "customer_address", length = 1000)
    private String customerAddress; // 고객 주소

    @Column(name = "customer_grade", nullable = false, length = 100)
    private String customerGrade; // 고객 등급

    @Column(name = "customer_total_cash", length = 100)
    private String customerTotalCash; // 결제한 티켓 가격 총 누적합
    
//    @ManyToOne
    @JoinColumn(name = "customer_grade", insertable = false, updatable = false)
    private Discount discount; // 등급별 할인율과의 연관관계 매핑

    // 기본 생성자
    public Customer() {}

    // 매개변수가 있는 생성자
    public Customer(String customerId, String customerPw, String customerName, 
    				String customerPhone, String customerAddress, String customerGrade, String customerTotalCash) {
        this.customerId = customerId;
        this.customerPw = customerPw;
        this.customerName = customerName;
        this.customerPhone = customerPhone;
        this.customerAddress = customerAddress;
        this.customerGrade = customerGrade;
        this.customerTotalCash = customerTotalCash;
    }

    @Override
    public String toString() {
        return "Customer [customerNum=" + customerNum + ", customerId=" + customerId + 
        		", customerName=" + customerName + ", customerGrade=" + customerGrade + "]";
    }
}
