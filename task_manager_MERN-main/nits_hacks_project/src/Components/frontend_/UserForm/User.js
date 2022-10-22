import { useState, useEffect } from "react";
import "./User.css";

function App() {


  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const WasteData = {
       nature:data.get('nature'),
       weight:data.get('weight'),
       old: data.get('old'),
       location: data.get('location'),
       image:data.get('image'),
       description:data.get('description'),
     };

     console.log(WasteData);

     const url = `http://localhost:5000/task`;
     fetch(url,{
       method:"POST",
       headers: {
         "Access-Control-Allow-Origin": "*",
         "Content-type": "application/json",
       },
       body:JSON.stringify({data:WasteData})
     })
     .then(res=>res.json())
     .then(data=>{
       console.log('data..created',data);
       if(data.status==400) {alert('all inputs are required')}
       else if(data.status==201)(alert("your data has been posted"))
     })
     .catch(err=>console.log(err)) 

  };

  return (
    <div className="userCont">
      <div className="bg_image">
        <img src="https://images.unsplash.com/photo-1610141160723-d2d346e73766?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHdhc3RlJTIwbWFuYWdlbWVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
      </div>
      <form onSubmit={handleSubmit} className="userForm">
        <div className="divider"> <h1> Waste Description </h1></div>
        <div className="ui form">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label > Nature of Waste</label>
              <select name="nature"  className="form-control">
                <option >Select</option>
                <option value="Organic">Organic</option>
                <option value="Plastics">Plastics</option>
                <option value="Stationary">Stationary</option>
                <option value="Metal">Metal</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label> Estimated Weight </label>
              <input
                type="number"
                name="weight"
                placeholder="In Kg"
                className="form-control"
              />
            </div>
         
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label> How old is it ? </label>
              <select name="old"  className="form-control">
                <option >Select</option>
                <option value="week">Less then a week</option>
                <option value="month">Less then a month</option>
                <option value="more">Very old</option>
              </select>
            </div>
          
            <div className="form-group col-md-6">
              <label> Location </label>
              <input
                className="form-control"
                type="text"
                name="location"
                placeholder="Found Waste location"
                
              />
            </div>
         
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label> Image of Waste </label>
              <input
                className="form-control"
                type="file"
                multiple accept="image/*"
                name="image"
               
               
              />
            </div>
           
            <div className="form-group col-md-6">
              <label> Description About Waste </label>
              <br />
              <textarea
                rows={1}
                cols={40}
                className="form-control"
                name="description"
                placeholder="Want to describe some more about Waste, Write here"
               
              />
            </div>
          </div>
          <div className="text-center">
            <button className="btn btn-primary"> Submit </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
