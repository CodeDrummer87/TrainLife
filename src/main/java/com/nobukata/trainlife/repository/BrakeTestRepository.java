package com.nobukata.trainlife.repository;

import com.nobukata.trainlife.dto.BrakeTestDto;
import com.nobukata.trainlife.entity.BrakeTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BrakeTestRepository extends JpaRepository<BrakeTest, Integer> {

    @Query("""
            SELECT NEW com.nobukata.trainlife.dto.BrakeTestDto(t.id, t.requiredSpeed, t.section, t.point)
            FROM BrakeTestsLocomotiveDepots td
            JOIN td.brakeTest t
            WHERE td.locomotiveDepot.id = :depotId AND t.isEvenDirection = :isEven
            ORDER BY t.section
           """)
    List<BrakeTestDto> findAllBrakeTestsByDepotId(@Param("depotId")Integer depotId,
                                                  @Param("isEven")Boolean isEven);
}
