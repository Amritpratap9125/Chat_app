import { useEffect, useState } from 'react';
import './App.css';
import { getDatabase, push, ref, set, onChildAdded, off } from "firebase/database";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setName(result.user.displayName);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const [name, setName] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState('');
  const db = getDatabase();
  const postListRef = ref(db, 'chats');

  const updateHeight = () => {
    const el = document.getElementById('chat');
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };

  useEffect(() => {
    const handleChildAdded = (data) => {
      setChats((prevChats) => [...prevChats, data.val()]);
      setTimeout(() => {
        updateHeight();
      }, 1000);
    };

    onChildAdded(postListRef, handleChildAdded);

    return () => {
      // Cleanup the listener when the component unmounts
      off(postListRef, 'child_added', handleChildAdded);
    };
  }, []);

  const sendChat = () => {
    const newPostRef = push(postListRef);
    set(newPostRef, {
      name,
      message: msg,
    });

    setMsg('');
  };

  return (
    <div>
      {!name && (
        <div>
          <input type='text' placeholder='Enter your name' onBlur={e => setName(e.target.value)} />
          <button onClick={googleLogin}>Google signIn</button>
        </div>
      )}

      {name && (
        <div>
          <h3>User: {name}</h3>
          <div id='chat' className='chat-container'>
            {chats.map((c, i) => (
              <div key={i} className={`container ${c.name === name ? 'me' : ''}`}>
                <p className='chatbox'>
                  <strong>{c.name}:</strong>
                  <span>{c.message}</span>
                </p>
              </div>
            ))}
          </div>

          <div className='btm'>
            <input type='text' onInput={(e) => setMsg(e.target.value)} value={msg} placeholder='Enter your message' />
            <button onClick={sendChat}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
