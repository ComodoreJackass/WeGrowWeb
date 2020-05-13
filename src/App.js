import React, { useState } from 'react';
import Login from './components/Login'
import Register from './components/Register'
import TabsNav from './components/TabsNav'
import Landing from './components/Landing'

function App() {
  const [logedIn, setLogedIn] = useState(false);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  const [jsonToken, setJsonToken] = useState('');
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');

  if (!logedIn && !register && !login) {
    return (<Landing returnLogin={setLogin} />)
  }
  else if (!logedIn && !register && login) {
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
  else if (!logedIn && register && login) {
    return (<Register
      returnRegister={setRegister}
    />);
  }
  else if (logedIn) {
    return (<TabsNav jsonToken={jsonToken} userId={userId} username={username} password={password} email={email} date={date} returnLogedIn={setLogedIn} returnLogin={setLogin} />);
  }
}

export default App;
