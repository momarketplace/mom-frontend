import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSoldProducts } from '../actions/productActions';
import { createWithdraw } from '../actions/withdrawActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { CREATE_WITHDRAW_RESET } from '../constants/withdrawConstants';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './SoldProducts.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { ChatState } from '../context/ChatProvider';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function SoldProducts() {

    const [ accountName, setAccountName ] = useState('')
    const [accountNumber, setAccountNumber ] = useState(0)
    const [ bank, setBank ] = useState('')
    const [ amount, setAmount ] = useState(0)
    const [ email, setEmail ] = useState('')
  const [phone, setPhone] = useState('')
  const [productId, setProductId] = useState('')
  const [amountToPay, setAmountToPay] = useState(0)
  const [serviceCharge, setServiceCharge] = useState(0)
  const [deliveryCost, setDeliveryCost ] = useState(0)

  //for send message
  const [createChatLoading, setCreateChatLoading] = useState(false)
  const [errorCreateChat, setErrorCreateChat] = useState(false)
  const [successCreateChat, setSuccessCreateChat] = useState(false)
  
//console.log(productId)

   
  //get login user details from store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //console.log(userInfo)
   //import state from context
   const {setSelectedChat, chats, setChats } =
   ChatState();
 

  //get sold products from redux store
  const productSold = useSelector((state) => state.productSold);
  const { loading, error, soldProducts } = productSold
  //console.log(soldProducts);

  //get widthdrawal from redux store
  const withdrawal = useSelector((state) => state.withdrawal);
  const { loading: loadDraw, error: errorDraw, success } = withdrawal

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

const dispatch = useDispatch();


useEffect(() =>{
    dispatch(getSoldProducts())
},[dispatch])


//useEffect to set varaibles for bank account details
useEffect(() =>{
  if(userInfo){
    setAccountName(userInfo.accountName);
    setAccountNumber(userInfo.accountNumber);
    setBank(userInfo.bank)
  }
},[])


  const handleWithdraw = () => {
      dispatch(createWithdraw(accountName, accountNumber, bank, amount, deliveryCost, email, phone, productId));
      dispatch({type: CREATE_WITHDRAW_RESET})
  }

  if (success) {
    updateWithdrawRequest()
    setTimeout(() => {
      window.location='/soldproducts'
    },4000)
  }

  //we want to prevent the user from sending multiple request for one product
  async function updateWithdrawRequest(){
    try {
      const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    }
     await axios.put("https://us-central1-mosganda-one-7604d.cloudfunctions.net/app/api/v1/product/hassentwithdrawrequest", { productId }, config);
    } catch (error) {
      console.log(error)
    }

  }


  //function to create chat between seller and buyer
  //handle chat
  const handleChat = async (userId) => {
    if (!userInfo) {
      window.location = "/login"
      return
    } else {
      try {
     setCreateChatLoading(true)
     const config = {
         headers: {
           "Content-type":"application/json",
           Authorization: `Bearer ${userInfo.token}`
         },
       };
     const { data } = await axios.post('https://us-central1-mosganda-one-7604d.cloudfunctions.net/app/api/v1/chat', { userId }, config);
     if(!chats.find((c) => c._id === data._id)) setChats([data, ...chats])
     setCreateChatLoading(false)
     setSuccessCreateChat(true)
        setSelectedChat(data)
        
   } catch (error) {
    setErrorCreateChat(error.message)
   }
    }
   
  }

  if (successCreateChat) {
    window.location = "/chats"
    setTimeout(() => {
      setSuccessCreateChat(false)
    },3000)
  }
 
    return (
      <div style={{width:"100%",maxWidth:"100%", backgroundColor:"white"}}>
        
          <h3 className='sold-item-header'>Sold Items and Withdrawal</h3>
          <div className='withdrawal-information'>
            
              <h4>Withdrawal steps</h4>
            <p>
            <ul>
              <li>Get the buyer information from the item displayed in this page.</li>
                <li>Get the item/product delivered to the buyer.</li>
                <li>Click on the "Withdraw" button, confirm your account details in the popup that appears, and click submit.</li>
              <li>Get paid within 12 hours.</li>
             </ul>
            </p>
            <p className='withdrawal-notice'>Note that within this 12 hours, we are going to confirm if the buyer has received the item. So make sure you have successfully sent the item before clicking on "Withdraw" button.</p>
            <p className='withdrawal-notice'>Also note that we will deduct our 3% charge from the selling price. For example, if you sell an item that cost #1000, our 3% charge is #30. So you will receive #970. If the amount you charge for the delivery of the item is #300 for example. Then, what you will receive is #970 + #300, which is #1,270</p>
            </div>
          
              
            <h3 style={{ textAlign: "center" }}>Sold Items</h3>
         
          
        <div>
          
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
                <h3 style={{textAlign:"center"}}>Withdrawal Form</h3>
              </Typography>
              {/* <Box sx={{fontSize:'15px'}}>
                You will recieve #{amountToPay - serviceCharge}
              </Box> */}
              <p>You will recieve #{amountToPay - serviceCharge}</p>

              {
                userInfo && userInfo.accountName || userInfo.accountNumber?
                <>
                <form>
                <Box sx={{mt: 3}}>
                  <label htmlFor='accountName'>Account Name</label>
                  <input style={{marginLeft:"3px"}} type="text" id="accountName" placeholder='Account Name' required
                  value ={userInfo? userInfo.accountName:""}
                    // onChange ={() =>setAccountName(userInfo && userInfo.accountName)}
                  />
                </Box>
                <Box sx={{mt:2}}>
                  <label htmlFor='accountNumber'>Account Number</label>
                  <input style={{marginLeft:"3px"}} type="text" id="accountNumber" placeholder='Account Number' required
                    value ={userInfo? userInfo.accountNumber:""}
                    // onChange ={() =>setAccountName(userInfo && userInfo.accountNumber)}
                  />
                </Box>
                <Box sx={{mt:2}}>
                  <label htmlFor='bank'>Bank</label>
                  <input style={{marginLeft:"3px"}} type="text" id="bank" placeholder='Bank Name' required
                    value ={userInfo? userInfo.bank:""}
                    // onChange ={() =>setAccountName(userInfo && userInfo.bank)}
                  />
                </Box>
                {
                  loadDraw && <LoadingBox></LoadingBox>
                }
                {
                  errorDraw && <MessageBox variant="danger">Failed</MessageBox>
                }
                {
                  success && <MessageBox variant="success">Recieved</MessageBox>
                }
                <Button sx={{textAlign:"center",m:2}} onClick ={handleWithdraw} variant="contained" color="success">Submit</Button>
              </form>
                </>:
                (<p>You have not added a bank account. Go to <Link to="/userstore">your store</Link>, click on the <strong>Add bank account</strong> button, to add account.</p>)
              }
              
          <Button sx={{textAlign:"center",m:2}} onClick ={handleClose} variant="contained" color="error">Close</Button>
        </Box>
      </Modal>
        </div>

        <div className='row center'>
          {
            soldProducts && soldProducts.length === 0 ? (<p style={{ backgroundColor: "#f5f5f5", textAlign: "center", height: "50px", padding: "20px" }}>There are no sold items at the moment.</p>)
              : ""
          }

          {
          loading && <LoadingBox></LoadingBox>
          }
          {
          error && <MessageBox variant="danger">Error</MessageBox>
          }
          
          {
            soldProducts?.map((product) => (
              <div className='card soldpro' key={product._id}>
                <div style={{padding:"5px", maxWidth:"90%"}}>
                  <div>
                    <h5 style={{textAlign:"center"}}>Product Information</h5>
                    <p className='soldproduct-item'>Id: {product._id}</p>
                    <p className='soldproduct-item' style={{display:"flex"}}><img
                        className="small"
                        src={product.image}
                        alt={product.name}
                /><Button sx={{m:1}} variant="contained" size="small"
                         >
                         <Link to = {`/product/${product._id}`} style={{color:"white"}}>view product</Link>
                      </Button>
                     
                      </p>
                      <Button variant="contained" color="secondary" size="small" sx={{margin:"2px"}} onClick={() => {
                                         
                                         handleChat(product.buyerId)
                                    }}>
                                    Send Message
                                  </Button>
                      {
                          createChatLoading && <LoadingBox></LoadingBox>
                          }
                          {
                            errorCreateChat &&
                            <MessageBox variant="danger">Error</MessageBox>
                          }
                    <p className='soldproduct-item'>
                      <span style={{marginRight:"5px"}}>Name: <strong>{product.name}</strong></span>
                    </p>
                    <p className='soldproduct-item' style={{display:"flex"}}>
                      <span>Price: #<strong>{product.price}</strong>,</span> { " " }
                      <span style={{marginLeft:"5px"}}>Delivery: #<strong>{product.deliveryCost}</strong></span>
                    </p>
                  </div>
                  <div>
                    <h5 style={{textAlign:"center"}}>Buyer Information</h5>
                    <p className='soldproduct-item'>Name: <b>{product.buyerName}</b></p>
                    <p className='soldproduct-item'>Phone: <b>{product.buyerPhone}</b> </p>
                    <p className='soldproduct-item'>Address: <strong>{product.buyerAddress}</strong></p>
                  </div>
                  <div>
                    <h5 style={{textAlign:"center"}}>Product Status</h5>
                    <p className='soldproduct-item'>Payment: {product.isPaid ? "Paid at" : "No"}  { product.isPaid
                              ? product.isPaidAt.substring(0, 10)
                      : ""}</p>
                    <p className='soldproduct-item'>Delivery: {product.isDelivererd ? "Delivered at" : "No"}  { product.isDelivererd
                              ? product.isDeliveredAt.substring(0, 10)
                      : ""} </p>
                    <p className='soldproduct-item'>Paid by Mosganda: {product.isSettled ? "Paid at" :product.hasSentWithdrawRequest?"pending": "No"}  { product.isSettled
                              ? product.isSettledAt.substring(0, 10)
                        : ""} </p>
                  </div>
                  <div>
                    {
                !product.isSettled &&
                 <Button sx={{ m: 2 }} variant="contained" size="small" color="success" onClick={() => {
                  setAmount(product.price)
                  setServiceCharge(product.price * 0.03)
                  setDeliveryCost(product.deliveryCost)
                  setAmountToPay(product.price + product.deliveryCost) 
                  setProductId(product._id)
                  setEmail(userInfo.email)
                  setPhone(userInfo.phone)
                  handleOpen()
                }} disabled={product.hasSentWithdrawRequest}>Withdraw</Button>
               }
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        
      </div>
    );
}

export default SoldProducts
