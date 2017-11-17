import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import axios from "axios"

// class NameForm extends Component {
//     constructor(props) {
//         super(props)
//         this.state = { value: "" }
//
//         this.handleChange = this.handleChange.bind(this)
//         this.handleSubmit = this.handleSubmit.bind(this)
//     }
//
//     handleChange(event) {
//         this.setState({ value: event.target.value })
//     }
//
//     handleSubmit(event) {
//         alert("A name was submitted: " + this.state.value)
//         event.preventDefault()
//     }
//
//     render() {
//         return (
//             <form onSubmit={this.handleSubmit}>
//                 <label>
//                     Name:
//                     <input
//                         type="text"
//                         value={this.state.value}
//                         onChange={this.handleChange}
//                     />
//                 </label>
//                 <input type="submit" value="Submit" />
//             </form>
//         )
//     }
// }

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
    // return (
    //     <div>
    //         {/* <Card cards={this.props.cards} /> */}
    //         {this.props.cards.login}
    //     </div>
    // )
}

class FetchDemo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cards: [
                // {
                //     name: "",
                //     avatar_url: "",
                // },
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
            post: "",
        }
    }

    componentDidMount() {
        axios
            .get(`https://api.github.com/users/${this.props.subreddit}`)
            .then(res => {
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
                    post: infor.login,
                })
                // const posts = res.data.map(obj => obj.data)
                // this.setState({ posts: posts })
            })
    }

    render() {
        const cards = this.state.cards

        return (
            <div>
                <h1>{`/r/${this.props.subreddit}`}</h1>
                <CardList cards={cards} />
                {this.state.post}
                {/* <CardList cards={cards} /> */}
            </div>
        )
    }
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = { value: "" }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({ value: event.target.value })
    }

    handleSubmit(event) {
        alert("A name was submitted: " + this.state.value)
        event.preventDefault()
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to
                    reload.
                </p>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={this.state.value}
                                onChange={this.handleChange}
                            />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                    <FetchDemo subreddit="JingyeHou" />
                    {/* <CardList /> */}
                </div>
                <p className="App-intro">{this.state.value}</p>
            </div>
        )
    }
}

export default App
