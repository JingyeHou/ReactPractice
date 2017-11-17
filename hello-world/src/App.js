import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import axios from "axios"

function Card(props) {
    return (
        <div style={{ margin: "1em" }}>
            <img width="75" src={props.avatar_url} />
            <div style={{ display: "inline-block", marginLeft: 10 }}>
                <div style={{ fontSize: "1.25em", fontWeight: "bold" }}>
                    {props.name}
                </div>
            </div>
        </div>
    )
}

function CardList(props) {
    return <div>{props.cards.map(card => <Card {...card} />)}</div>
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cards: [
                {
                    name: "Yucun",
                    avatar_url:
                        "https://avatars1.githubusercontent.com/u/4750970?v=4",
                },
                {
                    name: "Lee Byron",
                    avatar_url:
                        "https://avatars1.githubusercontent.com/u/50130??v=4",
                },
            ],

            date: new Date(),
            isToggleOn: true,
            value: "",
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({ value: event.target.value })
    }

    handleSubmit(event) {
        const value = this.state.value
        axios.get(`https://api.github.com/users/${value}`).then(res => {
            const infor = res.data
            const login = infor.login
            const avatar_url = infor.avatar_url
            const cards = this.state.cards
            this.setState({
                cards: cards.concat([
                    {
                        name: login,
                        avatar_url: avatar_url,
                    },
                ]),
            })
        })
        event.preventDefault()
    }

    handleClick = () => {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn,
        }))
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    tick() {
        this.setState({
            date: new Date(),
        })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React222</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to
                    reload.
                </p>
                <FunctionComponent a={this.state.date.toLocaleTimeString()} />
                <button onClick={this.handleClick}>
                    {this.state.isToggleOn ? "ON" : "OFF"}
                </button>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={this.state.value}
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <div>
                    <CardList cards={this.state.cards} />
                </div>
            </div>
        )
    }
}

const FunctionComponent = props => {
    return (
        <div>
            <p>Hello! {props.a}</p>
        </div>
    )
}

export default App
