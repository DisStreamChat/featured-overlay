import React, { useEffect, useState } from "react";
import { Message } from "chatbits";
import { TransitionGroup } from "react-transition-group";
import "./App.scss";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import firebase from "./firebase";
import "chatbits/dist/index.css";

function App() {
	// 
	const [snapshot, loading, error] = useCollection(
		firebase.db.collection("featured-messages").doc(process.env.REACT_APP_ID).collection("messages").orderBy("sentAt", "desc")
	);
	
	const [userSnapshot, userLoading, userError] = useDocument(firebase.db.collection("Streamers").doc(process.env.REACT_APP_ID));
	const [messages, setMessages] = useState([]);
	const [settings, setSettings] = useState({});

	useEffect(() => {
		if (snapshot) {
			const docs = snapshot.docs.map(doc => doc.data());
			setMessages(docs);
		}
	}, [snapshot]);

	useEffect(() => {
		if (userSnapshot) {
			const data = userSnapshot.data();
			if (data) {
				setSettings(data.appSettings);
			}
		}
	}, [userSnapshot]);

	return (
		<div style={{ fontFamily: settings.Font, fontSize: `${settings.FontScaling || 1}rem` }}>
			<TransitionGroup>
				{messages.map(message => (
					<Message index={message.id} streamerInfo={settings} msg={{ ...message, platform: "discord" }} isOverlay={true} key={message.id} />
				))}
			</TransitionGroup>
		</div>
	);
}

export default App;
