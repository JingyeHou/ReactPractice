import React, { Component } from "react"
import TaskList from "./TaskList.js"
import Date from "./Date.js"
import Avatar from "./Avatar.js"
import AddButton from "./AddButton.js"
import Antdtry from "./Antdtry.js"
import Checkbox from "./CheckedBox"
import Example from "./Example.js"

import "./App.css"

class App extends Component {
    constructor() {
        super()
        this.state = {
            tasks: [],
        }
    }

    addTask = (hour, timestamp, title, description) => {
        var task = {
            time: hour,
            period: timestamp.toUpperCase(),
            activity_title: title,
            activity_description: description,
        }
        console.log(this.title)
        var tasks = this.state.tasks.concat(task)
        this.setState({ tasks: tasks })
    }
    render() {
        return (
            <div style={{ padding: "30px 30px" }}>
                <Avatar />
                <br />
                <Date />
                <br />
                <TaskList tasks={this.state.tasks} />
                <br />
                <AddButton
                    addTask={this.addTask}
                    title={this.title}
                    description={this.description}
                />
            </div>
        )
    }
}

export default App
