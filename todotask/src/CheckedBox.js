import React, { Component } from "react"

class Checkbox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isChecked: false,
        }
    }
    toggleChange = () => {
        this.setState({
            isChecked: !this.state.isChecked,
        })
    }
    render() {
        return (
            <label>
                <input
                    type="checkbox"
                    checked={this.state.isChecked}
                    onChange={this.toggleChange}
                />
            </label>
        )
    }
}

export default Checkbox
