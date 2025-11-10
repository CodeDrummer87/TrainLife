package com.nobukata.trainlife.repository;

import com.nobukata.trainlife.dto.TrafficLightDto;
import com.nobukata.trainlife.entity.TrainModeTrafficLight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TrafficLightRepository extends JpaRepository<TrainModeTrafficLight, Integer> {

    @Query("""
            SELECT NEW com.nobukata.trainlife.dto.TrafficLightDto(t.id, t.title)
            FROM TrainModeTrafficLight t
            WHERE t.stationId = :stationId AND t.isEvenDirection = :isEven
            ORDER BY t.title
           """)
    List<TrafficLightDto> findTrafficLightsByStationId(@Param("stationId")Integer stationId,
                                                       @Param("isEven")Boolean isEven);
}
