import React, { useState } from 'react'

const Tempform = () => {
     const [data,setData] = useState();
     const submitHandler = () => {
          console.log(data);
          const url = "http://localhost:5000/task"
          fetch(url,{
               method:"POST",
               headers: {
                 "Access-Control-Allow-Origin": "*",
                 "Content-type": "application/json",
               },
               body:JSON.stringify({weight:data,nature:data,location:data})
             })
             .then(res=>res.json())
             .then(data=>{
               console.log('data..created',data);
             })
             .catch(err=>console.log(err)) 
           }
     
  return (
    <div>
      <input type="text" onChange={(e)=>setData(e.target.value)}/>
      <button onClick={submitHandler}>submit</button>
    </div>
  )
}

export default Tempform
