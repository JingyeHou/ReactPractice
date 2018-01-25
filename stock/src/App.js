import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import axios from "axios"
import * as R from "ramda"

class Stocks extends Component {
    handleClick = () => {
        this.props.onClick(this.props.name)
    }
    render() {
        return (
            <div style={{ margin: "1em" }}>
                <li style={{ display: "inline-block", marginLeft: 10 }}>
                    " the latest time: "{this.props.keys}
                    " open: " {this.props.open}
                    " high: " {this.props.high}
                    " low: " {this.props.low}
                    " volume: " {this.props.volume}
                    <button onClick={this.handleClick}>
                        {this.props.name}
                    </button>
                    <div style={{ fontSize: "1.25em", fontWeight: "bold" }} />
                </li>
            </div>
        )
    }
}

const StockList = props => {
    return (
        <ul>
            {R.map(
                todo => <Stocks {...todo} onClick={props.onClick} />,
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
                    input:
                    <input
                        type="text"
                        ref={props.inputRef}
                        placeholder="stock ex: mfst"
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            all: [],
            latestData: "",
        }
    }
    handleSubmit = event => {
        event.preventDefault()
        const value = this.myTextInput.value
        axios
            .get(
                `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${
                    value
                }&interval=1min&apikey=89OGL8C90318QUM6`,
            )
            .then(res => {
                let latestData = res.data["Meta Data"]["3. Last Refreshed"]

                let all = this.state.all

                this.setState({
                    latestData: latestData,
                    all: all.concat({
                        name: value,
                        keys: latestData,
                        open:
                            res.data["Time Series (1min)"][latestData][
                                "1. open"
                            ],
                        high:
                            res.data["Time Series (1min)"][latestData][
                                "2. high"
                            ],
                        low:
                            res.data["Time Series (1min)"][latestData][
                                "3. low"
                            ],
                        close:
                            res.data["Time Series (1min)"][latestData][
                                "4. close"
                            ],
                        volume:
                            res.data["Time Series (1min)"][latestData][
                                "5. volume"
                            ],
                    }),
                })
            })
    }

    getDeletValue = data => {
        this.setState(prevState => ({
            all: R.filter(obj => obj.name != data, prevState.all),
        }))
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 60000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    getData = value => {
        axios
            .get(
                `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${
                    value.name
                }&interval=1min&apikey=89OGL8C90318QUM6`,
            )
            .then(res => {
                let latestData = res.data["Meta Data"]["3. Last Refreshed"]
                console.log(latestData)

                let all = this.state.all

                this.setState({
                    latestData: latestData,
                    all: all.concat({
                        name: value.name,
                        keys: latestData,
                        open:
                            res.data["Time Series (1min)"][latestData][
                                "1. open"
                            ],
                        high:
                            res.data["Time Series (1min)"][latestData][
                                "2. high"
                            ],
                        low:
                            res.data["Time Series (1min)"][latestData][
                                "3. low"
                            ],
                        close:
                            res.data["Time Series (1min)"][latestData][
                                "4. close"
                            ],
                        volume:
                            res.data["Time Series (1min)"][latestData][
                                "5. volume"
                            ],
                    }),
                })
            })
    }

    tick() {
        let all = this.state.all
        this.setState({
            all: [],
        })
        if (all.length != 0) {
            R.map(this.getData, all)
        }
    }

    render() {
        return (
            <div className="App">
                <div>
                    <Form
                        inputRef={ref => (this.myTextInput = ref)}
                        onSubmit={this.handleSubmit}
                    />
                    <StockList
                        list={this.state.all}
                        onClick={this.getDeletValue}
                    />
                </div>
            </div>
        )
    }
}

export default App
