package com.nobukata.trainlife.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record BrakeShoesRequestDto(

        @NotNull
        @Min(value = 4, message = "Количество тормозных башмаков не может быть менее 4-х")
        @Max(value = 40, message = "Количество тормозных башмаков не может быть более 40")
        int serviceable,
        int broken
) {
        public boolean isValidBrokenCount() {
                return broken <= serviceable;
        }

        public boolean isValidTotal() {
                return (serviceable + broken) <= 40;
        }
}
