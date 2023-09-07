import {useEffect, useState} from "react";
import Pusher from "pusher-js";
interface Message{
    username: string,
    message: string,
}
export default function ConversationPage() {
    const [username, setUsername] = useState('username');
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher('1b312e08ed8646072936', {
            cluster: 'ap1'
        });
        console.log(messages)
        const channel = pusher.subscribe('chat');
        channel.bind('message', function (data:Message) {
            setMessages(prevMessages => [...prevMessages, data]);
        });
    }, []);

    const submit = async (e:any) => {
        e.preventDefault();

        await fetch('http://0.0.0.0:8000/chat/messages', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username,
                message
            })
        });

        setMessage('');
    }

    return (
        <div className="container">
            <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                <div
                    className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
                    <input className="fs-5 fw-semibold" value={username}
                           onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className="list-group list-group-flush border-bottom scrollarea">
                    {messages.map((message,index) => {
                        return (
                            <div key={index} className="list-group-item list-group-item-action py-3 lh-tight">
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                    <strong className="mb-1">{message.username}</strong>
                                </div>
                                <div className="col-10 mb-1 small">{message.message}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <form onSubmit={e => submit(e)}>
                <input className="form-control" placeholder="Write a message" value={message}
                       onChange={e => setMessage(e.target.value)}
                />
            </form>
        </div>
    );
}
