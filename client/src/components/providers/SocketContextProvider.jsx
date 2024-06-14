import { useEffect, useState } from "react";
import SocketContext from "../../context/SocketContext";
import { connect } from "socket.io-client";

export default function SocketContextProvider({ children }) {
  const [conn, setConn] = useState(undefined);

  useEffect(() => {
    if (!conn) {
      const connection = connect("http://localhost:5000");
      setConn(connection);
    }
  }, []);

  return (
    <SocketContext.Provider value={{ conn }}>{children}</SocketContext.Provider>
  );
}
