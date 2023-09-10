import { Form, Input, Button } from "antd";
import client from "../../client/axios";
import axios, { AxiosError } from "axios";
import APIS from "../../constants/api";
import Colors from "../../constants/color";
import { useState } from "react";


export default function ChatInput(conversation_id: any) {
    interface InputError {
        message?: string;
    }

    const [inputError, setInputError] = useState<InputError>({});

    const sendMessage = (values: any) => {
        client
          .post<any>(APIS.SEND_MESSAGE, {
            content: values.message,
            conversation: conversation_id,
          })
          .then((response) => {
            // TODO: update something
            console.log('oke')
          }
          )
          .catch((err: Error | AxiosError<InputError>) => {
            if (axios.isAxiosError(err)) {
              if (err.response) {
                setInputError(err.response.data);
              }
            }
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
            <Form.Item 
                name="message" 
                style={{width: '80%'}}
                validateStatus={inputError.message ? "error" : ""}
            >
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
    )
}