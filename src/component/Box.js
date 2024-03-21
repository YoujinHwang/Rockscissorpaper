import React from 'react'

const Box=(props)=>{
    //console.log("props",props);
    let result;
    let comResult;
    if(props.result!=="tie") {
        comResult=props.result==="win"?"lose":"win";
        if(props.title==="Computer") {
            result=comResult;
        } else {
            result=props.result;
        }   
    }
    else result="tie"; 

    // const boxClass=result==="win"?"green":
    //                 result==="lose"?"red":
    //                 "black";

    const boxClass=`box ${result}`;

    return (
        <div className={boxClass}> 
            <h1>{props.title}</h1>
            <img className='item-img'
            src={props.item&&props.item.img}
            alt=''
            />
            <h2>{props.item&&result}</h2>
        </div>
    )
}
export default Box