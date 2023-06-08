package com.gomez.k8s;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.logging.Log;
import jakarta.persistence.Entity;

/**
 * Example JPA entity defined as a Panache Entity.
 * An ID field of Long type is provided, if you want to define your own ID field
 * extends <code>PanacheEntityBase</code> instead.
 *
 * This uses the active record pattern, you can also use the repository pattern
 * instead:
 * .
 *
 * Usage (more example on the documentation)
 *
 * {@code
 *     public void doSomething() {
 *         MyEntity entity1 = new MyEntity();
 *         entity1.field = "field-1";
 *         entity1.persist();
 *
 *         List<MyEntity> entities = MyEntity.listAll();
 * }
 * }
 */
@Entity
public class CounterEntity extends PanacheEntity {
    public Integer counter;

    public static CounterEntity getCounter() {
        try {
            return findAll().firstResult();
        } catch (Exception e) {
            Log.error("Error getting counter: " + e.getMessage());
            throw e;
        }
    }

    public static CounterEntity incrementCounter(Integer count) {
        try {
            CounterEntity counter = getCounter();
            counter.counter += count;
            counter.persist();
            return counter;
        } catch (Exception e) {
            Log.error("Error incrementing counter: " + e.getMessage());
            throw e;
        }
    }

    public static CounterEntity resetCounter() {
        try {
            CounterEntity counter = getCounter();
            counter.counter = 0;
            counter.persist();
            return counter;
        } catch (Exception e) {
            Log.error("Error resetting counter: " + e.getMessage());
            throw e;
        }
    }

    public static CounterEntity initializeCounter() {
        try {
            CounterEntity counter = new CounterEntity();
            counter.counter = 0;
            counter.persist();
            return counter;
        } catch (Exception e) {
            Log.error("Error initializing counter: " + e.getMessage());
            throw e;
        }
    }
}
