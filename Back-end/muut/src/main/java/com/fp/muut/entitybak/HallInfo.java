package com.fp.muut.entitybak;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

//@Entity
@Table(name = "HALL_INFO")
@Getter @Setter
public class HallInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hall_id")
    private Long hallId; // 공연장 ID

    @Column(name = "hall_name", length = 100)
    private String hallName; // 공연장 이름

    @Column(name = "hall_image", length = 1000)
    private String hallImage; // 공연장 이미지

    @Column(name = "hall_addr", length = 1000)
    private String hallAddr; // 공연장 주소

    @Column(name = "hall_seat_info", length = 1000)
    private String hallSeatInfo; // 좌석 정보

//    @OneToMany(mappedBy = "hallInfo")
    private List<MusicalDetail> musicalDetails = new ArrayList<>();
}
