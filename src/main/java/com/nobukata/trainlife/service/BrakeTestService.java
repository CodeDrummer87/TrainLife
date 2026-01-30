package com.nobukata.trainlife.service;

import com.nobukata.trainlife.dto.BrakeTestDto;
import com.nobukata.trainlife.repository.BrakeTestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrakeTestService {

    private final BrakeTestRepository brakeTestRepository;

    public BrakeTestService(BrakeTestRepository brakeTestRepository) {
        this.brakeTestRepository = brakeTestRepository;
    }

    public List<BrakeTestDto> getBrakeTestList(Integer depotId, Boolean isEvenDirection) {
        return brakeTestRepository.findAllBrakeTestsByDepotId(depotId, isEvenDirection);
    }
}
