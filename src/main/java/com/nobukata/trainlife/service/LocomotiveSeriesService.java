package com.nobukata.trainlife.service;

import com.nobukata.trainlife.entity.LocomotiveSeries;
import com.nobukata.trainlife.repository.LocomotiveSeriesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocomotiveSeriesService {

    private final LocomotiveSeriesRepository locomotiveSeriesRepository;

    public LocomotiveSeriesService(LocomotiveSeriesRepository locomotiveSeriesRepository) {
        this.locomotiveSeriesRepository = locomotiveSeriesRepository;
    }

    public List<LocomotiveSeries> getAllLocomotiveSeries() {
        return locomotiveSeriesRepository.findAll();
    }
}
