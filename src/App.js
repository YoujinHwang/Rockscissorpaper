import {useState} from 'react';
import './App.css';
import Box from './component/Box';

//1.박스 2개 (타이틀, 사진, 결과)
//2. 가위 바위 보 버튼이 있다
//3. 버튼을 클릭하면 클릭한 값이 박스에 보임
//4. 컴퓨터는 랜덤하게 아이템 선택이 된다
//5. 3 4의 결과를 가지고 누가 이겼는지 승패를 따진다
//6. 승패 결과에 따라 테두리 색이 바뀐다(이기면-초록, 지면-빨강, 비기면-검은색)

const choice={
  rock:{
    name:"Rock",
    img:"https://t3.ftcdn.net/jpg/02/93/71/22/360_F_293712283_EGPqlm1bxpH0ZnrngyjRBol9GnJm2ST7.jpg",
  },
  scissors:{
    name:"Scissors",
    img:"data:image/png;base64,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",
  },
  paper:{
    name:"Paper",
    img:"https://t4.ftcdn.net/jpg/05/34/87/15/360_F_534871551_MOmx3mu3oP1TkmUW8ZDffLpHrv86LLrE.jpg",
  },
};

function App() {
  const [userSelect, setUserSelect]=useState(null);
  const [computerSelect,setComputerSelect]=useState(null)
  const [result,setResult]=useState(null);
  const play=(userChoice)=>{
    setUserSelect(choice[userChoice]);
    let computerChoice=randomChoice();
    setComputerSelect(computerChoice);
    setResult(judgement(choice[userChoice],computerChoice));
  };

  const judgement=(user,computer)=>{
    console.log("user",user,"computer",computer);

    //user==computer tie
    //user==rock, computer==scissors user win
    //user==rock, computer==paper user lose
    //user==scissors computer==paper user win
    //user==scissors computer==rock user lose
    //user==paper computer==rock user win
    //user==paper computer==scissors user lose

    if(user.name===computer.name){
      return "tie"
    }else if(user.name=="Rock")return computer.name=="Scissors"?"win":"lose"
    else if(user.name=="Scissors")return computer.name=="Paper"?"win":"lose"
    else return computer.name=="Rock"?"win":"lose"
  }

  const randomChoice=()=>{
    let itemArray=Object.keys(choice); //객체에 키값만 뽑아서 배열로 만들어주는 함수다
    console.log("item array", itemArray);
    let randomItem=Math.floor(Math.random()*itemArray.length);
    console.log("random value",randomItem);
    let final=itemArray[randomItem];
    return choice[final];
  };

  return (
    <div>
      <div className="main">
        <Box title="You" item={userSelect} result={result}/>
        <Box title="Computer" item={computerSelect} result={result}/>
    `</div>
    `<div className="main">
        <button onClick={()=> play("scissors")}>가위</button>
        <button onClick={()=>play("rock")}>바위</button>
        <button onClick={()=>play("paper")}>보</button>
      </div>
    </div>
    

  );
}

export default App;
