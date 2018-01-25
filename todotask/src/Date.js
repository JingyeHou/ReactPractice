import React, { Component } from "react"
import Moment from "moment"

class Date extends Component {
    render() {
        return (
            <div>
                <h1>{Moment().format("dddd")}</h1>
                <p>{Moment().format("LL")}</p>
                <p>{Moment().format("h:mm:ss a")}</p>
                {/* <p>{Moment().calendar()}</p> */}
            </div>
        )
    }
}

export default Date
