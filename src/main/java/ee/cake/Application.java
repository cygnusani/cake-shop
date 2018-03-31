package ee.cake;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"ee.cake.cake", "ee.cake.order", "ee.cake.security"})
public class Application {

    public static void main(String[] args) {
        new SpringApplicationBuilder(Application.class).build().run(args);
    }
}
