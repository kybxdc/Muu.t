package com.fp.muut.seat.repository;

import org.springframework.stereotype.Repository;

import com.fp.muut.entity.Hall_Info;
import com.fp.muut.entity.Seat_Position;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class SeatRepository {

	private final EntityManager em;

	public void saveInfo(int hall_id, String seatData) {
		Hall_Info hall_Info = em.find(Hall_Info.class, hall_id);

		hall_Info.setHall_seat_info(seatData);
	}

	public String get(Long hall_id) {
		String str_seatData = em
				.createQuery("select hi.hall_seat_info from Hall_Info hi where hi.id=:hall_id", String.class)
				.setParameter("hall_id", hall_id).getSingleResult();

		return str_seatData;
	}

	public void saveSeats(Long hall_id, String seats) {
		Seat_Position seat_Position = em.find(Seat_Position.class, hall_id);
		
		if(seat_Position == null) {
			seat_Position = new Seat_Position();
		}
		Hall_Info hall_Info = em.find(Hall_Info.class, hall_id);
		
		seat_Position.setHall_Info(hall_Info);
		seat_Position.setPosition(seats);
		System.out.println(seats.length());
		
		em.persist(seat_Position);
	}

	public String findSeatByPerformanceId(Long performance_id) {
		String position = em.createQuery("select sp.position from Performance p join p.hall_Info hi join hi.seat_Position sp where p.id=:performance_id",String.class)
			.setParameter("performance_id", performance_id)
			.getSingleResult();
		
		return position;
	}

	public Long findHall_IdByPerformance_Id(Long performance_id) {
		return em.createQuery("select hi.id from Performance p join p.hall_Info hi where p.id=:performance_id",Long.class)
				.setParameter("performance_id", performance_id)
				.getSingleResult();
	}

}
