import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import axios from "axios"
import * as R from "ramda"
//
// function Todo(props) {
//     function handleClick() {
//         props.onClick(props)
//     }
//
//     return (
//         <div style={{ margin: "1em" }}>
//             <div style={{ display: "inline-block", marginLeft: 10 }}>
//                 <button onClick={handleClick}>{props.text}</button>
//                 <div style={{ fontSize: "1.25em", fontWeight: "bold" }} />
//             </div>
//         </div>
//     )
// }
//
// function TodoList(props) {
//     function getInfor(xInfor) {
//         console.log(xInfor)
//         axios.delete(
//             `https://5a1709c8df32450012ff4736.mockapi.io/ShoppingList/${
//                 xInfor.id
//             }`,
//         )
//         props.onClick(xInfor)
//     }
//
//     return (
//         <div>
//             {R.map(todo => <Todo {...todo} onClick={getInfor} />, props.list)}
//         </div>
//     )
// }
//
// function Form(props) {
//     let textInput = null
//     function handleSubmit(event) {
//         event.preventDefault()
//         axios
//             .post(`https://5a1709c8df32450012ff4736.mockapi.io/ShoppingList`, {
//                 text: textInput.value,
//             })
//             .then(res => {
//                 props.onSubmit(res.data)
//             })
//     }
//
//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Things:
//                     <input
//                         type="text"
//                         ref={input => {
//                             textInput = input
//                         }}
//                         placeholder="todo"
//                     />
//                 </label>
//                 <input type="submit" value="Submit" />
//             </form>
//         </div>
//     )
// }
//
// class App extends Component {
//     state = {
//         lists: [],
//     }
//
//     componentDidMount() {
//         axios
//             .get(`https://5a1709c8df32450012ff4736.mockapi.io/ShoppingList`)
//             .then(res => {
//                 this.setState({ lists: R.map(obj => obj, res.data) })
//             })
//     }
//
//     addNewThings = todoInfor => {
//         console.log(todoInfor)
//         this.setState(prevState => ({
//             lists: prevState.lists.concat(todoInfor),
//         }))
//     }
//
//     getDeletValue = data => {
//         console.log(data)
//         this.setState(prevState => ({
//             lists: R.filter(obj => obj.id != data.id, prevState.lists),
//         }))
//     }
//
//     render() {
//         return (
//             <div className="App">
//                 <header className="App-header">
//                     <img src={logo} className="App-logo" alt="logo" />
//                     <h1 className="App-title">ShoppingList</h1>
//                 </header>
//                 <div>
//                     <Form onSubmit={this.addNewThings} />
//                     <TodoList
//                         list={this.state.lists}
//                         onClick={this.getDeletValue}
//                     />
//                 </div>
//             </div>
//         )
//     }
// }
//
// export default App

class Todo extends Component {
    render() {
        return (
            <div style={{ margin: "1em" }}>
                <li style={{ display: "inline-block", marginLeft: 10 }}>
                    <button onClick={this.props.onClick}>
                        {this.props.text}
                    </button>
                    <div style={{ fontSize: "1.25em", fontWeight: "bold" }} />
                </li>
            </div>
        )
    }
}

const TodoList = props => {
    return (
        <ul>
            {R.map(
                todo => (
                    <Todo {...todo} onClick={props.onClick} ref={props.idRef} />
                ),
                props.list,
            )}
        </ul>
    )
}

const Form = props => {
    return (
        <div>
            <form onSubmit={props.onSubmit}>
                <label>
                    Things:
                    <input
                        type="text"
                        ref={props.inputRef}
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

    componentDidMount() {
        axios
            .get(`https://5a1709c8df32450012ff4736.mockapi.io/ShoppingList`)
            .then(res => {
                this.setState({ lists: res.data })
            })
    }

    handleSubmit = event => {
        event.preventDefault()
        axios
            .post(`https://5a1709c8df32450012ff4736.mockapi.io/ShoppingList`, {
                text: this.myTextInput.value,
            })
            .then(res => {
                this.setState(prevState => ({
                    lists: prevState.lists.concat(res.data),
                }))
                this.myTextInput.value = ""
            })
    }

    handleClick = () => {
        this.setState(prevState => ({
            lists: R.filter(
                obj => obj.id != this.getDeletID.props.id,
                prevState.lists,
            ),
        }))

        axios.delete(
            `https://5a1709c8df32450012ff4736.mockapi.io/ShoppingList/${
                this.getDeletID.props.id
            }`,
        )
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">ShoppingList</h1>
                </header>
                <div>
                    <Form
                        inputRef={ref => (this.myTextInput = ref)}
                        onSubmit={this.handleSubmit}
                    />
                    <TodoList
                        list={this.state.lists}
                        onClick={this.handleClick}
                        idRef={ref => (this.getDeletID = ref)}
                    />
                </div>
            </div>
        )
    }
}

export default App
