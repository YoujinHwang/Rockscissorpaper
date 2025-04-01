import React, { Component } from "react";

class BoxClass extends Component {
  constructor() {
    super();
    this.result = "";
    this.faces = "";
  }

  Result = () => {
    const faces = {
      win: "😎",
      lose: "😭",
      tie: "😐",
    };

    if (
      this.props.title === "Computer" &&
      this.props.result !== "tie" &&
      this.props.result !== ""
    ) {
      this.result = this.props.result === "win" ? "lose" : "win";
    } else {
      this.result = this.props.result;
    }
    this.faces = faces[this.result];
  };

  render() {
    this.Result();
    return (
      <div className={`box ${this.result}`}>
        <h1>{this.props.title}</h1>
        <img
          className="item-img"
          src={this.props.item && this.props.item.img}
          alt=""
        />
        <h2>
          {this.props.item &&
            (this.props.title === "You"
              ? `${this.result} ${this.faces}`
              : this.result)}
        </h2>
      </div>
    );
  }
}

export default BoxClass;
