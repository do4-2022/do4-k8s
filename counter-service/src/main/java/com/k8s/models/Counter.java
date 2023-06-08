package com.k8s.models;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "counter")
public class Counter extends PanacheEntityBase {

  @Id
  @SequenceGenerator(name = "counterSeq", sequenceName = "counter_id_seq", allocationSize = 1, initialValue = 1)
  @GeneratedValue(generator = "counterSeq")
  private Long id;

  @Getter
  @Setter
  private Integer count;

}
