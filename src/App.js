import {useState , useEffect} from 'react';
import io from 'socket.io-client';
import {nanoid} from 'nanoid';
import './App.css';

const socket = io.connect('http://localhost:5000')
const userName = nanoid(4)

function App() {
  const [message, setmessage] = useState('');
  const [chat, setchat] = useState([]);
 const sendchat = (e)=>{
 e.preventDefault();
 socket.emit('chat',{message},userName)
 setmessage('')
 }

useEffect(() => {
 socket.on('chat',(payload)=>{
  setchat([...chat,payload])
  
 })
})

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chatty App</h1>
        {chat.map((payload,index)=>{
          return (
          <p key={index}>{payload.message} <span>{userName}</span></p>
        )
        })}
        <form onSubmit={sendchat} >
      <input type="text" placeholder='message' value={message} onChange={(e)=>setmessage(e.target.value)} />
      <button type='submit'>send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
