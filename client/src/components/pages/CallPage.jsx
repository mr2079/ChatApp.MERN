import { useEffect, useRef } from "react"

export default function CallPage() {
    const localVideoRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                localVideoRef.current.srcObject = stream;
                localVideoRef.current.play();
            })
    }, [])

    return (
        <>
            <video ref={localVideoRef}></video>
        </>
    )
}