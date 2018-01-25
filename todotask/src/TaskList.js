import React, { Component } from "react"
import Task from "./Task.js"

class TaskList extends Component {
    render() {
        return (
            <div>
                {this.props.tasks.map(function(task, index) {
                    return (
                        <Task
                            key={index}
                            time={task.time}
                            period={task.period}
                            activity_title={task.activity_title}
                            activity_description={task.activity_description}
                        />
                    )
                })}
            </div>
        )
    }
}

export default TaskList
