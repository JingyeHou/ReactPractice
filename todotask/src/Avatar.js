import React, { Component } from "react"
import { Row, Col, Image } from "react-bootstrap"

class Avatar extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col xs={10} />
                    <Col xs={2}>
                        <Image
                            src="https://avatars2.githubusercontent.com/u/25012181?v=4"
                            thumbnail
                            circle
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Avatar
