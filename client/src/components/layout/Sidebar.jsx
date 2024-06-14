import { useContext, useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import socketContext from "../../context/SocketContext";

export default function Sidebar() {
  const { conn, peerConnection } = useContext(socketContext);
  const [usersState, setUsersState] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    conn?.on("update-user-list", ({ users }) => {
      users.forEach((socketId) => {
        const isExistUser = usersState.find((id) => id === socketId);
        if (!isExistUser) {
          setUsersState((prev) => [...prev, socketId]);
        }
      });
    });

    conn?.on("remove-user", ({ socketId }) => {
      setUsersState((prev) => prev.filter((id) => id !== socketId));
    });

    conn?.on("call-from", async (data) => {
      const isConfirmed = confirm(
        `user-${data.socket} is calling you now. Do you want to answer?`
      );
      if (!isConfirmed) {
        return;
      }
      await peerConnection?.setRemoteDescription(
        new RTCSessionDescription(data.offer)
      );
      const answer = await peerConnection?.createAnswer();
      await peerConnection?.setLocalDescription(
        new RTCSessionDescription(answer)
      );
      conn?.on("answer-to", {
        answer,
        to: data.socket,
      });

      navigate(`/call/from/${data.socket}`);
    });
  }, [conn]);

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{ width: "300px", height: "100vh" }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4">Sidebar</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {usersState?.map((userSocketId, index) => (
          <li key={index} className="nav-item">
            <NavLink to={`/call/to/${userSocketId}`} className="nav-link text-white"
              style={({isActive}) => {
                return {
                  backgroundColor: isActive ? '#000' : '',
                  borderRadius: isActive ? "10px" : ''
                }
              }}>
              user-{userSocketId}
            </NavLink>
          </li>
        ))}
      </ul>
      <hr />
      <div>
        <a
          target="_blank"
          href="https://github.com/mr2079"
          className="d-flex align-items-center text-white text-decoration-none"
        >
          <img
            src="https://github.com/mr2079.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>mr2079</strong>
        </a>
      </div>
    </div>
  );
}
