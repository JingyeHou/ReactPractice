import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import axios from "axios"

const Card = props => {
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

const CardList = props => {
  return <div>{props.cards.map(card => <Card {...card} />)}</div>
}

const cards = [
  {
    name: "Yucun",
    avatar_url: "https://avatars1.githubusercontent.com/u/4750970?v=4",
  },
  {
    name: "Lee Byron",
    avatar_url: "https://avatars1.githubusercontent.com/u/50130??v=4",
  },
]

class URL extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { cards }
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    const user = this.state.value
    axios.get(`https://api.github.com/users/` + user).then(res => {
      const data = res.data
      const name = data.name
      const avatar_url = data.avatar_url
      const cards = this.state.cards
      this.setState({
        cards: cards.concat({
          name: name,
          avatar_url: avatar_url,
        }),
      })
    })
    event.preventDefault()
  }

  render() {
    return (
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
        <div>
          <CardList cards={this.state.cards} />
        </div>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <URL />
      </div>
    )
  }
}

export default App
