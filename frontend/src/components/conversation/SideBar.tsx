import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Conversation } from "../../constants/types";
import client from "../../client/axios";
import APIS from "../../constants/api";
import Colors from "../../constants/color";
import Input from "../navbar/Input";
import ConversationNav from "./ConversationNav";
import Pusher from "pusher-js";
// import Message from "../../models/message";
import { useAppSelector } from "../../redux/store";
import { Result } from "antd";

export default function SideBar() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [nameConversation, setNameConvesation] = useState("");
    const [inviteCode, setInviteCode] = useState("");
    const account = useAppSelector((state) => state.user.account);

    const onSubmitCreate = (e: Event) => {
        e.preventDefault();
        client
            .post(APIS.CREAT_CONVERSATION, { name: nameConversation })
            .then((response: any) => {
                const new_conversation: Conversation = {
                    conversation_uuid: response.data.conversation_uuid,
                    name: response.data.name,
                    from_member_name: "",
                    is_message_owner: false,
                    created_at: "",
                    content: "",
                };
                setConversations([...conversations, new_conversation]);
            });
    };
    const onSubmitJoin = (e: Event) => {
        e.preventDefault();
        client
            .post(APIS.JOIN_CONVERSATION, { invite_code: inviteCode })
            .then((response: any) => {
                const new_conversation: Conversation = {
                    conversation_uuid: response.data.uuid,
                    name: response.data.name,
                    from_member_name: "",
                    is_message_owner: false,
                    created_at: "",
                    content: "",
                };
                setConversations([...conversations, new_conversation]);
            });
    };
    useEffect(() => {
        client
            .get<Conversation[]>(APIS.GET_CONVERSATIONS)
            .then((response: any) => {
                setConversations(response.data);
            })
            .catch((e) => console.log(e))
            .finally(() => {
                Pusher.logToConsole = true;

                const pusher = new Pusher("1b312e08ed8646072936", {
                    cluster: "ap1",
                });
                const channel = pusher.subscribe("chat_app");
                channel.bind(String(account?.uuid), function (data: any) {
                    //console.log(data);
                    const comming_message: Conversation = {
                        conversation_uuid: data.conversation,
                        name: data.conversation_name,
                        from_member_name: data.from_member,
                        is_message_owner: data.is_owned,
                        created_at: data.created_at,
                        content: data.content,
                    };
                    let newArr = [...conversations];

                    let res = newArr.filter((item) => {
                        if (
                            item.conversation_uuid !==
                            comming_message.conversation_uuid
                        )
                            return item;
                    });
                    console.log(res)
                    res.unshift(comming_message);
                    console.log(res)
                    setConversations(res);
                });
            });
    }, []);
    const [isShow, setIsShow] = useState(false);
    const NewConversation = () => {
        setIsShow((isShow) => !isShow);
    };

    return (
        <>
            <style type="text/css">
                {`
			.nav-pills .nav-link.active {
				border-radius: 0.2rem;
				color: ${Colors.DarkBlue};
				background-color: ${Colors.BabyBlue};
				box-shadow: rgb(0 0 0 / 45%) 0px 4px 4px;
			}
			.nav .nav-link{
				color:${Colors.DarkBlue};
				background-color: ${Colors.LightGrey};
			}
			.nav .nav-link:hover{
				background-color:  ${Colors.LightGrey};
				color: black
			}
    `}
            </style>
            <div className="h-100 col col-sm-3 bg-sidebar border-end border-4">
                <Container>
                    <Row className="justify-content-between my-3">
                        <Col>
                            <h2>Chats</h2>
                        </Col>
                        <Col className="text-end">
                            <Button
                                style={{
                                    backgroundColor: !isShow
                                        ? Colors.BlueGrotto
                                        : Colors.Red,
                                }}
                                onClick={NewConversation}
                            >
                                {!isShow ? "New conversation" : "Cancel"}
                            </Button>
                        </Col>
                    </Row>
                    {isShow && (
                        <Row className="my-3">
                            <Input
                                button="OK"
                                placeholder="Enter name of conversation"
                                setValue={setNameConvesation}
                                onSubmit={onSubmitCreate}
                            />
                        </Row>
                    )}
                    {!isShow && (
                        <Row className="my-3">
                            <Input
                                button="Join"
                                placeholder="Enter invite code"
                                setValue={setInviteCode}
                                onSubmit={onSubmitJoin}
                            />
                        </Row>
                    )}
                    <ul className="nav nav-link-color-red nav-pills flex-column mb-auto">
                        {conversations.map((conversation: Conversation) => {
                            return (
                                <ConversationNav
                                    key={conversation.conversation_uuid}
                                    conversation={conversation}
                                />
                            );
                        })}
                    </ul>
                </Container>
            </div>
        </>
    );
}
