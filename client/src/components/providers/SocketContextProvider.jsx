import { useEffect, useMemo, useState } from "react";
import SocketContext from "../../context/SocketContext";
import { connect } from "socket.io-client";

export default function SocketContextProvider({ children }) {
  const [conn, setConn] = useState(undefined);
  const peerConnection = useMemo(() => new RTCPeerConnection(), []);

  useEffect(() => {
    if (!conn) {
      const connection = connect("http://localhost:5000");
      setConn(connection);
    }
  }, []);

  return (
    <SocketContext.Provider value={{ conn, peerConnection }}>
      {children}
    </SocketContext.Provider>
  );
}
