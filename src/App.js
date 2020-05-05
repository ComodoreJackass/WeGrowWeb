import React, { useState } from 'react';
import Login from './components/Login'
import Register from './components/Register'
import TabsNav from './components/TabsNav'

function App() {
  const [logedIn, setLogedIn] = useState(false);
  const[register, setRegister] = useState(false);

  const [jsonToken, setJsonToken] = useState('');
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');

  if (!logedIn && !register) {
    return (<Login
      returnLogedIn={setLogedIn}
      returnRegister={setRegister}
      returnJsonToken={setJsonToken}
      returnUserId={setUserId}
      returnUsername={setUsername}
      returnPassword={setPassword}
      returnEmail={setEmail}
      returnDate={setDate}
    />);
  }
  else if(!logedIn && register){
    return (<Register
      returnRegister={setRegister}
    />);
  }
  else {
    return (<TabsNav jsonToken={jsonToken} userId={userId} username={username} password={password} email={email} returnLogedIn={setLogedIn}/>);
  }
}

export default App;
