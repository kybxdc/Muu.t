package com.fp.muut.seat.repository;

import org.springframework.stereotype.Repository;

import com.fp.muut.entity.Hall_Info;
import com.fp.muut.entity.Performance;
import com.fp.muut.entity.Performance_Seats;
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

	public void saveSeats(Long id, String seats, String id_type) {
		if(id_type.equals("h")) {
			Seat_Position seat_Position = em.find(Seat_Position.class, id);
			
			if(seat_Position == null) {
				seat_Position = new Seat_Position();
			}
			Hall_Info hall_Info = em.find(Hall_Info.class, id);
			
			seat_Position.setHall_Info(hall_Info);
			seat_Position.setPosition(seats);
			
			em.persist(seat_Position);
		}else if(id_type.equals("p")) {
			Performance_Seats performance_Seats = em.find(Performance_Seats.class, id);
			
			if(performance_Seats==null) {
				performance_Seats = new Performance_Seats();
			}
			Performance performance = em.find(Performance.class, id);
			
			performance_Seats.setPerformance(performance);
			performance_Seats.setPosition(seats);
			
			em.persist(performance_Seats);
		}
	}

	public String findSeatByPerformanceId(Long performance_id, String seat_type) {
		String position = null;
		if(seat_type.equals("grade")) {
			position = em.createQuery("select ps.position from Performance p join p.performance_Seats ps where p.id=:performance_id",String.class)
					.setParameter("performance_id", performance_id)
					.getSingleResult();				
		}
		if(seat_type.equals("non_grade")) {
			position = em.createQuery("select sp.position from Performance p join p.hall_Info hi join hi.seat_Position sp where p.id=:performance_id",String.class)
					.setParameter("performance_id", performance_id)
					.getSingleResult();				
		}
		
		return position;
	}

	public Long findHall_IdByPerformance_Id(Long performance_id) {
		return em.createQuery("select hi.id from Performance p join p.hall_Info hi where p.id=:performance_id",Long.class)
				.setParameter("performance_id", performance_id)
				.getSingleResult();
	}

}
