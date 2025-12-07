package com.nobukata.trainlife.rest;

import com.nobukata.trainlife.dto.TrainSecuringRequestDto;
import com.nobukata.trainlife.service.TrainSecuringService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/calculate-securing")
public class TrainSecuringController {

    private final TrainSecuringService trainSecuringService;

    public TrainSecuringController(TrainSecuringService trainSecuringService) {
        this.trainSecuringService = trainSecuringService;
    }

    @PostMapping
    public ResponseEntity<String> getTrainSecuringRecord(@Valid @RequestBody TrainSecuringRequestDto dto) {
        try {
            return ResponseEntity.ok(trainSecuringService.calculateTrainSecuring(dto));
        } catch(Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
