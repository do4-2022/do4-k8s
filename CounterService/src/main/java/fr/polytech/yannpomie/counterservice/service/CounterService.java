package fr.polytech.yannpomie.counterservice.service;


import fr.polytech.yannpomie.counterservice.domain.Counter;
import fr.polytech.yannpomie.counterservice.repository.DatabaseRepository;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Set;
import java.util.List;

import java.util.Optional;

@Service
public class CounterService {

	@Autowired
	private DatabaseRepository databaseRepository;

	// we store integers in redis
	@Resource(name = "redisTemplate")
	private RedisOperations<String, Integer> redisOperations;


	public Optional<Counter> getbyId(String id) {
		try {
			return databaseRepository.findById(id);
		} catch (Exception e) {
			Integer value = redisOperations.opsForValue().get(id);

			if (value == null) {
				return Optional.empty();
			}

			return Optional.of(
				new Counter(id, value)
			);
		}
	}

	public Counter set(String id, Integer value) {
		try {
			return databaseRepository.save(new Counter(id, value));
		} catch (Exception e) {
			redisOperations.opsForValue().set(id, value);
			return
				new Counter(id, value);
		}
	}

	public void flush() {
		Set<String> keys = redisOperations.keys("*");
		if (keys == null || keys.isEmpty()) {
			return;
		}

		List<Integer> value = redisOperations.opsForValue().multiGet(keys);
		assert value != null;

		for (int i = 0; i < keys.size(); i++) {
			databaseRepository.save(new Counter(keys.toArray()[i].toString(), value.get(i)));
		}
	}
}
