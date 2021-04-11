import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  useEffect(() => {
    // 여기서 데이터베이스에 있는 값을 가져옴
    axios.get('/api/values')
      .then(response => {
        console.log('response', response)
        setLists(response.data)
      })
  }, [])

  const [lists, setLists] = useState([])
  const [value, setValue] = useState("")

  const changeHandler = (event) => {
    setValue(event.currentTarget.value)
  }

  const submitHandler = (event) => {
    event.preventDefault();

    axios.post('/api/value', {value: value})
    .then(response => {
      if(response.data.success){
        console.log('response.data', response.data)
        setLists([...lists, response.data])
        
      }
      else {
        alert('FAIL')
      }
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <div className="container">
          {lists && lists.map((list, index) => (
            <li key={index}>{list.value}</li>
          ))}
          <br />
          
          <from className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Input..."
              onChange={changeHandler}
              value={value}
            />
            <button type="submit">확인</button>
          </from>
        </div>
      </header>
    </div>
  );
}

export default App;