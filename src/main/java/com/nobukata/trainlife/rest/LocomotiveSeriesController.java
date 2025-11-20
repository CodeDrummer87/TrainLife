package com.nobukata.trainlife.rest;

import com.nobukata.trainlife.service.LocomotiveSeriesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/locomotive-series")
public class LocomotiveSeriesController {

    private final LocomotiveSeriesService locomotiveSeriesService;

    public LocomotiveSeriesController(LocomotiveSeriesService locomotiveSeriesService) {
        this.locomotiveSeriesService = locomotiveSeriesService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<?>> getLocomotiveSeriesList() {
        try {
            return ResponseEntity.ok(locomotiveSeriesService.getAllLocomotiveSeries());
        } catch (Exception e) {
            return ResponseEntity.noContent().build();
        }
    }
}
