import React, { Component, Fragment } from "react";
import { Button, Card, ProgressBar, Select } from "react-materialize";
import Col from "react-materialize/lib/Col";
import Icon from "react-materialize/lib/Icon";
import Modal from "react-materialize/lib/Modal";
import Row from "react-materialize/lib/Row";
import TextInput from "react-materialize/lib/TextInput";
import logo from "./micronaut.png";
import "./style.css";
import RadioGroup from "react-materialize/lib/RadioGroup";

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
      package: "",
      lang: "java",
      build: "gradle",
      version: "1.2.0.RC1",
      features: [],
      featureSearch: "",
      featuresToSelect: FEATURES,
      featureSearchResults: Object.entries({}),
      featuresSelected: Object.entries({}),
      downloading: false,
      info: false
    };
  }

  searchFeature = event => {
    const value = event.target.value;

    this.setState({ featureSearch: value });

    if (value) {
      const featuresMap = new Map(this.state.featuresToSelect);

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
    let featuresToSelect = this.state.featuresToSelect;
    let features = this.state.features;

    featuresSelected.push(feature);
    features.push(feature[0]);

    let indexOfFeature;

    // eslint-disable-next-line
    featuresToSelect.map((f, i) => {
      if (f[0] === feature[0]) {
        return (indexOfFeature = i);
      }
    });

    featuresToSelect.splice(indexOfFeature, 1);

    this.setState({
      featuresToSelect,
      featuresSelected,
      features,
      featureSearchResults: Object.entries({}),
      featureSearch: ""
    });
  };

  removeFeature = (e, feature, index) => {
    e.preventDefault();

    const featuresSelected = this.state.featuresSelected;
    const featuresToSelect = this.state.featuresToSelect;

    featuresSelected.splice(index, 1);
    featuresToSelect.push(feature);

    this.setState({ featuresSelected, featuresToSelect });
  };

  generateProject = e => {
    e.preventDefault();
    console.log(this.state);

    this.setState({ downloading: true });

    let FETCH_URL =
      "http://localhost:5000/?name=" +
      this.state.name +
      "&package=" +
      this.state.package +
      "&lang=" +
      this.state.lang +
      "&build=" +
      this.state.build +
      "&version=" +
      this.state.version;

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

  handleChange = event => {
    console.log("event", event.target.name)
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <Fragment>
        <div className="container">
          <img src={logo} width="50%" alt="logo" className="mn-logo" />
          <div className="mn-container">
            <form onSubmit={this.generateProject} autoComplete="off">
              <Row>
                <Col s={3}>
                  <TextInput
                    required
                    s={12}
                    className="mn-input"
                    label="Name"
                    name="name"
                    placeholder="ex: myapp"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col s={3}>
                  <TextInput
                    required
                    s={12}
                    className="mn-input"
                    label="Package"
                    name="package"
                    placeholder="ex: com.mycompany"
                    value={this.state.package}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col s={3}>
                  <Select
                    s={12}
                    label="Language"
                    value={this.state.lang}
                    name="lang"
                    onChange={this.handleChange}
                  >
                    <option value="java">Java</option>
                    <option value="kotlin">Kotlin</option>
                    <option value="groovy">Groovy</option>
                  </Select>
                </Col>
                <Col s={3}>
                  <Select
                    s={12}
                    label="Build"
                    value={this.state.build}
                    name="build"
                    onChange={this.handleChange}
                  >
                    <option value="gradle">Gradle</option>
                    <option value="maven">Maven</option>
                  </Select>
                </Col>
              </Row>
              <Row>
                <Col s={6}>
                  <TextInput
                    className="mn-input"
                    s={12}
                    label="Features"
                    placeholder="ex: cassandra"
                    value={this.state.featureSearch}
                    onChange={this.searchFeature}
                  />
                  {this.state.featureSearch &&
                    this.state.featureSearchResults.length === 0 ? (
                      <Col s={12}>
                        <p className="grey-text">No results.</p>
                      </Col>
                    ) : null}
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
                </Col>
                <Col s={6}>
                  <b>Selected features</b>
                  {this.state.featuresSelected.length === 0 ? (
                    <p className="grey-text">No features selected.</p>
                  ) : null}
                  <Row>
                    {this.state.featuresSelected.map((feature, i) => (
                      <Card className="white" title={feature[0]} key={i}>
                        <Row>
                          <Col s={11}>
                            <p className="grey-text">{feature[1]}</p>
                          </Col>
                          <Col s={1}>
                            <Button
                              floating
                              small
                              icon="close"
                              className="black"
                              onClick={(e) => this.removeFeature(e, feature, i)}
                            />
                          </Col>
                        </Row>
                      </Card>
                    ))}
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col s={6}>
                  <p><b>Micronaut Version</b></p>
                  <RadioGroup
                    name="version"
                    value={this.state.version}
                    onChange={this.handleChange}
                    options={[{ label: '1.1.2', value: '1.1.2' }, { label: '1.2.0.RC1', value: '1.2.0.RC1' }]}
                  />
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
        </div>
        <div className="mn-footer">
          <Modal
            open={this.state.info}
            header="What's this?"
            trigger={
              <Button
                floating
                icon="info"
                className="black"
                onClick={() => this.setState({ info: true })}
              />
            }
          >
            <p>
              Micronaut Initializr is an application web that allows to create
              Micronaut projects by an interface instead of use the console CLI.
              You can choose a name to the project, the language (Java, Kotlin,
              Groovy), the build tool (Maven, Gradle) and the features you need
              to develop your software.
            </p>
          </Modal>
          <a
            href="https://twitter.com/micronautfw"
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
            href="https://github.com/micronaut-projects"
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
