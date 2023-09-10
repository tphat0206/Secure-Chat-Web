
import Message from '../../models/message';

import ChatMessage from './ChatMessage';
import { Container } from 'react-bootstrap';
import ChatInput from './ChatInput';
import { useAppSelector } from '../../redux/store';
import { useEffect, useState } from 'react';
import client from '../../client/axios';
import APIS from '../../constants/api';

export default function ChatBox(conversation_id: string) {

    const messages: Message[] = [
        {
            uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            is_owned: false,
            from_member: "Albert",
            created_at: new Date("2023-09-10T06:04:22.536Z"),
            updated_at: new Date("2023-09-10T06:04:22.536Z"),
            is_unsent: false,
            is_removed: false,
            is_system_message: false,
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            conversation: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
          },
          {
            uuid: "3fa85f64-5717-4562-b3fc-2c963f66aeuf",
            is_owned: true,
            from_member: "elbert",
            created_at: new Date("2023-09-10T06:04:22.536Z"),
            updated_at: new Date("2023-09-10T06:04:22.536Z"),
            is_unsent: false,
            is_removed: false,
            is_system_message: false,
            content: "Hello everyone 2",
            conversation: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
          },
          {
            uuid: "3fa85f64-5717-4562-b3fc-2c963f66aeif",
            is_owned: false,
            from_member: "Albert",
            created_at: new Date("2023-09-10T06:04:22.536Z"),
            updated_at: new Date("2023-09-10T06:04:22.536Z"),
            is_unsent: false,
            is_removed: false,
            is_system_message: false,
            content: "Hello everyone 3",
            conversation: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
          },
          {
            uuid: "3fa85f64-5717-4562-b3fc-werdsfsdf",
            is_owned: false,
            from_member: "Albert",
            created_at: new Date("2023-09-10T06:04:22.536Z"),
            updated_at: new Date("2023-09-10T06:04:22.536Z"),
            is_unsent: false,
            is_removed: false,
            is_system_message: false,
            content: "Hello everyone 3",
            conversation: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
          },
          {
            uuid: "3fa85f64-5717-4562-b3fc-dfgdgddffd",
            is_owned: false,
            from_member: "Albert",
            created_at: new Date("2023-09-10T06:04:22.536Z"),
            updated_at: new Date("2023-09-10T06:04:22.536Z"),
            is_unsent: false,
            is_removed: false,
            is_system_message: false,
            content: "Hello everyone 3",
            conversation: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
          },
          {
            uuid: "3fa85f64-5717-4562-b3fc-ewrwrsdvcx",
            is_owned: false,
            from_member: "Albert",
            created_at: new Date("2023-09-10T06:04:22.536Z"),
            updated_at: new Date("2023-09-10T06:04:22.536Z"),
            is_unsent: false,
            is_removed: false,
            is_system_message: false,
            content: "Hello everyone 3",
            conversation: "3fa85f64-5717-4562-b3fc-sfdsfsdfs"
          },
          {
            uuid: "3fa85f64-5717-4562-b3fc-2c963f66eref",
            is_owned: false,
            from_member: "Albert",
            created_at: new Date("2023-09-10T06:04:22.536Z"),
            updated_at: new Date("2023-09-10T06:04:22.536Z"),
            is_unsent: false,
            is_removed: false,
            is_system_message: false,
            content: "Hello everyone 3",
            conversation: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
          },

    ]
    
    // const group = useAppSelector((state) => state.chat.group);

    // const [messages, setMessages] = useState<Message[]>();

    // TODO: Lấy message theo group
    // useEffect(() => {
    //     client.get<Message[]>(APIS.GET_MESSAGES)
    //       .then((res) => {
    //         setMessages(res.data);
    //       });
    //   });

    return (
        <Container>
        <Container 
        className='h-80 mh-80'
        style={{ maxHeight: '83%', display: 'flex', flexDirection: 'column', gap: '1vh', flex: 1, padding: '20px 0', overflowY: 'overlay'}}
        >
            {
                messages.map((m: Message) => 
                    (
                        <ChatMessage key={m.uuid} message={m} />
                    )
                )
            }
        </Container>
        <ChatInput conversation_id={conversation_id}/>
        </Container>
    );
}