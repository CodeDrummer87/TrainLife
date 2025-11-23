package com.nobukata.trainlife.service;

import com.nobukata.trainlife.dto.DepotListDto;
import com.nobukata.trainlife.repository.LocomotiveDepotRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocomotiveDepotService {

    private final LocomotiveDepotRepository locomotiveDepotRepository;

    public LocomotiveDepotService(LocomotiveDepotRepository locomotiveDepotRepository) {
        this.locomotiveDepotRepository = locomotiveDepotRepository;
    }

    public List<DepotListDto> getLocomotiveDepots() {
        return locomotiveDepotRepository.findAllDepots();
    }
}
