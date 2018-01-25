import React, { Component } from "react"
import PropTypes from "prop-types"
import "./App.css"
import * as Axios from "axios"
import * as R from "ramda"

// "http://http://placehold.it/75"
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

Card.propTypes = {
  name: PropTypes.string.isRequired,
  avatar_url: PropTypes.string.isRequired,
}

const CardList = props => {
  return <div>{R.map(card => <Card {...card} />, props.cards)}</div>
}

class Form extends React.Component {
  state = { username: "" }

  handleSubmit = event => {
    event.preventDefault()
    Axios.get(
      `https://api.github.com/users/${this.state.username}`,
    ).then(res => {
      this.props.onSubmit(res.data)
      this.setState({ username: "" })
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.username}
          onChange={event => this.setState({ username: event.target.value })}
          placeholder="Github username"
          required
        />
        <button type="submit">Add card</button>
      </form>
    )
  }
}

class App extends Component {
  state = {
    cards: [
      {
        name: "Yucun",
        avatar_url: "https://avatars1.githubusercontent.com/u/4750970?v=4",
      },
      {
        name: "Lee Byron",
        avatar_url: "https://avatars1.githubusercontent.com/u/50130??v=4",
      },
    ],
  }

  addNewCard = cardInfo => {
    console.log(cardInfo)
    this.setState(prevState => ({
      cards: prevState.cards.concat(cardInfo),
    }))
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.addNewCard} />
        <div>{true}</div>
        <CardList cards={this.state.cards} />
      </div>
    )
  }
}

export default App
