import { useEffect, useState } from "react"
import { AuthToken } from "../../router/Auth"
import { API } from "../../external/Axios"
import { format } from "date-fns";
import { FileProcessing } from "./process-source/FileProcessing";
import { notification } from "antd";





export const formatDate = (datestr) => {
    // const dateObject = parseISO(datestr); // Convert string to Date object
    return format(datestr, "MMMM do, yyyy H:mma"); // Format to desired string
}




export const FileProcess = () => {
    const [dataSource, setDataSource] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [isNewFileProcess, setIsNewFileProcess] = useState(false)
    const handleOpenModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)
    const [apiFileProcess, contextHolderFileProcess] = notification.useNotification();

    const fetchData = async () => {
        try {
            const response = await API.get('/api/source', {
                headers: {
                    Authorization: 'Bearer ' + AuthToken()
                }
            })
            setDataSource(response.data)
        } catch (e) {
            console.log(e)
            apiFileProcess['error']({
                message: 'File',
                description:
                    JSON.stringify(e.response),
            })
        }

    }
    const [api, contextHolder] = notification.useNotification();
    useEffect(() => {
        fetchData()
    }, [isNewFileProcess])

    return (
        <>{contextHolder}{contextHolderFileProcess}
            <div className="chat-section">
                <div className="chat-header">
                    <div className="user-header"><br /><br />
                        <h2>Data Resources</h2>
                    </div>
                    <img src={window.location.origin + "/images/icon-threedot.png"} alt="" onClick={handleOpenModal} className="threedot" />
                    <FileProcessing isOpen={showModal} onClose={closeModal} processingFile={setIsNewFileProcess} notifsuccess={api}></FileProcessing>
                </div>
                <div className="all-chat">
                    {dataSource.map((value, index) => (
                        <div className="chat-box" key={index} style={{ width: "100%" }}>
                            <div className="chat-txt">
                                <h4>{value.status === 1 ? "Processing" : "Success"} <span>{formatDate(value.create_time)}</span></h4>
                                <p>{value.original_file_name}</p>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </>
    )
}


