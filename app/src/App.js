import React, { Component, Fragment } from "react";
import { Button, Card, Navbar, ProgressBar, Select } from "react-materialize";
import Col from "react-materialize/lib/Col";
import Icon from "react-materialize/lib/Icon";
import Row from "react-materialize/lib/Row";
import TextInput from "react-materialize/lib/TextInput";
import logo from "./logo.svg";
import "./style.css";

const style = {
  width: "10%",
  marginTop: "8px"
};

const FEATURES = Object.entries({
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lang: "java",
      build: "gradle",
      features: [],
      featureSearch: "",
      featureSearchResults: Object.entries({}),
      featuresSelected: Object.entries({}),
      downloading: false
    };
  }

  searchFeature = event => {
    const value = event.target.value;

    this.setState({ featureSearch: value });

    if (value) {
      const featuresMap = new Map(FEATURES);

      const keysSearched = Array.from(featuresMap.keys()).filter(
        el => el.toLowerCase().indexOf(value.toLowerCase()) > -1
      );

      const resultMap = new Map();

      keysSearched.forEach(key => {
        resultMap.set(key, featuresMap.get(key));
      });

      const results = Object.entries(this.mapToObject(resultMap));

      this.setState({ featureSearchResults: results });
    } else {
      this.setState({ featureSearchResults: Object.entries({}) });
    }
  };

  mapToObject = map => {
    const obj = {};
    map.forEach((v, k) => {
      obj[k] = v;
    });
    return obj;
  };

  addFeature = feature => {
    let featuresSelected = this.state.featuresSelected;
    let features = this.state.features;

    featuresSelected.push(feature);
    features.push(feature[0]);

    this.setState({
      featuresSelected,
      features,
      featureSearchResults: Object.entries({}),
      featureSearch: ""
    });
  };

  generateProject = e => {
    e.preventDefault();
    console.log(this.state);

    this.setState({ downloading: true });

    let FETCH_URL =
      "http://localhost:5000/?name=" +
      this.state.name +
      "&lang=" +
      this.state.lang +
      "&build=" +
      this.state.build;

    const features = this.state.features;

    if (features.length > 0) {
      FETCH_URL += "&features=";
      // eslint-disable-next-line
      features.map((feature, index) => {
        FETCH_URL += feature;
        if (index + 1 < features.length) {
          FETCH_URL += ",";
        }
      });
    }

    fetch(FETCH_URL, {
      method: "GET"
    })
      .then(response => response.blob())
      .then(blob => {
        console.log("Entraaa");
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = this.state.name + ".zip";
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();
        a.remove(); //afterwards we remove the element again
        this.setState({ downloading: false });
      });
  };

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  handleLangChange = event => {
    this.setState({ lang: event.target.value });
  };

  handleBuildChange = event => {
    this.setState({ build: event.target.value });
  };

  render() {
    return (
      <Fragment>
        <Navbar centerLogo className="mn-menu">
          <img
            src={logo}
            alt="logo"
            style={style}
            className="brand-logo center"
          />
        </Navbar>
        <div className="container mn-container">
          <form onSubmit={this.generateProject} autoComplete="off">
            <Row>
              <Col s={4}>
                <TextInput
                  required
                  s={12}
                  className="mn-input"
                  label="Name"
                  value={this.state.name}
                  onChange={this.handleNameChange}
                />
              </Col>
              <Col s={4}>
                <Select
                  s={12}
                  label="Language"
                  value={this.state.lang}
                  onChange={this.handleLangChange}
                >
                  <option value="java">Java</option>
                  <option value="kotlin">Kotlin</option>
                  <option value="groovy">Groovy</option>
                </Select>
              </Col>
              <Col s={4}>
                <Select
                  s={12}
                  label="Build"
                  value={this.state.build}
                  onChange={this.handleBuildChange}
                >
                  <option value="gradle">Gradle</option>
                  <option value="maven">Maven</option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col s={6}>
                <Row>
                  <TextInput
                    className="mn-input"
                    s={12}
                    label="Features"
                    // placeholder="Find features"
                    value={this.state.featureSearch}
                    onChange={this.searchFeature}
                  />
                  {this.state.featureSearchResults.map((feature, i) => (
                    <Col s={12} key={i}>
                      <Card
                        className="white mn-feature-selection"
                        title={feature[0]}
                        onClick={() => this.addFeature(feature)}
                      >
                        <p className="grey-text">{feature[1]}</p>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col s={6}>
                {this.state.featuresSelected.length > 0 ? (
                  <b>Selected features</b>
                ) : null}
                <Row>
                  {this.state.featuresSelected.map((helpTerm, i) => (
                    <Card className="white" title={helpTerm[0]} key={i}>
                      <p className="grey-text">{helpTerm[1]}</p>
                    </Card>
                  ))}
                </Row>
              </Col>
            </Row>
            <Row>
              <Col s={3}>
                <Button
                  disabled={this.state.downloading || !this.state.name}
                  waves="light"
                  style={{ marginRight: "5px", backgroundColor: "black" }}
                >
                  <Icon left>add</Icon>
                  Generate project
                </Button>
              </Col>
            </Row>
          </form>
          {this.state.downloading ? <ProgressBar /> : null}
        </div>
        <div className="mn-footer">
          <a
            href="https://twitter.com/maq_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="mn-footer-logos"
          >
            <img
              src="https://image.flaticon.com/icons/png/512/23/23931.png"
              alt="Twitter"
              height="30px"
              weight="30px"
            />
          </a>
          <a
            href="https://github.com/migangqui"
            target="_blank"
            rel="noopener noreferrer"
            className="mn-footer-logos"
          >
            <img
              src="https://image.flaticon.com/icons/svg/25/25231.svg"
              alt="GitHub"
              height="30px"
              weight="30px"
            />
          </a>
        </div>
      </Fragment>
    );
  }
}

export default App;
