package com.nobukata.trainlife.repository;

import com.nobukata.trainlife.dto.StationTitleDto;
import com.nobukata.trainlife.entity.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface StationRepository extends JpaRepository<Station, Integer> {

    @Query("""
            SELECT NEW com.nobukata.trainlife.dto.StationTitleDto(s.id, s.title)
            FROM StationsLocomotiveDepots sld
            JOIN sld.station s
            JOIN sld.locomotiveDepot ld
            WHERE ld.id = :allocationId
            ORDER BY s.title
           """)
    List<StationTitleDto> findAllStationsByAllocationId(@Param("allocationId")Integer allocationId);

    @Query("""
            SELECT NEW com.nobukata.trainlife.dto.StationTitleDto(s.id, s.title)
            FROM StationsLocomotiveDepots sld
            INNER JOIN sld.station s
            INNER JOIN sld.locomotiveDepot ld
            WHERE ld.id = :allocationId AND s.hasTurnoutPoint = true
            ORDER by s.title
           """)
    List<StationTitleDto> findStationsWithTurnoutByAllocationId(@Param("allocationId") Integer allocationId);
}
