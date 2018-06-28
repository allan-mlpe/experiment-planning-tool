package br.ufpe.cin.pcvt.app;

import br.ufpe.cin.pcvt.api.resources.TestAPI;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.FilterHolder;
import org.eclipse.jetty.servlet.FilterMapping;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.servlets.CrossOriginFilter;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletContainer;

import javax.ws.rs.core.Application;

public class APIServer extends Application {


    public static void main(String[] args) {
        // CORS filter
        FilterHolder holder = new FilterHolder(CrossOriginFilter.class);
        holder.setInitParameter(CrossOriginFilter.ALLOWED_ORIGINS_PARAM, "*");
        holder.setInitParameter(CrossOriginFilter.ACCESS_CONTROL_ALLOW_ORIGIN_HEADER, "*");
        holder.setInitParameter(CrossOriginFilter.ALLOWED_METHODS_PARAM, "GET,POST,PUT,HEAD,DELETE");
        holder.setInitParameter(CrossOriginFilter.ALLOWED_HEADERS_PARAM, "X-Requested-With,Content-Type,Accept,Origin,X-AUTH-TOKEN");
        holder.setInitParameter(CrossOriginFilter.ALLOW_CREDENTIALS_PARAM, "true");
        holder.setName("cross-origin");
        FilterMapping fm = new FilterMapping();
        fm.setFilterName("cross-origin");
        fm.setPathSpec("*");

        final ResourceConfig resourceConfig = new ResourceConfig(TestAPI.class);
        resourceConfig.packages("br.ufpe.cin.pcvt.api");
        resourceConfig.register(MultiPartFeature.class);

        ServletHolder jerseyServlet
                = new ServletHolder(new ServletContainer(resourceConfig));

        Server jettyServer = new Server(7007);
        ServletContextHandler context = new ServletContextHandler(jettyServer, "/");
        context.addServlet(jerseyServlet, "/api/*");
        context.getServletHandler().addFilter(holder, fm);

        try {
            jettyServer.start();
            jettyServer.join();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            //jettyServer.destroy();
            // got an IllegalStateException uncommenting this and didn't quite understand why
        }

    }
}
