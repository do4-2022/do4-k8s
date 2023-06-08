package fr.polytech.yannpomie.counterservice.controller;

import fr.polytech.yannpomie.counterservice.domain.Counter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import fr.polytech.yannpomie.counterservice.service.CounterService;

import java.util.Optional;

@RestController()
@RequestMapping("/api/counter")
public class CounterController {

	@Autowired
	private CounterService counterService;

	@GetMapping("/{id}")
	public Optional<Counter> getCounter(@PathVariable String id) {
		return counterService.getbyId(id);
	}

	@PostMapping("/{id}")
	public Counter setCounter(@PathVariable String id, @RequestBody Counter counter) {
		return counterService.set(id, counter.getValue());
	}

	@PostMapping("/flush")
	public void flush() {
		counterService.flush();
	}
}
