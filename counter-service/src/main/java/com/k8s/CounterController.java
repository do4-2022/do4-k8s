package com.k8s;

import com.k8s.models.Counter;
import com.k8s.services.CounterService;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;

@Path("/counters")
public class CounterController {

  @Inject
  private CounterService counterService;

  @GET
  @Transactional
  public Counter get() {
    return counterService.getCounter();
  }

  @POST
  @Path("/add")
  @Transactional
  public Counter addOne() {
    return counterService.getAndIncrement();
  }
}
