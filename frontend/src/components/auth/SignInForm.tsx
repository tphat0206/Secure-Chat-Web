import { Form, Input, Button } from "antd";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import client from "../../client/axios";
import APIS from "../../constants/api";
import LOCAL_STORAGE_KEYS from "../../constants/local_storage";
import { SigninCredentails, User } from "../../constants/types";
import { useAppDispatch } from "../../redux/store";
import { setToken } from "../../redux/user/slice";
import hashFunction from "./hash";
import Colors from "../../constants/color";

export default function SignInForm() {
  interface InputError {
    username?: string;
    password?: string;
    detail?: string;
  }

  const [inputError, setInputError] = useState<InputError>({});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = (values: SigninCredentails) => {
    const hash_password = hashFunction(values.password);
    console.log(hash_password);
    client
      .post<User>(APIS.SIGN_IN, {
        username: values.username,
        password: hash_password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem(
            LOCAL_STORAGE_KEYS.TOKEN_KEY,
            response.data.token
          );
          dispatch(setToken(response.data.token));
          navigate("/");
        }
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
        style={{ color: "#fff" }}
      >
        <Form.Item name="username">
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item name="password">
          <Input.Password placeholder="Password" />
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
            SIGN IN
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
}
