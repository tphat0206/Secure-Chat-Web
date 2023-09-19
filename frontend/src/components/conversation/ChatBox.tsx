import Message from "../../models/message";

import ChatMessage from "./ChatMessage";
import { Container, Row } from "react-bootstrap";
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
    const { conversation_id } = useParams();
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        client.get(APIS.GET_MESSAGES + `/${conversation_id}`).then((res) => {
            setMessages(res.data.messages);
        });
    }, [conversation_id]);

    return (
        <Container
            className="col h-100 d-flex flex-column"
            style={{ overflowY: "auto", overflowX: "hidden" }}
        >
            <Row style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
                {messages.map((m: Message) => (
                    <ChatMessage key={m.uuid} message={m} />
                ))}
            </Row>
            <Row style={{ height: 100 }}>
                <ChatInput messages={messages} setMessages={setMessages} />
            </Row>
        </Container>
    );
}
