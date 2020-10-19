import React, { useEffect, useState } from "react";
import { Message } from "chatbits";
import { TransitionGroup } from "react-transition-group";
import "./App.css";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "./firebase";
import "chatbits/dist/index.css"

function App() {
    const [snapshot, loading, error] = useCollection(
        firebase.db
            .collection("messages")
            .doc("dav1dsnyder404")
            .collection("messages")
            .orderBy("sentAt", "desc")
    );

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (snapshot) {
            const docs = snapshot.docs.map((doc) => doc.data());
            setMessages(docs);
        }
    }, [snapshot]);

    console.log(snapshot, loading, error)
    return (
        <TransitionGroup>
            {messages.map((message) => (
                <Message
                    index={message.id}
                    streamerInfo={{}}
                    msg={message}
                    // isOverlay
                    key={message.id}
                />
            ))}
        </TransitionGroup>
    );
}

export default App;
