import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import './Message.css';

function Message({userName, message}) {
    const isUser = userName === message.userName;
    return (
        <div className={`message ${isUser && 'message__user'}`}>
            <Card className={isUser ? 'message__userCard': 'message__guestCard'}>
                <CardContent>
                    <Typography
                        color="white"
                        variant="h5"
                        compoment="h2"
                    >
                        {message.userName}: {message.text}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Message;