import React, { Component, Fragment } from "react";
import { Button, Card, ProgressBar, Select } from "react-materialize";
import Col from "react-materialize/lib/Col";
import Icon from "react-materialize/lib/Icon";
import Modal from "react-materialize/lib/Modal";
import Row from "react-materialize/lib/Row";
import TextInput from "react-materialize/lib/TextInput";
import logo from "./micronaut.png";
import profileLogo from "./profile-icon.jpg";
import "./style.css";
import RadioGroup from "react-materialize/lib/RadioGroup";
import { FEATURES, API_URL } from './constants';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      package: "",
      micronautVersions: [],
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
  componentDidMount() {
    fetch('https://api.github.com/repos/micronaut-projects/micronaut-core/tags')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error when checking micronaut versions on GitHub');
        }
      })
      .then((data) => {
        let micronautVersions = [];
        data.slice(0, 5).forEach((version) => {
          micronautVersions.push({ label: version.name.replace('v', ''), value: version.name.replace('v', '') })
        })
        this.setState({ micronautVersions, version: micronautVersions[0].value });
      })
  }
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
    this.setState({ downloading: true });
    let FETCH_URL =
      API_URL+"/?name=" +
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
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <Fragment>
        <div className="container">
          <img src={logo} width="50%" alt="Micronaut" className="mn-logo" />
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
                              className="black"
                              onClick={(e) => this.removeFeature(e, feature, i)}
                            >
                              <Icon>info</Icon>
                            </Button>
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
                    options={this.state.micronautVersions}
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
                className="black"
                onClick={() => this.setState({ info: true })}
              >
                <Icon>info</Icon>
              </Button>
            }
          >
            <p>
              Micronaut Initializr is a web application that allows you to create Micronaut projects through an interface instead of using the console CLI.
              You can set the project name, the language (Java, Kotlin, Groovy), the build tool (Maven, Gradle)
              and the features you need to develop your software.
            </p>
            <p>
              Developed by:
            </p>
            <Row>
              <Col s={6}>
                <a href="https://www.linkedin.com/in/miguel-%C3%A1ngel-quintanilla-758a5b120/" rel="noopener noreferrer" target="_blank">Miguel Ángel Quintanilla</a>
                <br/>
                <a href="https://www.linkedin.com/in/francisco-javier-delgado-vallano-b28b1670/" rel="noopener noreferrer" target="_blank">Fco. Javier Delgado Vallano</a>
              </Col>
              <Col s={3}>
                <a href="https://profile.es/" rel="noopener noreferrer" target="_blank"><img src={profileLogo} width="50%" alt="Profile Software Services" /></a>
              </Col>
            </Row>
     
            
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
              rel="noopener noreferrer"
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
              rel="noopener noreferrer"
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