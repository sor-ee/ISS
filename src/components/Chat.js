import { useEffect, useState } from "react";
import {addDoc, collection, serverTimestamp, onSnapshot, query, where, doc, orderBy} from 'firebase/firestore';
import { auth, db } from "../firebase-config";
import '../styles/Chat.css';
export const Chat = (props) => {
    const {room} = props
    const [newMesssage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([]);
    const messageRef = collection(db, "messages");
    function caesarCipher(text, shift) {
        let result = '';
    
        for (let i = 0; i < text.length; i++) {
          let char = text[i];
    
          if (char.match(/[a-zA-Z]/)) {
            let isUpperCase = char === char.toUpperCase();
            let asciiOffset = isUpperCase ? 65 : 97;
            char = String.fromCharCode((char.charCodeAt(0) - asciiOffset + shift) % 26 + asciiOffset);
            if (!isUpperCase) {
              char = char.toLowerCase();
            }
          }
    
          result += char;
        }
    
        return result;
      }
    useEffect(() => {
        const queryMessage = query(messageRef, where("room", "==", room),orderBy("createdAt"));
        const unsuscribe = onSnapshot(queryMessage, (snapshot)=> {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id});
            });
            setMessages(messages);
        });

        return () => unsuscribe();
    }, []);
    const handleSubmitForm = async(e) => {
        e.preventDefault()
        if (newMesssage === "") return;
        const originalText = newMesssage;
        const shiftAmount = 3;
        const encryptedText = caesarCipher(originalText, shiftAmount);
        await addDoc(messageRef, {
            text: originalText,
            cyphertext: encryptedText,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
            // cyphertext : newcyphertext,
        });

        setNewMessage("")
    };
      
    return (
        <div className="chat-app">
            <div className="header">
                <h1>Welcome to: {room.toUpperCase()}</h1>
            </div>
            <div className="messages"> {messages.map((message) => (
            <div className="message" key={message.id}>
                <span className="user">{message.user}</span>
                <div className="">{message.text}</div> {message.cyphertext}
            </div>))}</div>
            <form onSubmit={handleSubmitForm} className="new-message-form">
                <input className="new-message-input" 
                placeholder="type your message here..." 
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMesssage}/>
                <button type="submit" className="send-button">send</button>
            </form>
        </div>
    );
};