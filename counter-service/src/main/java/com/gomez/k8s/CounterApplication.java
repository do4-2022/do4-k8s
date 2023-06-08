package com.gomez.k8s;

import io.quarkus.logging.Log;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.InternalServerErrorException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.ServiceUnavailableException;
import jakarta.ws.rs.core.MediaType;

@Path("/counter")
public class CounterApplication {
    @Inject
    private CounterService counterService;

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Transactional
    public Integer getCounter() {
        try {
            return counterService.getCounter();
        } catch (Exception e) {
            Log.error("Error getting counter" + e.getMessage());
            throw new InternalServerErrorException();
        }
    }

    @POST
    @Produces(MediaType.TEXT_PLAIN)
    @Transactional
    public Integer incrementCounter() {
        try {
            return counterService.incrementCounter();
        } catch (Exception e) {
            Log.error("Error incrementing counter" + e.getMessage());
            throw new InternalServerErrorException();
        }
    }

    @DELETE
    @Produces(MediaType.TEXT_PLAIN)
    @Transactional
    public Integer resetCounter() throws ServiceUnavailableException {
        try {
            return counterService.resetCounter();
        } catch (Exception e) {
            if (e.getMessage().equals("Cannot reset counter in DB")) {
                throw new ServiceUnavailableException("Cannot reset counter in DB");
            }

            Log.error("Error reseting counter" + e.getMessage());
            throw new InternalServerErrorException();
        }
    }
}
