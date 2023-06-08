package fr.dopolytech.do4k8s.counterapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.connection.ReactiveRedisConnectionFactory;
import org.springframework.data.redis.core.ReactiveRedisOperations;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.data.redis.core.ReactiveValueOperations;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.BodyExtractors;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@SpringBootApplication
public class CounterapiApplication {

	private static final String COUNTER_KEY = "counter";

	public static void main(String[] args) {
		SpringApplication.run(CounterapiApplication.class, args);
	}

	@Bean
	ReactiveRedisOperations<String, Long> reactiveRedisTemplate(ReactiveRedisConnectionFactory factory) {
		Jackson2JsonRedisSerializer<Long> serializer = new Jackson2JsonRedisSerializer<>(Long.class);

		RedisSerializationContext.RedisSerializationContextBuilder<String, Long> builder = RedisSerializationContext
				.newSerializationContext(new StringRedisSerializer());
		RedisSerializationContext<String, Long> context = builder.value(serializer).build();
		return new ReactiveRedisTemplate<>(factory, context);
	}

	@Bean
	RouterFunction<ServerResponse> routes(ReactiveRedisOperations<String, Long> redisOperations) {
		ReactiveValueOperations<String, Long> valueOps = redisOperations.opsForValue();

		return RouterFunctions
				.route(RequestPredicates.GET("/counter"),
						request -> ServerResponse.ok().contentType(MediaType.APPLICATION_JSON)
								.body(valueOps.get(COUNTER_KEY).defaultIfEmpty(0L), Long.class))
				.andRoute(RequestPredicates.POST("/counter/increment"),
						request -> request.body(BodyExtractors.toMono(Long.class))
								.flatMap(value -> valueOps.increment(COUNTER_KEY, value))
								.flatMap(result -> ServerResponse.ok().contentType(MediaType.APPLICATION_JSON)
										.bodyValue(result)));
	}
}