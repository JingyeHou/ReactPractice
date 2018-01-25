import React, { Component } from "react"
import { Row, Col } from "react-bootstrap"
import { Modal, Button } from "antd"
import FontAwesome from "react-fontawesome"
import Form from "./Form.js"
import * as Datetime from "react-datetime"

class AddButton extends Component {
    state = {
        visible: false,
        title: "",
        description: "",
        hour: "",
        timestamp: "",
        clock: "",
    }

    showModal = () => {
        this.setState({
            visible: true,
        })
    }

    handleOk = e => {
        console.log(e)
        console.log(this.state.hour)
        console.log(this.state.timestamp)
        this.props.addTask(
            this.state.hour,
            this.state.timestamp,
            this.state.title,
            this.state.description,
        )
        this.setState({
            visible: false,
            title: "",
            description: "",
            hour: "",
            timestamp: "",
            clock: "",
        })
    }

    handleCancel = e => {
        console.log(e)
        this.setState({
            visible: false,
            title: "",
            description: "",
        })
    }

    onChange = moment => {
        this.setState({ hour: moment.format("h") })
        this.setState({ timestamp: moment.format("a") })
    }

    getTitle = title => {
        this.setState({ title: title })
    }

    getDescription = description => {
        this.setState({ description: description })
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs={10} />
                    <Col xs={2}>
                        <Button
                            bsStyle="danger"
                            bsSize="large"
                            onClick={this.showModal}
                        >
                            <FontAwesome name="plus" />
                        </Button>
                        <Modal
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <Datetime
                                onChange={this.onChange}
                                value={this.state.clock}
                                dateFormat={false}
                                inputProps={{
                                    placeholder: "N/A",
                                    disabled: false,
                                }}
                            />
                            <Form
                                getTitle={this.getTitle}
                                getDescription={this.getDescription}
                                description={this.state.description}
                                title={this.state.title}
                            />
                        </Modal>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AddButton
