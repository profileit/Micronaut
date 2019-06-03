import { Form, Layout, Select, Row, Col, Input } from "antd";
import "antd/dist/antd.css";
import React, { Component } from "react";
import logo from "./logo.svg";
import "./style.css";
import { Button } from "antd/lib/radio";

const { Option } = Select;
const { Header, Content } = Layout;

const style = {
  width: "10%"
};

const style2 = {
  backgroundColor: "black"
};

const style3 = {
  color: "white"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "app",
      lang: "java",
      build: "maven"
    };
  }

  handleSearch = e => {
    e.preventDefault();
    console.log(this.state);

    const FETCH_URL = "http://localhost:5000/?name=" + this.state.name + "&lang=" + this.state.lang + "&build=" + this.state.build

    fetch(FETCH_URL, {
      method: "GET"
    })
    .then(response => response.blob())
    .then(blob => {
      console.log("Entraaa")
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = this.state.name + ".zip";
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();    
      a.remove();  //afterwards we remove the element again         
  });
  };

  handleNameChange = event => {
    this.setState({name: event.target.value});
  };

  handleLangChange = value => {
    this.setState({lang: value});
  };

  handleBuildChange = value => {
    this.setState({build: value});
  };

  render() {
    return (
      <Layout className="layout">
        <Header style={style2}>
          <div style={style3}>
            <img src={logo} style={style} />
          </div>
        </Header>
        <Content>
          <Form>
            <Row>
              <Col span={8}>
                <Form.Item label="Name">
                  <Input required value={this.state.name} placeholder="Project name" onChange={this.handleNameChange} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Language">
                  <Select
                    defaultValue={this.state.lang}
                    onChange={this.handleLangChange}
                  >
                    <Option value="java">Java</Option>
                    <Option value="kotlin">Kotlin</Option>
                    <Option value="groovy">Groovy</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Build">
                  <Select
                    defaultValue={this.state.build}
                    onChange={this.handleBuildChange}
                  >
                    <Option value="maven">Maven</Option>
                    <Option value="gradle">Gradle</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" onClick={this.handleSearch}>Primary</Button>
          </Form>
        </Content>
      </Layout>
    );
  }
}

export default App;
