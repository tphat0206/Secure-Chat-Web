

// export default function BoxChat(){

//     return(
//         <div>
//             Box Chat
//         </div>
//     )
// }



// import styled from 'styled-components';
import Message from '../../models/message';
import { useRef } from 'react';
import ChatMessage from './ChatMessage';
import { Container } from 'react-bootstrap';

// const ConversationContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     gap: 1vh;
//     flex: 1;
//     padding: 20px 0;
//     overflow: auto;
// `;

// const MessageContent = styled.div`
//     display: flex;
//     font-size: 0.8em;
//     font-weight: 300;
//     padding: 0.8em 1em;
//     width: fit-content;
//     height: fit-content;
// `;

// const MessageContainer = styled.div`
//     display: flex;
//     gap: 20px;
//     color: #fff;
//     font-size: 1rem;
//     flex-direction: ${ props => props.incomingMessage ? 'row' : 'row-reverse' };

//     ${ MessageContent } {
//         background: ${ props => props.incomingMessage ? 'var(--blue-gradient)' : '#fff' };
//         border: ${ props => props.incomingMessage ? 'none' : '1px solid rgba(0, 0, 0, 0.1)' };
//         color: ${ props => props.incomingMessage ? '#fff' : '#000' };
//         box-shadow:  ${ props => props.incomingMessage ? 'rgba(32, 112, 198, 0.4)' : 'rgba(0, 0, 0, 0.15)'} 2px 3px 15px;
//         border-radius: ${ props => props.incomingMessage ? '0 8px 8px 8px' : '8px 0 8px 8px' };
//     }
// `;

// const UserProfile = styled.div`
//     display: flex;
//     position: relative;
//     height: 100%;

//     &::before {
//         content: '${props => getFirstLetter(props.content) }';
//         display: grid;
//         place-content: center;
//         padding: 0.5em;
//         width: 1.3em;
//         height: 1.3em;
//         border-radius: 50%;
//         background: var(--secondry-color-dark-palette);
//     }
// `
// const BotMessage = styled.div`
//     width: fit-content;
//     margin: 0 auto;
//     padding: 0.85em 1.7em;
//     font-size: 0.7em;
//     text-align: center;
//     border-radius: 2em;
//     background: rgba(0,0,0,0.05);
// `;


export default function ChatBox() {

//   const chatConversation = useRef(null);

  // auto scroll to bottom on new message recieve / sent
//   useEffect(() => {
//     chatConversation.current.scrollTo(0, chatConversation.current.scrollHeight);    
// }, [messages]);

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
    ]


  return (
    <Container 
    
    style={{ display: 'flex', flexDirection: 'column', gap: '1vh', flex: 1, padding: '20px 0', overflow: 'auto'}}
    >
    {
        messages.map((m: Message) => 
            (
                <ChatMessage key={m.uuid} message={m} />
            )
        )
    }
    </Container>
  );
}