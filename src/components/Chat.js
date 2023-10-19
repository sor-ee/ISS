import { useEffect, useState } from "react";
import {addDoc, collection, serverTimestamp, onSnapshot, query, where, doc, orderBy} from 'firebase/firestore';
import { auth, db } from "../firebase-config";
import '../styles/Chat.css';
export const Chat = (props) => {
    const {room} = props
    const [newMesssage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([]);
    const messageRef = collection(db, "messages");

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

        await addDoc(messageRef, {
            text: newMesssage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
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
                {message.text}
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