import React from "react";
import { useSelector } from "react-redux";
import { ChatState } from "../../context/ChatProvider";
import { getSender, getSenderFull } from "../../config/ChatLogics";
import ProfileModal from "./ProfileModal";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import { useEffect, useState } from "react";
import LoadingBox from "../LoadingBox";
import axios from "axios";
import "./SingleChat.css";
import ScrollableChat from "./ScrollableChat";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


function SingleChat({ fetchAgain, setFetchAgain }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorFetchMessage, setErrorFetchMessage] = useState(false)
  const [newMessage, setNewMessage] = useState();
  const[sendMessageError, setSendMessageError] = useState(false)
 

  //get login user details from store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //import state from context
  const { selectedChat, setSelectedChat } =
    ChatState();



  //send message function
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      
      try {
        const config = {
          "Content-Type": "application/json",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "https://us-central1-mosganda-one-7604d.cloudfunctions.net/app/api/v1/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        
        setMessages([...messages, data]);
        //set notification
        notified(selectedChat._id)
      } catch (error) {
        setSendMessageError(true) //failed to send message
      }
    }
  };

  //using button to send message
  const sendMessageWithButton = async () => {
    
      try {
        const config = {
          "Content-Type": "application/json",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "https://us-central1-mosganda-one-7604d.cloudfunctions.net/app/api/v1/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        
        
        setMessages([...messages, data]);
        //give notification
        notified(selectedChat._id)
      } catch (error) {
        setSendMessageError(true) //failed to send message
      }
  } 
  //get all the messages for a particular chat
  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        // "Content-Type": "apllication/json",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `https://us-central1-mosganda-one-7604d.cloudfunctions.net/app/api/v1/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      
    } catch (error) {
      setErrorFetchMessage(true) //Failed to load messages
      setLoading(false)
    }
  };



  //call the fetch message in a useEffect everytime selectedChat changes
  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  
  const typingHandler = (e) => {
    setNewMessage(e.target.value)
  }

  //edit chat and set notification true when there is a notification
  const notified = async (id) => {
    try {
      const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

       await axios.put("https://us-central1-mosganda-one-7604d.cloudfunctions.net/app/api/v1/chat/notification", { id }, config);
      
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      {
        selectedChat ? (
          <>
            <Typography 
              sx={{
                fontSize: { sm: "28px", md: "35px" },
                pb: 3,
                px: 2,
                width: "100%",
                display: "flex",
                justifyContent: { sm: "space-between" },
                alignItems:"center"
              }}
          >
              <IconButton
                sx={{
                  display:{ sm: "flex", md: "none"}
                }}
             
              onClick={() => setSelectedChat("")}
              >  <ArrowBackIcon /></IconButton>
              
              {!selectedChat.isGroupChat ? (
              <>
                {getSender(userInfo, selectedChat.users)}
                <ProfileModal
                  userInfo={getSenderFull(userInfo, selectedChat.users)}
                />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
            </Typography>

            <Box sx={{
              display:"flex",
            flexDirection:"column",
            justifyContent:"flex-end",
            p:3,
            bgcolor:"#E8E8E8",
            width:"100%",
              height: "100%",
            borderRadius:"10px",
              overflowY: "scroll",
           
            }}>
              {
                loading ? (<LoadingBox sx={{alignSelf:"center", margin:"auto"}}></LoadingBox>) :
                  (
                    <div className="messages">
                      <ScrollableChat messages={messages} />
                    </div>
                  )
              }
              {
            sendMessageError && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error" onClose={() => setSendMessageError(false)}>Failed to send message.</Alert>
      
    </Stack>
              }
              {
            errorFetchMessage && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error" onClose={() => setErrorFetchMessage(false)}>Failed to load messages.</Alert>
      
    </Stack>
              }
              
              <div className="messageSender">
                <input type="text" placeholder="Enter your message"
                  onChange={typingHandler}
                  value={newMessage}
                  onKeyDown={sendMessage}
                />
                <button type="button" onClick={sendMessageWithButton}>send</button>
              </div>
            </Box>
            </>
        ): (
            <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", height:"100%"}} >
          <Typography sx={{fontSize:"30px", p:3}}>
            Click on a user to start chatting.
          </Typography>
        </Box>
        )
      }
      
    </>
  );
}

export default SingleChat;
