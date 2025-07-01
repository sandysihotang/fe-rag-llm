import { Button, Card, Form, Input, Modal, Switch, Upload, message, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { AuthToken, UseAuth } from '../../../router/Auth';
import { API } from '../../../external/Axios';
import TextArea from 'antd/es/input/TextArea';



const TabList = [
    {
        key: "file_processing",
        tab: "File Processing"
    },
    {
        key: "scrape",
        tab: "Scrape URL / Input"
    }
]


const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const FormFile = ({ setLoadData, modalClose, notif }) => {
    const [file, setFile] = useState(null)
    const [api, contextHolder] = notification.useNotification();
    const { logout } = UseAuth()

    const beforeUpload = (filedata) => {
        if (filedata.type !== 'application/pdf') {
            message.error('You can only upload JPG/PNG file!');
            return
        }
        setFile(filedata)
        return false
    }

    const handleUpload = async () => {
        if (file === null) {
            api['error']({
                message: 'Error',
                description:
                    'File not choosen, Please select file',
            })
            return
        }
        const data = new FormData()
        data.append('file', file)
        let config = {
            "headers": {
                "content-type": 'multipart/form-data;',
                "Authorization": 'Bearer ' + AuthToken()
            }
        }
        try {
            await API.post('/api/upload', data, config)
            notif['success']({
                message: 'Success',
                description:
                    'Success Upload File',
            })
            setLoadData((prev) => {
                return !prev
            })
            setFile(null)
            modalClose(false)
        } catch (e) {
            console.log(e)
            api['error']({
                message: 'Error',
                description:
                    JSON.stringify(e.response.data),
            })
            if (e.status == 400) {
                logout()
            }
        }
    }
    return (
        <>
            {contextHolder}
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600, backgroundColor: 'white' }}
                initialValues={{ remember: true }}
                layout='horizontal'
                autoComplete="off">
                <Form.Item label="Upload File" rules={[{ required: true, message: 'Please input your File!' }]}>
                    <Upload multiple={false}
                        onRemove={(filedata) => setFile(filedata)}
                        beforeUpload={beforeUpload}
                    >
                        <Button icon={<UploadOutlined />}> Select File</Button>
                    </Upload>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" onClick={handleUpload}>
                        Submit
                    </Button>
                </Form.Item>
            </Form >
        </>
    )
}
const Scraping = ({ setLoadData, modalClose, notif }) => {
    const [isScraping, setIsScraping] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [notifProcessSource, contextHolderProcessSource] = notification.useNotification();
    const ScrapeUI = () => {
        const [url, setUrl] = useState("")
        let [api, contextHolder] = notification.useNotification();
        const getData = async () => {
            if (url === "") {
                api['error']({
                    message: 'URL must be filled'
                })
                return
            }
            try {
                let response = await API.post("/api/scraping", {
                    'url': url
                }, {
                    headers: {
                        Authorization: "Bearer " + AuthToken()
                    }
                })
                setTitle(url)
                setContent(response.data.data)
            } catch (e) {
                console.log(e)
                api['error']({
                    description:
                        JSON.stringify(e.response.data),
                })
                if (e.status == 400) {
                    logout()
                }
            }
        }

        if (isScraping) {
            return (<>
                {contextHolder}
                <Form.Item label="URL">
                    <Input value={url} onChange={(e) => setUrl(e.target.value)} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" onClick={getData}>
                        Get Data
                    </Button>
                </Form.Item>
            </>)
        }
        return <></>
    }
    const processData = async () => {
        if (title === "" || content === "") {
            notifProcessSource['error']({
                message: 'Title and Content must be filled'
            })
            return
        }
        try {
            await API.post('/api/process-data', {
                'title': title,
                'content': content
            }, {
                headers: {
                    Authorization: 'Bearer ' + AuthToken()
                }
            })
            setLoadData(true)
            modalClose(false)
            notif['success']({
                message: 'Source',
                description: "Success processing sources"
            })
        } catch (e) {
            console.log(e)
            notifProcessSource['error']({
                message: 'Error',
                description:
                    JSON.stringify(e.response.data),
            })
            if (e.status == 400) {
                logout()
            }
        }
    }
    return (
        <>
            {contextHolderProcessSource}
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 900, backgroundColor: 'white' }}
                initialValues={{ remember: true }}
                layout='horizontal'
                autoComplete="off">
                <Form.Item label="Scrape Data">
                    <Switch value={isScraping} onChange={() => setIsScraping(prev => !prev)} />
                </Form.Item>
                <ScrapeUI />
                <Form.Item label="Title">
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Item>
                <Form.Item label="Content">
                    <TextArea value={content} onChange={(e) => setContent(e.target.value)} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" onClick={processData}>
                        Submit Data
                    </Button>
                </Form.Item>
            </Form >
        </>
    );
}

const contentList = {
    'file_processing': (funLoadData, funModalClose, notifSucces) => <FormFile setLoadData={funLoadData} modalClose={funModalClose} notif={notifSucces} />,
    'scrape': (funLoadData, funModalClose, notifSucces) => <Scraping setLoadData={funLoadData} modalClose={funModalClose} notif={notifSucces} />
}
export const FileProcessing = ({ isOpen, onClose, processingFile, notifsuccess }) => {
    const [activeTab, setActiveTab] = useState('file_processing')
    if (!isOpen) return null; // Don't render if not open

    return (
        <Modal title="Source Processing" centered
            width={{
                xs: '90%',
                sm: '80%',
                md: '70%',
                lg: '60%',
                xl: '50%',
                xxl: '40%',
            }}
            open={isOpen} onCancel={onClose} footer={[
                <Button key="Back" onClick={onClose}>Back</Button>
            ]} >
            <Card
                style={{ width: '100%' }}
                tabList={TabList}
                activeTabKey={activeTab}
                onTabChange={(key) => setActiveTab(key)}
            >
                {contentList[activeTab](processingFile, onClose, notifsuccess)}
            </Card>
        </Modal >
    );
};

