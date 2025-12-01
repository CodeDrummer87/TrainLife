package com.nobukata.trainlife.util;

import org.springframework.stereotype.Component;

@Component
public class TrainSecuringCalculator {

    public String calculateTrainSecuring(int availableBrakeShoes, int broken,
                                         boolean isSeparateBraking, boolean isLoadedTrain) {
        /*
        1. result = Количество ТБ * 100 / 0.3 (груж) или 0.8 (порож)
        2. result = Вeс поезда - result
        3. result = result * 0.8 / 100
        4. result = result / 4 (неразд. торм) или 2 (разд. торм) [округлить в большую сторону]
        5. return (String) `${Количество ТБ}ТБ - ${result}РТ (разд/неразд. торможение)`
        */
        return null;
    }
}
