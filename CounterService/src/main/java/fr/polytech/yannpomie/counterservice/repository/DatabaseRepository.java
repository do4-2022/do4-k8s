package fr.polytech.yannpomie.counterservice.repository;

import fr.polytech.yannpomie.counterservice.domain.Counter;
import org.springframework.data.jpa.repository.JpaRepository;
import reactor.core.publisher.Mono;

public interface DatabaseRepository extends JpaRepository<Counter, String> {}
