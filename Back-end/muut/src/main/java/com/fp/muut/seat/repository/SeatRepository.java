package com.fp.muut.seat.repository;

import org.springframework.stereotype.Repository;

import com.fp.muut.entity.Hall_Info;
import com.fp.muut.entity.Musical;
import com.fp.muut.entity.Performance;
import com.fp.muut.entity.Musical_Seats;
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
		}else if(id_type.equals("m")) {
			Musical_Seats musical_Seats = em.find(Musical_Seats.class, id);
			
			if(musical_Seats==null) {
				musical_Seats = new Musical_Seats();
			}
			Musical musical = em.find(Musical.class, id);
			
			musical_Seats.setMusical(musical);
			musical_Seats.setPosition(seats);
			
			em.persist(musical_Seats);
		}
	}

	public String findSeatByMusicalId(Long musical_id, String seat_type) {
		String position = null;
		if(seat_type.equals("grade")) {
			position = em.createQuery("select ms.position from Musical m join m.musical_Seats ms where m.id=:musical_id",String.class)
					.setParameter("musical_id", musical_id)
					.getSingleResult();				
		}
		if(seat_type.equals("non_grade")) {
			position = em.createQuery("select sp.position from Musical m join m.hall_Info hi join hi.seat_Position sp where m.id=:musical_id",String.class)
					.setParameter("musical_id", musical_id)
					.getSingleResult();				
		}
		
		return position;
	}

	public Hall_Info findHall_IdByMusical_Id(Long musical_id) {
		return em.createQuery("select m.hall_Info from Musical m where m.id=:musical_id",Hall_Info.class)
				.setParameter("musical_id", musical_id)
				.getSingleResult();
	}

	public Long findMusicalByPerformanceId(Long performance_id) {
		return em.createQuery("select m.id from Performance p join p.musical m where p.id=:performance_id",Long.class)
				.setParameter("performance_id", performance_id).getSingleResult();
	}

	public String findHallName(Long hall_id) {
		return em.find(Hall_Info.class, hall_id).getHall_name();
	}

}
