package com.finalproject.mainpage.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

//@Entity
@Table(name = "RESERVATION")
@Getter @Setter
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_num")
    private Long reservationNum; // 예약번호

    @ManyToOne
    @JoinColumn(name = "customer_num")
    private Customer customer; // 고객과의 연관관계

    @ManyToOne
    @JoinColumn(name = "performance_id")
    private MusicalDetail musicalDetail; // 공연과의 연관관계

    @Column(name = "reservation_date")
    private java.util.Date reservationDate; // 예약 날짜

    @Column(name = "payment_amount", length = 100)
    private String paymentAmount; // 결제 금액
}
