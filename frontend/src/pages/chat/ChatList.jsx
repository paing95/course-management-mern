import { useState, useEffect, useRef } from "react";
import { API_DOMAIN } from "../../config/config";
// redux
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addChat, getChatsByRoomId, reset } from "../../features/chat/chatSlice";
// io
import { io } from "socket.io-client";
// MUI
import { 
    Box, 
    Button,
    Divider,
    Stack,
    TextField, 
    List, 
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
// components
import Spinner from '../../components/Spinner';

const ChatList = () => {

    const dispatch = useDispatch();
    const { chats, isLoading } = useSelector((state) => state.chat);
    const { id: roomId } = useParams();
    const { user } = useSelector(state => state.auth);
    // state
    const socket = useRef();
    const scrollTo = useRef();
    const [allMessages, setAllMessages] = useState([]);
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        socket.current.emit("sendMessage", {
            message: message,
            "room": roomId,
            "user": {
                _id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role
            }
        });
        dispatch(addChat({
            "user": user.id,
            "message": message,
            "chat_room": roomId
        }));
        setMessage('');
    };

    useEffect(() => {
        if (!isLoading) {
            setAllMessages(chats);
        }
    }, [chats])

    useEffect(() => {
        scrollTo.current.scrollIntoView({ behavior: "smooth" });
    }, [allMessages])

    useEffect(() => {
        // get all chats from the room first
        dispatch(getChatsByRoomId(roomId));

        socket.current = io.connect(
            API_DOMAIN, 
            // {
            //     autoConnect: false,
            //     query: {
            //         room: roomId
            //     }
            // }
        );
        // socket.current.connect();

        // join the chat room
        socket.current.emit('join', roomId);

        // to handle when new message arrives
        socket.current.on('newMessage', data => {
            console.log('new message:', data);
            setAllMessages((prev) => [...prev, data]);
        });

        return (() => {
            socket.current.disconnect();
            dispatch(reset());
        });
        
    }, [])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                bgcolor: 'background.paper',
                height: "calc(100vh - 92px)",
                padding: 0.5,
                gap: 1,
                boxShadow: 2,
                borderRadius: '10px'
            }}
        >
            {isLoading && <Spinner />}
            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    verticalAlign: "bottom",
                    overflowY: "auto",
                    // boxShadow: 2,
                    // borderRadius: '10px'
                }}
            >
                {!isLoading && allMessages.map((msg, index) => {
                    return (
                        <>
                            <ListItem 
                                key={index}
                                sx={{
                                    flexDirection: "row",
                                    justifyContent: "flex-end"
                                }}
                            >
                                <ListItemAvatar>
                                    <AccountCircleIcon fontSize="large" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        user.id === msg.user._id ? "You" :
                                        `${msg.user.first_name}  ${msg.user.last_name} (${msg.user.role})`
                                    }
                                    primaryTypographyProps={{
                                        style: {
                                            marginBottom: '0.5em'
                                        }
                                    }}
                                    secondary={msg.message}
                                    secondaryTypographyProps={{ 
                                        style: { 
                                            whiteSpace: "pre-line"
                                        }
                                    }}
                                ></ListItemText>
                            </ListItem>
                            {index != allMessages.length - 1 && <Divider />}
                        </>
                    )
                })}
                <ListItem ref={scrollTo} sx={{ display: "hidden", padding: 0 }}></ListItem>
            </List>

            <Stack
                direction="row"
                spacing={0.5}
                sx={{
                    borderRadius: '10px',
                    boxShadow: 3,
                    padding: "0.3em"
                }}
            >
                <TextField
                    sx={{
                        flexGrow: 1
                    }}
                    multiline
                    maxRows={2}
                    label="Message"
                    variant="filled"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <SendIcon 
                    sx={{
                        alignSelf: "center",
                        cursor: "pointer",
                        paddingLeft: "0.5em",
                        paddingRight: "0.5em"
                    }}
                    color="primary"
                    onClick={handleSendMessage}
                />
            </Stack>
        </Box>
    )
}

export default ChatList;