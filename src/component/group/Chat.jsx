import { useEffect, useState } from "react";
import { API } from "../../external/Axios";
import { AuthToken } from "../../router/Auth";
import { formatDate } from "./File";
import { notification } from "antd";


const Message = (messageData) => {
    let message = messageData.message
    if (message.messages_from === 1) {
        return (
            <div className="chat-box my-message">
                <div className="chat-txt">
                    <h4>You <span>{formatDate(message.create_time)}</span></h4>
                    <p>{message.messages}</p>
                </div>
            </div>)
    } else {
        return (
            <div className="chat-box">
                <div className="chat-txt">
                    <h4>Ai Assistant <span>{formatDate(message.create_time)}</span></h4>
                    <p dangerouslySetInnerHTML={{ __html: message.messages.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
                </div>
            </div>)
    }
}

export const Chat = () => {
    const [message, setMessage] = useState("")
    const [historyMessage, setHistoryMessage] = useState([])
    const [apiHistoryMessage, contextHolderHistoryMessage] = notification.useNotification();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await API.get('/api/history-message', {
                    headers: {
                        Authorization: 'Bearer ' + AuthToken()
                    }
                })
                setHistoryMessage(resp.data)
            } catch (e) {
                console.log(e.response.data)
                apiHistoryMessage['error']({
                    message: 'Error',
                    description:
                        JSON.stringify(e.response.data),
                })
            }
        }

        fetchData()
    }, [])
    const lacalDate = (date) => {
        return date.getFullYear() + '-'
            + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
            + ('0' + date.getDate()).slice(-2) + ' '
            + ('0' + date.getHours()).slice(-2) + ':'
            + ('0' + date.getMinutes()).slice(-2) + ':'
            + ('0' + date.getSeconds()).slice(-2);
    }
    const sendMessage = async () => {
        let new_message = message.trim()
        if (message === "") {
            return
        }
        let messageSendTime = new Date()
        let new_messages = {
            'messages': new_message,
            'create_time': lacalDate(messageSendTime),
            'messages_from': 1
        }

        setHistoryMessage(prev => [new_messages, ...prev])
        setMessage("")
        try {
            let response = await API.post("/api/send_message", {
                "message": message
            }, {
                headers: {
                    Authorization: "Bearer " + AuthToken()
                }
            })
            setHistoryMessage(prev => [response.data, ...prev])
        } catch (e) {
            console.log(e)
            apiHistoryMessage['error']({
                message: 'Error',
                description:
                    JSON.stringify(e.response.data),
            })

        }
    }


    return (
        <div className="chat-section">
            <div className="chat-header">
                <div className="user-header"><br /><br />
                    <h2>Ai Assistant</h2>
                </div>
            </div>
            <div className="all-chat" style={{ overflow: "auto", display: "flex", flexDirection: "column-reverse" }}>
                {contextHolderHistoryMessage}
                {historyMessage.map((message, index) => (
                    <Message message={message} key={index} />
                ))
                }
            </div>

            <div className="chat-type">
                <div className="message-type" >
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter Message..." />
                    <button type="submit" onClick={sendMessage}><img src={window.location.origin + "/images/icon-send.png"} alt="" className="send-icon" /></button>
                </div>
            </div>

        </div>
    );
}