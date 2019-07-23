export const FEATURES = Object.entries({
    "annotation-api": "Adds Java annotation API",
    application:
      "Facilitates creating an executable JVM application and adds support for creating fat/uber JARs",
    "aws-api-gateway": "Adds support for AWS API Gateway",
    "aws-api-gateway-graal":
      "Creates an AWS API Gateway Proxy Lambda with Graal Native Image",
    cassandra: "Adds support for Cassandra in the application",
    "config-consul":
      "Adds support for Distributed Configuration with Consul (https://www.consul.io)",
    "discovery-consul":
      "Adds support for Service Discovery with Consul (https://www.consul.io)",
    "discovery-eureka": "Adds support for Service Discovery with Eureka",
    elasticsearch: "Adds support for Elasticsearch in the application",
    "file-watch": "Adds automatic restarts and file watch",
    flyway: "Adds support for Flyway database migrations (https://flywaydb.org/)",
    "graal-native-image": "Allows Building a Native Image",
    graphql: "Adds support for GraphQL in the application",
    "hibernate-gorm": "Adds support for GORM persistence framework",
    "hibernate-jpa": "Adds support for Hibernate/JPA",
    "http-client": "Adds support for creating HTTP clients",
    "http-server": "Adds support for running a Netty server",
    "jdbc-dbcp": "Configures SQL DataSource instances using Commons DBCP",
    "jdbc-hikari":
      "Configures SQL DataSource instances using Hikari Connection Pool",
    "jdbc-tomcat":
      "Configures SQL DataSource instances using Tomcat Connection Pool",
    jib: "Adds support for Jib builds",
    jrebel:
      "Adds support for class reloading with JRebel (requires separate JRebel installation)",
    junit: "Adds support for the JUnit 5 testing framework",
    kafka: "Adds support for Kafka",
    "kafka-streams": "Adds support for Kafka Streams",
    liquibase:
      "Adds support for Liquibase database migrations (http://www.liquibase.org/)",
    logback: "Adds Logback Logging",
    management: "Adds support for management endpoints",
    micrometer: "Adds support for Micrometer metrics",
    "micrometer-atlas": "Adds support for Micrometer metrics (w/ Atlas reporter)",
    "micrometer-cloudwatch":
      "Adds support for Micrometer metrics (w/ AWS Cloudwatch reporter)",
    "micrometer-graphite":
      "Adds support for Micrometer metrics (w/ Graphite reporter)",
    "micrometer-prometheus":
      "Adds support for Micrometer metrics (w/ Prometheus reporter)",
    "micrometer-statsd":
      "Adds support for Micrometer metrics (w/ Statsd reporter)",
    "mongo-gorm": "Configures GORM for MongoDB for Groovy applications",
    "mongo-reactive": "Adds support for the Mongo Reactive Streams Driver",
    "neo4j-bolt": "Adds support for the Neo4j Bolt Driver",
    "neo4j-gorm": "Configures GORM for Neo4j for Groovy applications",
    "netflix-archaius": "Adds support for Netflix Archaius in the application",
    "netflix-hystrix": "Adds support for Netflix Hystrix in the application",
    "netflix-ribbon ": "Adds support for Netflix Ribbon in the application",
    picocli: "Adds support for command line parsing (http://picocli.info)",
    "postgres-reactive":
      "Adds support for the Reactive Postgres driver in the application",
    rabbitmq: "Adds support for RabbitMQ in the application",
    "redis-lettuce": "Configures the Lettuce driver for Redis",
    "security-jwt": "Adds support for JWT (JSON Web Token) based Authentication",
    "security-session": "Adds support for Session based Authentication",
    spek: "Adds support for the Spek testing framework",
    spock: "Adds support for the Spock testing framework",
    springloaded: "Adds support for class reloading with Spring-Loaded",
    "swagger-groovy": "Configures Swagger (OpenAPI) Integration for Groovy",
    "swagger-java": "Configures Swagger (OpenAPI) Integration for Java",
    "swagger-kotlin": "Configures Swagger (OpenAPI) Integration for Kotlin",
    "tracing-jaeger":
      "Adds support for distributed tracing with Jaeger (https://www.jaegertracing.io)",
    "tracing-zipkin":
      "Adds support for distributed tracing with Zipkin (https://zipkin.io)"
  });

  export const MICRONAUT_VERSIONS = [{ label: '1.1.2', value: '1.1.2' }, { label: '1.2.0.RC1', value: '1.2.0.RC1' }]