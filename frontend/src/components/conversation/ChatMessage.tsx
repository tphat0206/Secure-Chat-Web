import Colors from "../../constants/color";
import { getFirstLetter } from "./helpers";

export default function ChatMessage({ message }: any) {
  const background = message.is_owned ? Colors.LightGrey : Colors.BlueGrotto;
  const border = message.is_owned ? "none" : "1px solid rgba(0, 0, 0, 0.1)";
  const color = message.is_owned ? "#000" : "#fff";
  const justifyContent = message.is_owned ? "end" : "start";
  const flexDirection = message.is_owned ? "row" : "row-reverse";
  const outerClass = message.is_owned
    ? "d-flex flex-row-reverse mb-4 "
    : "d-flex flex-row mb-4";

  return (
    <div
      className={outerClass}
      style={{
        gap: "20px",
        fontSize: "1rem",
        justifyContent: justifyContent,
      }}
    >
      {/* avatar image */}
      <div
        className=""
        style={{
          width: "3em",
          height: "3em",
          placeContent: "center",
          display: "grid",
          borderRadius: "50%",
          backgroundColor: Colors.NavyBlue,
          color: "white",
        }}
      >
        {getFirstLetter(message.from_member)}
      </div>

      {/* sender name and message content*/}
      <div className="d-flex flex-column" style={{ maxWidth: "70%" }}>
        {/* sender nickname */}
        <div
          className="d-flex text-wrap "
          style={{ fontSize: "0.8em", fontWeight: 500, padding: "0.1em 1em" }}
        >
          {message.from_member}
        </div>
        {/* message contents */}
        <div
          className="d-flex"
          style={{
            fontSize: "0.8em",
            fontWeight: 300,
            padding: "0.8em 1em",
            width: "fit-content",
            height: "fit-content",
            backgroundColor: background,
            borderRadius: "8px",
            color: color,
          }}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
}
