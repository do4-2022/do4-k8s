package fr.polytech.yannpomie.counterservice.repository;

import fr.polytech.yannpomie.counterservice.domain.Counter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DatabaseRepository extends JpaRepository<Counter, String> {}
