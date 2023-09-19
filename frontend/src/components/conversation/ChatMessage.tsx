import Colors from "../../constants/color";
import { getFirstLetter } from "./helpers";

export default function ChatMessage({ message }: any) {
    const background = message.is_owned ? Colors.LightGrey : Colors.BlueGrotto;
    const color = message.is_owned ? "#000" : "#fff";
    const justifyContent = message.is_owned ? "end" : "start";
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
            <div className="d-flex flex-column" style={{ maxWidth: "70%" }}>
                <p className="d-flex m-0 text-wrap text-bold">
                    {message.from_member}
                </p>
                <div
                    className="w-100 d-flex p-3"
                    style={{
                        backgroundColor: background,
                        borderRadius: "8px",
                        color: color,
                    }}
                >
                    <p className="m-0" style={{ overflowWrap: "anywhere" }}>
                        {message.content}
                    </p>
                </div>
            </div>
        </div>
    );
}
