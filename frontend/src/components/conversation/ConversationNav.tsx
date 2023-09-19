import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { toDisplayDate } from "./helpers";

export default function ConversationNav({ conversation }: any) {
  return (
    <li key={conversation.conversation_uuid} className="w-100 nav-item m-1">
      <NavLink
        to={`conversation/${conversation.conversation_uuid}`}
        className="nav-link w-100"
      >
        <Col className="w-100">
          <Row className="w-100">
            <h5>{conversation.name}</h5>
          </Row>
          {conversation.content != "" && (
            <Row className="w-100  overflow-hidden">
              <Col className="overflow-hidden">
                {conversation.is_message_owner ? (
                  <p className="overflow-hidden" style={{width: "max-content"}}>
                    {`You: ${conversation.content}`}
                  </p>
                ) : (
                  <p className="overflow-hidden" style={{width: "max-content"}}>
                   {conversation.from_member_name}: {conversation.content}
                  </p>
                )}
              </Col>

              <Col>
                <p> {" - " + toDisplayDate(conversation.created_at)}</p>
              </Col>
            </Row>
          )}
        </Col>
      </NavLink>
    </li>
  );
}
