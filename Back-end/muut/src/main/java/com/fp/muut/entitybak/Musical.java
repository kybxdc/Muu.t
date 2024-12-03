package com.fp.muut.entitybak;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

//@Entity
@Table(name = "MUSICAL")
@Getter @Setter
public class Musical {

	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_generator5")
    @SequenceGenerator(name = "seq_generator5", sequenceName = "musical_sequence", allocationSize = 1)
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "musical_id")
    private Long musicalId; // 뮤지컬 ID

    @Column(name = "hall_id")
    private Long hallId; // 홀 ID

    @Column(name = "musical_title", length = 100)
    private String musicalTitle; // 뮤지컬 제목

    @Column(name = "musical_description", length = 1000)
    private String musicalDescription; // 뮤지컬 설명

    @Column(name = "musical_genre", length = 100)
    private String musicalGenre; // 뮤지컬 장르

    @Column(name = "musical_run_time", length = 100)
    private String musicalRunTime; // 상영 시간

    @Column(name = "musical_area", length = 1000)
    private String musicalArea; // 상영 지역

    @Column(name = "musical_age", length = 100)
    private String musicalAge; // 관람 연령

    @Column(name = "musical_entrpsnm", length = 100)
    private String musicalEntrpsnm; // 기획사명

    @Column(name = "musical_image", length = 1000)
    private String musicalImage; // 뮤지컬 이미지

    @Column(name = "musical_seat_grade_info", length = 1000)
    private String musicalSeatGradeInfo; // 좌석 등급 정보

    @Column(name = "musical_start_date")
    private java.util.Date musicalStartDate; // 시작 날짜

    @Column(name = "musical_end_date")
    private java.util.Date musicalEndDate; // 종료 날짜

    @Column(name = "actor", length = 100)
    private String actor; // 배우
}
