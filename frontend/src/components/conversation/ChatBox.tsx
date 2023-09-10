import Message from "../../models/message";

import ChatMessage from "./ChatMessage";
import { Container } from "react-bootstrap";
import ChatInput from "./ChatInput";
import { useParams } from "react-router-dom";
import client from "../../client/axios";
import APIS from "../../constants/api";
import { useEffect, useState } from "react";
// import { useAppSelector } from "../../redux/store";
// import { useEffect, useState } from "react";
// import client from "../../client/axios";
// import APIS from "../../constants/api";

export default function ChatBox() {
  const {conversation_id} = useParams();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    client.get(APIS.GET_MESSAGES+ `/${conversation_id}`).then((res) => {
      setMessages(res.data.messages);
    });
  }, []);

  return (
    <Container>
      <Container
        className="h-80 mh-80"
        style={{
          maxHeight: "83%",
          display: "flex",
          flexDirection: "column",
          gap: "1vh",
          flex: 1,
          padding: "20px 0",
          overflow: "auto",
        }}
      >
        {messages.map((m: Message) => (
          <ChatMessage key={m.uuid} message={m} />
        ))}
      </Container>
      <ChatInput messages={messages} setMessages={setMessages}/>
    </Container>
  );
}
