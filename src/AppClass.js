import React, { Component } from "react";
import "./App.css";
import BoxClass from "./component/BoxClass";

const choice = {
  rock: {
    name: "Rock",
    img: "https://t3.ftcdn.net/jpg/02/93/71/22/360_F_293712283_EGPqlm1bxpH0ZnrngyjRBol9GnJm2ST7.jpg",
  },
  scissors: {
    name: "Scissors",
    img: "https://www.sliceproducts.com/cdn/shop/products/10544_42f8515e-f918-4b7d-b1e8-d32ebaff0955.jpg?v=1660659479&width=1946",
  },
  paper: {
    name: "Paper",
    img: "https://t4.ftcdn.net/jpg/05/34/87/15/360_F_534871551_MOmx3mu3oP1TkmUW8ZDffLpHrv86LLrE.jpg",
  },
};

export default class AppClass extends Component {
  constructor() {
    super();
    this.state = {
      userSelect: null,
      computerSelect: null,
      result: "",
      wins: 0,
      lives: 0,
      isGameOver: false,
    };
  }
  play = (userChoice) => {
    if (this.state.isGameOver) return;

    const userPick = choice[userChoice];
    const computerChoice = this.randomChoice();
    const gameResult = this.judgement(userPick, computerChoice);

    let { wins, lives } = this.state;

    if (gameResult === "win") {
      wins++;
    } else if (gameResult === "lose") {
      lives++;
      if (lives >= 3) {
        this.setState({ isGameOver: true });
        setTimeout(() => {
          this.setState({
            isGameOver: false,
            lives: 0,
            wins: 0,
            userSelect: null,
            computerSelect: null,
            result: "",
          });
        }, 2000);
      }
    }
    this.setState({
      userSelect: userPick,
      computerSelect: computerChoice,
      result: gameResult,
      wins,
      lives,
    });
  };

  judgement = (user, computer) => {
    //console.log("user",user,"computer",computer);

    if (user.name === computer.name) {
      return "tie";
    } else if (user.name === "Rock")
      return computer.name === "Scissors" ? "win" : "lose";
    else if (user.name === "Scissors")
      return computer.name === "Paper" ? "win" : "lose";
    else return computer.name === "Rock" ? "win" : "lose";
  };

  randomChoice = () => {
    let itemArray = Object.keys(choice); //객체에 키값만 뽑아서 배열로 만들어주는 함수다
    //console.log("item array", itemArray);
    let randomItem = Math.floor(Math.random() * itemArray.length);
    //console.log("random value",randomItem);
    let final = itemArray[randomItem];
    return choice[final];
  };

  renderLives = () => {
    const lostImg =
      "https://i.namu.wiki/i/7SO2FDuNnzmK_kE68K_wceSKJqoW8-E4vQnJE3uAItSdqFbjbwHMgITRfWLnssiT7MLWzTz3n6nBedGTFFC1EA.webp";
    const maxLives = 3;
    const { lives } = this.state;

    return (
      <div className="lives-container">
        {[...Array(maxLives)].map((_, idx) => (
          <div className="life" key={idx}>
            {idx < lives ? (
              <img src={lostImg} alt="X" className="life-img" />
            ) : (
              <div className="empty-circle"></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  render() {
    return (
      <div className="app">
        <h1 className="title">🐾 가위 바위 보 게임 🐾</h1>
        {this.renderLives()}
        <div className="score-board">{this.state.wins} WIN</div>

        <div className="game-area">
          {this.state.isGameOver && <div className="game-over">GAME OVER</div>}

          <div className="main">
            <BoxClass
              title="You"
              item={this.state.userSelect}
              result={this.state.result}
            />
            <BoxClass
              title="Computer"
              item={this.state.computerSelect}
              result={this.state.result}
            />
          </div>
        </div>

        <div className="main">
          <button onClick={() => this.play("scissors")}>
            <span className="emoji">✌️</span>
          </button>
          <button onClick={() => this.play("rock")}>
            <span className="emoji">✊</span>
          </button>
          <button onClick={() => this.play("paper")}>
            {" "}
            <span className="emoji">🖐️</span>
          </button>
        </div>
      </div>
    );
  }
}
