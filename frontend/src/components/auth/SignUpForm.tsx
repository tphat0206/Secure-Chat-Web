import { Button, Form, Input } from "antd";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import client from "../../client/axios";
import { User } from "../../constants/types";
import hashFunction from "./hash";
import APIS from "../../constants/api";
import Colors from "../../constants/color";

export default function SignUpForm() {
  const navigate = useNavigate();

  interface InputError {
    username?: string;
    password?: string;
    email?: string;
    detail?: string;
    firstname?: string;
    lastname?: string;
  }

  const [inputError, setInputError] = useState<InputError>({});

  const onFinish = (values: any) => {
    const hash_password = hashFunction(values.password);
    client
      .post<User>(APIS.SIGN_UP, {
        username: values.username,
        password: hash_password,
      })
      .then(() => {
        navigate("/signin");
      })
      .catch((err: Error | AxiosError<InputError>) => {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            setInputError(err.response.data);
          }
        }
      });
  };

  return (
	<Container className="d-flex flex-column mt-5 mb-5 justify-content-center align-items-center">
      <Form
        onFinish={onFinish}
        name="basic"
        initialValues={{ remember: true }}
        autoComplete="off"
        size="large"
      >
        <Form.Item
          label=""
          validateStatus={inputError.username ? "error" : ""}
          hasFeedback
          help={inputError.username}
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            placeholder="Username"
            style={{
              borderRadius: 20,
            }}
          />
        </Form.Item>

        <Form.Item
          label=""
          name="password"
          validateStatus={inputError.password ? "error" : ""}
          hasFeedback
          help={inputError.password}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            placeholder="Password"
            style={{
              borderRadius: 20,
            }}
          />
        </Form.Item>

        <Form.Item
          label=""
          name="confirm_password"
          dependencies={["password"]}
          hasFeedback
          help
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm Password"
            style={{
              borderRadius: 20,
            }}
          />
        </Form.Item>

        <Form.Item
          validateStatus={inputError.detail ? "error" : ""}
          hasFeedback
          help={inputError.detail}
          style={{
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          <Button
            className="border-0 w-100"
			htmlType="submit"
            style={{ backgroundColor: Colors.BlueGreen }}
          >
            SIGN UP
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
}
