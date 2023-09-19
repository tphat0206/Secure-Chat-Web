import { Form, Input, Button } from "antd";
import client from "../../client/axios";
import APIS from "../../constants/api";
import Colors from "../../constants/color";
import { useParams } from "react-router-dom";
import Message from "../../models/message";

export default function ChatInput({ messages, setMessages }: any) {
  const { conversation_id } = useParams();

  const sendMessage = (values: any) => {
    client
      .post(APIS.SEND_MESSAGE, {
        content: values.message,
        conversation: conversation_id,
      })
      .then((response) => {
        const new_message: Message = {
          uuid: response.data.uuid,
          is_owned: true,
          from_member: "string",
          is_unsent: false,
          is_removed: false,
          is_system_message: false,
          content: values.message,
          conversation: "string",
          created_at: "",
          updated_at: "",
        };
        setMessages([...messages, new_message]);
      });
  };

  return (
    <Form
      layout="inline"
      onFinish={sendMessage}
      name="basic"
      initialValues={{ remember: true }}
      autoComplete="off"
      size="large"
      style={{ color: "#fff" }}
      className="justify-content-evenly pt-2"
    >
      <Form.Item name="message" style={{ width: "80%" }}>
        <Input placeholder="Type a message..." />
      </Form.Item>
      <Button
        className="border-0"
        htmlType="submit"
        style={{ backgroundColor: Colors.BlueGreen }}
      >
        Send
      </Button>
    </Form>
  );
}
