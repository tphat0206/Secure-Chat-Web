import { Col, Navbar as NB, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import SignUpForm from "../components/auth/SignUpForm";
import Colors from "../constants/color";

export default function SignUpPage() {
    return (
        <div
            className="px-5 vh-100"
            style={{ backgroundColor: Colors.DarkBlue }}
        >
            <Row className="mx-5 h-100 w-100 align-items-center">
                <Col className="d-none d-lg-block col-lg-6">
                    <Image src="signup.jpeg" className="w-100 m-5" />
                </Col>
                <Col className="d-flex flex-column align-items-center justify-content-center text-center">
                    <div
                        style={{
                            width: 400,
                            color: Colors.BabyBlue,
                            borderRadius: 20,
                            border: "2px solid",
                        }}
                    >
                        <div className="items-center my-5">
                            <NB.Brand className="h-100" href="/">
                                <img src="logo2.svg" className="h-100"></img>
                            </NB.Brand>
                        </div>
                        <h1 className="text-3xl mb-4">SIGN UP</h1>
                        <div className="flex flex-row">
                            <p>
                                Already had an account ?{" "}
                                <a href="/signin">Sign In</a>
                            </p>
                        </div>
                        <SignUpForm />
                    </div>
                </Col>
            </Row>
        </div>
    );
}
