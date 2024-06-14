import { useContext, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./CallPage.css";
import socketContext from "../../context/SocketContext";

export default function CallPage() {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const { type, socketId } = useParams();
  const { conn, peerConnection } = useContext(socketContext);
  const navigate = useNavigate();

  async function callTo(socketId) {
    const offer = await peerConnection.createOffer();
    await peerConnection?.setLocalDescription(new RTCSessionDescription(offer));

    conn?.emit("call-to", {
      offer,
      to: socketId,
    });
  }

  peerConnection.ontrack = ({ streams: [stream] }) => {
    remoteVideoRef.current.srcObject = stream
  }

  useEffect(() => {
    if (!socketId) navigate("/", { replace: true });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.play();

        stream.getTracks()
            .forEach(track => peerConnection.addTrack(track, stream));
      });

    if (type === "to") {
      callTo(socketId);
    }
  }, [socketId]);

  useEffect(() => {
    conn?.on("answer-from", async (data) => {
      await peerConnection?.setRemoteDescription(
        new RTCSessionDescription(data.answer)
      );
      await callTo(data.socket);
    });
  }, [conn]);

  return (
    <div className="call-container">
      <div className="local-video-container">
        <video className="local-video" ref={localVideoRef}></video>
      </div>
      <div className="remote-video-container">
        <video className="remote-video" ref={remoteVideoRef}></video>
      </div>
    </div>
  );
}
