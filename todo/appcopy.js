import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import axios from "axios"
import * as R from "ramda"

class Todo extends Component {
    handleClick = () => {
        this.props.onClick(this.props)
    }

    render() {
        return (
            <div style={{ margin: "1em" }}>
                <div style={{ display: "inline-block", marginLeft: 10 }}>
                    <button onClick={this.handleClick}>
                        {this.props.text}
                    </button>
                    <div style={{ fontSize: "1.25em", fontWeight: "bold" }} />
                </div>
            </div>
        )
    }
}

function TodoList(props) {
    function getInfor(xInfor) {
        console.log(xInfor)
        axios.delete(
            `https://5a13a613748faa001280a7f7.mockapi.io/note/${xInfor.id}`,
        )
        props.onClick(xInfor)
    }

    return (
        <div>
            {R.map(todo => <Todo {...todo} onClick={getInfor} />, props.list)}
        </div>
    )
}

// class Form extends Component {
//     state = {
//         value: "",
//     }
//
//     handleSubmit = event => {
//         alert("A name was submitted: " + this.state.value)
//         event.preventDefault()
//         axios
//             .post(`https://5a13a613748faa001280a7f7.mockapi.io/note`, {
//                 text: this.state.value,
//             })
//             .then(res => {
//                 this.props.onSubmit(res.data)
//                 this.setState({ value: "" })
//             })
//     }
//
//     render() {
//         return (
//             <div>
//                 <form onSubmit={this.handleSubmit}>
//                     <label>
//                         Name:
//                         <input
//                             type="text"
//                             value={this.state.value}
//                             onChange={event => {
//                                 this.setState({ value: event.target.value })
//                             }}
//                             placeholder="todo"
//                         />
//                     </label>
//                     <input type="submit" value="Submit" />
//                 </form>
//             </div>
//         )
//     }
// }

function Form(props) {
    let textInput = { value: null }
    function handleSubmit(event) {
        alert("A name was submitted: " + textInput.value)
        event.preventDefault()
        axios
            .post(`https://5a13a613748faa001280a7f7.mockapi.io/note`, {
                text: textInput.value,
            })
            .then(res => {
                props.onSubmit(res.data)
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={textInput.value}
                        ref={input => {
                            textInput = input
                        }}
                        placeholder="todo"
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

class App extends Component {
    state = {
        lists: [],
    }

    addNewThings = todoInfor => {
        console.log(todoInfor)
        this.setState(prevState => ({
            lists: prevState.lists.concat(todoInfor),
        }))
    }

    getDeletValue = data => {
        console.log(data)
        this.setState(prevState => ({
            lists: R.filter(obj => obj.id != data.id, prevState.lists),
        }))
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">To Do</h1>
                </header>
                <div>
                    <Form onSubmit={this.addNewThings} />
                    <TodoList
                        list={this.state.lists}
                        onClick={this.getDeletValue}
                    />
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to
                    reload.
                </p>
            </div>
        )
    }
}

export default App
