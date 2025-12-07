package com.nobukata.trainlife.service;

import com.nobukata.trainlife.dto.TrainSecuringRequestDto;
import com.nobukata.trainlife.util.TrainSecuringCalculator;
import org.springframework.stereotype.Service;

@Service
public class TrainSecuringService {

    private final TrainSecuringCalculator trainSecuringCalculator;

    public TrainSecuringService(TrainSecuringCalculator trainSecuringCalculator) {
        this.trainSecuringCalculator = trainSecuringCalculator;
    }

    public String calculateTrainSecuring(TrainSecuringRequestDto dto) {
        return trainSecuringCalculator.calculateTrainSecuring(dto);
    }
}
