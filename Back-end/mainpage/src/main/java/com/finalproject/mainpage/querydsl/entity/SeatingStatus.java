package com.finalproject.mainpage.querydsl.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

//@Entity
@Table(name = "SEATING_STATUS")
@Getter @Setter
public class SeatingStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seat_num", length = 1000)
    private String seatNum; // 좌석 번호

//    @ManyToOne
    @JoinColumn(name = "performance_id")
    private MusicalDetail musicalDetail; // 공연과의 연관관계
}