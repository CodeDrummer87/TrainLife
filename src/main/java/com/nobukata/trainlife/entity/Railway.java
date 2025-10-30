package com.nobukata.trainlife.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "railways")
public class Railway {

    @Id
    private Integer id;
    @Column(name = "full_title")
    private String fullTitle;
    private String abbreviation;
    private String code;
}
