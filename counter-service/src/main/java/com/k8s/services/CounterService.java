package com.k8s.services;

import com.k8s.models.Counter;

import io.quarkus.redis.datasource.RedisDataSource;
import io.quarkus.redis.datasource.value.ValueCommands;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CounterService {

  private ValueCommands<String, Integer> counterRedis;

  public CounterService(RedisDataSource ds) {
    this.counterRedis = ds.value(Integer.class);
  }

  public Counter getCounter() {
    Counter counter;

    try {
      counter = Counter.findAll().firstResult();

      if (counter == null) {
        counter = new Counter();
        counter.setCount(0);
        try {
          counter.persist();
        } catch (Exception e) {
          counterRedis.set("counter", 0);
        }
      }
    } catch (Exception e) {
      counter = new Counter();

      Integer valueInRedis = counterRedis.get("counter");
      if (valueInRedis == null) {
        counter.setCount(0);
      } else {
        counter.setCount(valueInRedis);
      }
    }

    return counter;
  }

  public Counter getAndIncrement() {
    Counter counter = getCounter();

    counter.setCount(counter.getCount() + 1);

    try {
      counter.persist();
    } catch (Exception e) {
      counterRedis.set("counter", counter.getCount());
    }

    return counter;
  }

}
