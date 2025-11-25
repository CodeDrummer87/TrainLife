package com.nobukata.trainlife.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DepotListDto {

    private final Integer id;
    private final String abbreviation;
    private final String railwayAbbreviation;
}