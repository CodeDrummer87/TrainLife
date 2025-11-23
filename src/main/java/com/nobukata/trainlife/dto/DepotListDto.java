package com.nobukata.trainlife.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DepotListDto {

    private final String depotAbbreviation;
    private final String railwayAbbreviation;
}