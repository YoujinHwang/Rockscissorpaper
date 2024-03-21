import React,{Component} from "react";
import "./App.css";
import BoxClass from "./component/BoxClass";


const choice={
    rock:{
        name:"Rock",
        img:"https://t3.ftcdn.net/jpg/02/93/71/22/360_F_293712283_EGPqlm1bxpH0ZnrngyjRBol9GnJm2ST7.jpg",
    },
    scissors:{
        name:"Scissors",
        img:"https://www.sliceproducts.com/cdn/shop/products/10544_42f8515e-f918-4b7d-b1e8-d32ebaff0955.jpg?v=1660659479&width=1946",
    },
    paper:{
        name:"Paper",
        img:"https://t4.ftcdn.net/jpg/05/34/87/15/360_F_534871551_MOmx3mu3oP1TkmUW8ZDffLpHrv86LLrE.jpg",
    },
};
      
export default class AppClass extends Component {
    constructor() {
        super();
        this.state={
            userSelect:null,
            computerSelect:null,
            result:"",
        };
    }
    play=(userChoice)=>{
        let computerChoice=this.randomChoice();
        this.setState({
            userSelect: choice[userChoice],
            computerSelect:computerChoice,
            result: this.judgement(choice[userChoice],computerChoice),
        });
    };  
      
    judgement=(user,computer)=>{
        //console.log("user",user,"computer",computer);
      
        if(user.name===computer.name){
            return "tie"
        }else if(user.name==="Rock")return computer.name==="Scissors"?"win":"lose"
        else if(user.name==="Scissors")return computer.name==="Paper"?"win":"lose"
        else return computer.name==="Rock"?"win":"lose"
    }
      
    randomChoice=()=>{
          let itemArray=Object.keys(choice); //객체에 키값만 뽑아서 배열로 만들어주는 함수다
          //console.log("item array", itemArray);
          let randomItem=Math.floor(Math.random()*itemArray.length);
          //console.log("random value",randomItem);
          let final=itemArray[randomItem];
          return choice[final];
    };
      

    render() {
        return (
        <div>
            <div className="main">
              <BoxClass title="You" item={this.state.userSelect} result={this.state.result}/>
              <BoxClass title="Computer" item={this.state.computerSelect} result={this.state.result}/>
            </div>
            <div className="main">
              <button onClick={()=> this.play("scissors")}>가위</button>
              <button onClick={()=> this.play("rock")}>바위</button>
              <button onClick={()=> this.play("paper")}>보</button>
            </div>
        </div>
        )
    }
}