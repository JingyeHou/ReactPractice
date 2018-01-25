import React, { Component } from "react"
import { Row, Col } from "react-bootstrap"
import FontAwesome from "react-fontawesome"
import Checkbox from "./CheckedBox.js"

class Task extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col xs={1}>
                        <div>
                            <p
                                style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    paddingTop: "10px",
                                }}
                            >
                                {this.props.time}
                                <br />
                                <span>{this.props.period}</span>
                            </p>
                        </div>
                    </Col>
                    <Col xs={10}>
                        <h4>{this.props.activity_title}</h4>
                        <p>{this.props.activity_description}</p>
                    </Col>
                    <Col xs={1}>
                        <Row style={{ paddingTop: "10px" }}>
                            <Col xs={10}>
                                <button onClick={this.delete}>Delete</button>
                            </Col>
                            <Col xs={6}>
                                <Checkbox />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Task
