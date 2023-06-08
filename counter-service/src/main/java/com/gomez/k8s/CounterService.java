package com.gomez.k8s;

import io.quarkus.logging.Log;
import io.quarkus.redis.datasource.RedisDataSource;
import io.quarkus.redis.datasource.value.ValueCommands;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CounterService {
    private ValueCommands<String, Integer> counterCommands;

    public CounterService(RedisDataSource ds) {
        this.counterCommands = ds.value(Integer.class);
    }

    public Integer resetCounter() throws Exception {
        try {
            CounterEntity counter = CounterEntity.resetCounter();
            return counter.counter;
        } catch (Exception e) {
            throw new Exception("Cannot reset counter in DB");
        }
    }

    public Integer incrementCounter() {
        try {
            CounterEntity counter = CounterEntity.incrementCounter(1);
            return counter.counter;
        } catch (Exception e) {
            Log.info("Error incrementing counter in DB, trying to increment it in Redis");

            try {
                Integer counter = counterCommands.get("counter");
                if (counter == null) {
                    counter = 0;
                }
                counterCommands.set("counter", counter + 1);
                return counter + 1;
            } catch (Exception e2) {
                Log.error("Error incrementing counter in Redis: " + e2.getMessage());
                throw e2;
            }
        }
    }

    public Integer getCounter() {
        try {
            CounterEntity counter = CounterEntity.getCounter();
            if (counter == null) {
                counter = CounterEntity.initializeCounter();
            }
            return counter.counter;
        } catch (Exception e) {
            Log.info("Error getting counter from DB, trying to get it from Redis");

            try {
                return counterCommands.get("counter");
            } catch (Exception e2) {
                Log.error("Error getting counter from Redis: " + e2.getMessage());
                throw e2;
            }
        }
    }
}
