import { Link, useParams } from "react-router-dom";

import "./ChatPage.css";

export default function ChatPage() {
    const {socketId} = useParams();

    return (
        <div className="d-flex flex-column h-100vh">
            <div className="p-3 bg-dark d-flex align-items-center b-l-white">
                <button
                    onClick={() => history.back()}
                className="btn btn-sm btn-light fs-10px">back</button>
                <div className="px-4 text-white flex-grow-1">
                    <strong>{socketId}</strong>
                </div>
                <Link 
                    to={`/call/to/${socketId}`}
                className="btn btn-sm btn-light fs-10px">video call</Link>
            </div>
            <div className="flex-grow-1 bg-light"></div>
            <div className="p-3 bg-dark b-l-white d-flex align-items-start">
                <textarea className="form-control mr-1" placeholder="Type your message..."></textarea>
                <button className="btn btn-sm btn-light flex-start">send</button>
            </div>
        </div>
    )
}