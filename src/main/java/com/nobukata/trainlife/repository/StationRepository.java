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
            WHERE sld.locomotiveDepot.id = :depotId
            ORDER BY s.title
           """)
    List<StationTitleDto> findAllStationsByAllocationId(@Param("depotId")Integer depotId);

    @Query("""
            SELECT NEW com.nobukata.trainlife.dto.StationTitleDto(s.id, s.title)
            FROM StationsLocomotiveDepots sld
            INNER JOIN sld.station s
            WHERE sld.locomotiveDepot.id = :depotId AND s.hasTurnoutPoint = true
            ORDER BY s.title
           """)
    List<StationTitleDto> findStationsWithTurnoutByAllocationId(@Param("depotId") Integer depotId);

    @Query("""
           SELECT NEW com.nobukata.trainlife.dto.StationTitleDto(s.id, s.title)
           FROM StationsLocomotiveDepots sld
           INNER JOIN sld.station s
           WHERE sld.locomotiveDepot.id = :depotId AND s.isObserved = true
           ORDER BY s.title
           """)
    List<StationTitleDto> findObservedStations(@Param("depotId")Integer depotId);
}
