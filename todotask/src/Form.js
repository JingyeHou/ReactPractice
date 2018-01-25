import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"

class Form extends Component {
    handleChangeTitle = event => {
        this.props.getTitle(event.target.value)
    }

    handleChangeDescription = event => {
        this.props.getDescription(event.target.value)
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    value={this.props.title}
                    onChange={this.handleChangeTitle}
                    placeholder="title"
                    required
                />
                <br />
                <input
                    type="text"
                    value={this.props.description}
                    onChange={this.handleChangeDescription}
                    placeholder="description"
                    required
                />
                {/* <button type="submit">Add card</button> */}
            </form>
        )
    }
}

export default Form
