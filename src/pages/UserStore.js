import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { editPostedProduct, getUserProducts, unPostedProduct } from "../actions/productActions";
import {
  editPostedStore,
  getUserStore,
  unPostedStore,
} from "../actions/storeActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Button from "@mui/material/Button";
//import { useHistory } from 'react-router-dom'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import FlightOutlinedIcon from '@mui/icons-material/FlightOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import axios from "axios"
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';


import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { updateUserCreateStore } from "../actions/userActions";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function UserStore() {
  const [copyStoreLink, setCopyStoreLink] = useState('');
  //get login user details from store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  //console.log(userInfo);

  //const history = useHistory()
  if (!userInfo.isSeller) {
      window.location = '/'
    
  }
  //get userstore from redux store
  const userStoreDetails = useSelector((state) => state.userStoreDetails);
  const { loading, error, userStore } = userStoreDetails;
 //console.log(userStore)

  //get user products from redux store
  const userproducts = useSelector((state) => state.userproducts);
  const {
    loading: loadingProduct,
    error: errorProduct,
    userProducts,
  } = userproducts;
  //console.log(userProducts);

  const dispatch = useDispatch();
  useEffect(() => {
        dispatch(getUserStore());
        dispatch(getUserProducts());
  }, [dispatch]);

  //console.log(userStore)
  
  //get editPost from redux store
  const postedStore = useSelector((state) => state.postedStore);
  const {
    loading: loadingPost,
    error: errorPost,
    success: successPost,
  } = postedStore;

  //Post store
  const handlePost = () => {
    dispatch(editPostedStore({ id: userStore._id }));
  };

  //refresh to update success post
  if (successPost) {
    setTimeout(() => {
      window.location='/userstore'
    }, 2000);
  }

  //get unpost store from redux
  const unpostStore = useSelector((state) => state.unpostStore);
  const {
    loading: loadingUnpost,
    error: errorUnpost,
    success: successUnpost,
  } = unpostStore;

  const handleUnpost = () => {
    dispatch(unPostedStore({ id: userStore._id }));
  };

  //reload window to clear the message after 2 seconds
  if (successUnpost) {
    setTimeout(() => {
      window.location = "/userstore";
    }, 2000);
  }

  if (errorPost) {
    setTimeout(() => {
      window.location = "/userstore";
    }, 3000);
  }
  if (errorUnpost) {
    setTimeout(() => {
      window.location = "/userstore";
    }, 3000);
  }

  //get posted product from redux store
  const postedProduct = useSelector((state) => state.postedProduct);
  const {
    loading: loadPostProduct,
    error: errorPostProduct,
    success: successPostProduct,
  } = postedProduct;

  //reload products to clear the message and refresh the button
  if (successPostProduct) {
    setTimeout(() => {
      window.location ="/userstore"
    }, 2000);
  }
  //get unpost product from redux store
  const unpostProduct = useSelector((state) => state.unpostProduct);
  const {
    loading: loadingUnpostProduct,
    error: errorUnpostProduct,
    success: sucessUnpostProduct,
  } = unpostProduct;

  //reload products to clear the message and refresh the button
  if (sucessUnpostProduct) {
    setTimeout(() => {
      window.location ="/userstore"
    }, 2000);
  }

  

  //copy store link
  const copyLink = async url => {
    try {
      await navigator.clipboard.writeText(url);
      setCopyStoreLink('Copied!');
    } catch (err) {
      setCopyStoreLink('Failed to copy!');
    }
  };

  //edit product when store is lock
  const handleLockProducts = () => {
    return userProducts.map((x) => {
      return dispatch(unPostedProduct({ id: x._id }))
    })
  }

  

//modal to close store
  const [open, setOpen] = React.useState(false);
  const [toBeOpened, setToBeOpened] = useState('')
  const [loadCloseStore, setLoadCloseStore] = useState(false)
  const [errorCloseStore, setErrorCloseStore] = useState(false)
  const [successCloseStore, setSuccessCloseStore] = useState(false)
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  const handleCloseStore = async (e) => {
    e.preventDefault()
    try {
      setLoadCloseStore(true)
      const { data } = await axios.put(`https://us-central1-mosganda-one-7604d.cloudfunctions.net/app/api/v1/store/closestore`, {toBeOpened}, {
        headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
      })
      setLoadCloseStore(false)
      setSuccessCloseStore(true)

      //call handleLock products function
      handleLockProducts()

    } catch (error) {
      setErrorCloseStore(true)
      setLoadCloseStore(false)
    }
  }

  //open store for business activities
  const [loadOpenStore, setLoadOpenStore] = useState(false)
  const [errorOpenStore, setErrorOpenStore] = useState(false)
  const [successOpenStore, setSuccessOpenStore] = useState(false)

  const handleOpenStore = async () => {
   
    try {
      setLoadOpenStore(true);
       await axios.put(`https://us-central1-mosganda-one-7604d.cloudfunctions.net/app/api/v1/store/openstore`,{id:userStore._id}, {
        headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
      })
      setLoadOpenStore(false)
      setSuccessOpenStore(true)
      
    } catch (error) {

      setErrorOpenStore(true)
      setLoadOpenStore(false)
    }
  }

  if (successOpenStore) {
    setTimeout(() => {
      window.location ="/userstore"
    }, 2000);
  }


// for adding and editing bank details
  useEffect(() =>{
    if(userInfo && userInfo.accountNumber !== ""){
      setAccountNumber(userInfo.accountNumber)
      setAccountName(userInfo.accountName)
      setBank(userInfo.bank)
      setAccountPin(userInfo.accountPin)
    }

  },[])

  //modal to add bank account
  const [openAccountModal, setOpenAccountModal] = React.useState(false);
  const [accountName, setAccountName] = useState('')
  const [accountNumber, setAccountNumber] = useState(0)
  const [bank, setBank] = useState('')
  const [accountPin, setAccountPin] = useState(0)
  const [loadBank, setLoadBank] = useState(false)
  const [errorLoadBank, setErrorLoadBank] = useState(false)
  const [successLoadBank, setSuccessLoadBank] = useState(false)
  const [pinLessMessage, setPinLessMessage] = useState(false)
  const [pinMoreMessage, setPinMoreMessage] = useState(false)
  //const [newAccountDetails, setNewAccountDetails] =useState()
  
  const handleAddAccount = () => setOpenAccountModal(true);
  const handleCloseAddAccount = () => setOpenAccountModal(false);


  //function to add bank details
  const handleBankModal = async (e) => {
    e.preventDefault()
    if(accountPin.length < 4){
      setPinLessMessage(true)
      return
    }
    if(accountPin.length > 6){
      setPinMoreMessage(true)
      return
    }
    try {
      setLoadBank(true)
      await axios.put(`https://us-central1-mosganda-one-7604d.cloudfunctions.net/app/api/v1/user/bankaccount`, {id:userInfo._id, accountName,accountNumber, bank, accountPin}, {
        headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
      })
      setLoadBank(false)
      setSuccessLoadBank(true)
  

    } catch (error) {
      setErrorLoadBank(true)
      setLoadBank(false)
    }
  }

  

  //function to edit bank account
  
  const [editAccountModal, setEditAccountModal] = React.useState(false);
  const handleEditAccount = () => setEditAccountModal(true);
  const handleCloseEditAccount = () => setEditAccountModal(false);

  const handleEditBankModal = async (e) => {
    e.preventDefault()
    if(accountPin.length < 4){
      setPinLessMessage(true)
      return
    }
    if(accountPin.length > 6){
      setPinMoreMessage(true)
      return
    }
    try {
      setLoadBank(true)
      await axios.put(`https://us-central1-mosganda-one-7604d.cloudfunctions.net/app/api/v1/user/editaccount`, {id:userInfo._id, accountName,accountNumber, bank, accountPin}, {
        headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
      })
      setLoadBank(false)
      setSuccessLoadBank(true)
      setAccountName("")
      setAccountNumber('')
      setBank("")

    } catch (error) {
      setErrorLoadBank(true)
      setLoadBank(false)
    }
  }


  if (successLoadBank) {
    //update user
    dispatch(
      updateUserCreateStore({
        user: userInfo._id,
        accountName,
        accountNumber,
        bank,
        accountPin
      })
    );
  }

  setTimeout(() =>{
    if(successLoadBank){
      window.location = '/userstore'
    }
  },2000)

  


  return (
        
          <div>
            

      {
        userStore && userStore.isClosed === true ?
        (<div className='close-store'>
          <h2 style={{color:"white"}}>Business Activities Closed.</h2>
          <p style={{color:"white"}}>To be opened: </p>
            <h3 style={{color:"yellow"}}>{ userStore && userStore.toBeOpened }</h3>
            <button onClick={handleOpenStore}>Open</button>
            {
              loadOpenStore && <LoadingBox></LoadingBox>
            }
            
            {
              successOpenStore && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="success" onClose={() => setSuccessOpenStore(false)}>Store opened successfully.</Alert>
      
            </Stack>
            }
            {
              errorOpenStore && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="error" onClose={() => setErrorOpenStore(false)}>Failed to open store.</Alert>
      
            </Stack>
            }
          </div>) :
          (
            <div>
            <div className="row around userstore-header-container">
        <div className="userstore-header">
          <h4 className="userstore-header-item userstore-header-spacing">
            <Link to="/stores">
              <Button variant="contained" color="success" size="small" onClick={handleOpenStore}>
                Stores
              </Button>
            </Link>
          </h4>
          <h4 className="userstore-header-item userstore-header-spacing">
            <Link to="/guide">
              <Button variant="contained" color="success" size="small">
                Guide
              </Button>
            </Link>
          </h4>
          <h4 className="userstore-header-spacing">
            <Link to="/">
              <Button variant="contained" color="success" size="small">
                Products
              </Button>
            </Link>
          </h4>
          <h4 className="userstore-header-item userstore-header-spacing">
            <Link to="/orderhistory">
              <Button variant="contained" color="success" size="small">
                my Orders
              </Button>
            </Link>
          </h4>
          <h4 className="userstore-header-item userstore-header-spacing">
            <Link to="/orderedproducts">
              <Button variant="contained" color="success" size="small">
                CustomerOrders
              </Button>
            </Link>
          </h4>
           <h4 className="userstore-header-spacing">
            <Link to="/soldproducts">
              <Button variant="contained" color="success" size="small">
                Sold Items
              </Button>
            </Link>
          </h4>
          <h4 className="userstore-header-spacing">
            <Link to="/findwidthdrawals">
              <Button variant="contained" color="success" size="small">
                Withdraws
              </Button>
            </Link>
          </h4>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">Error. please, try again later.</MessageBox>}
        <div className="userstore-header-spacing">
          <Button variant="contained" color="error" size="small" onClick={handleOpen}>
                lock store
              </Button>
        </div>
        <div>
          <h4>
            <p>Store link: <span style={{backgroundColor:"#011628", color:"yellow", padding:"5px", borderRadius:"5px"}}>https://www.mosganda.com/{userStore && userStore.businessName }</span></p> {" "}
            <Button variant="outlined" onClick={() => copyLink(`localhost:3000/${userStore.businessName}`)}>
              Copy Link
              <ContentCopyIcon />
     </Button>
  
  {copyStoreLink}
          </h4>
        </div>
      </div>
      <div className="row top bottom">
        <div className="col-1">
          <div className="profile-card">
            <div>
              
                <h3 className="profile-header">
                  <span className="name-description">Seller Name:</span>{" "}
                  {userInfo.name}
                        </h3>  
                                    
             
              <div>
                        <div className="row around">
                          <div>
                             <img
                  className="profile-img"
                  src= {userInfo.image}
                  alt="profile"
                /> 
                          </div>
                  <div className="contact">
                    <p>
                      <span>
                        <PhoneIcon />
                      </span>{" "}
                      {userStore && userStore.creatorPhone}
                    </p>
                    <p>
                      <span>
                        <EmailIcon />
                      </span>
                      {userStore && userStore.creatorEmail}
                    </p>
                  </div>
                </div>
                
              </div>
            </div>
            <div>
              <Link to="/profile">
                 <button className="profile-button">Edit profile</button> 
               
              </Link>
            </div>
          </div>
        </div>
        <div className="col-2">
          <div className="row around">
            <div className="store-image">
              <h3 className="store-name">
                <span className="name-description"> Store Name:</span>{" "}
                <strong>{userStore && userStore.name}</strong>{" "}
              </h3>
              <img
                className="img large"
                src={userStore && userStore.image}
                alt="store"
              />
            </div>
            <div className="description">
              <h3>Store Details</h3>
              <p>
                Business Address:{" "}
                <strong>{userStore && userStore.address}</strong>
              </p>
              <p>
                City/Town: <strong>{userStore && userStore.city}</strong>
              </p>
              <p>
                State: <strong>{userStore && userStore.state}</strong>
              </p>
              <p>
                Country: <strong>{userStore && userStore.country}</strong>
              </p>
              <p>
                Description:{" "}
                <strong>{userStore && userStore.description}</strong>
              </p>
              <p>
                 Delivery: <strong style={{color:"red"}}>{userStore && userStore.deliveryCapacity === "Within-the-same-city" ?
                   `Only within ${userStore && userStore.city}` : userStore && userStore.deliveryCapacity === "Within-the-same-state" ?
                  `Only within ${userStore && userStore.state}`: `Across ${userStore && userStore.country}`}
                  </strong>
              </p>
              <div className="store-utils">
                <p>
                  <Link to="/editstore">
                    <Button variant="contained" color="secondary" size="small">
                      <ModeEditOutlineOutlinedIcon />
                      Edit
                    </Button>
                  </Link>
                </p>

                <p>
                  {userStore && userStore.isPosted ? (
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={handleUnpost}
                    >
                    
                      Unpost
                      <UndoIcon />
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={handlePost}
                      >
                        <FlightOutlinedIcon />
                      Post
                    </Button>
                  )}
                </p>
              </div>
              <div>
                {loadingPost && <LoadingBox></LoadingBox>}
                {errorPost && (
                  <MessageBox variant="danger">Failed to post store. Check your network and try again.</MessageBox>
                )}
                
                {successPost && (
                  <MessageBox variant="success">
                    Store posted to stores page successfully.
                  </MessageBox>
                )}

                {loadingUnpost && <LoadingBox></LoadingBox>}
                {errorUnpost && (
                  <MessageBox variant="danger">Failed to remove store from stores page. Check your network and try again.</MessageBox>
                )}
                {successUnpost && (
                  <MessageBox variant="success">
                    Store removed from stores page successfully.
                  </MessageBox>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div></div>
      <div>
        <div className="add-item row around">
          <div>
          <Link to="/createproduct">
            {/* <button className="primary">Add items for sale</button> */}
            <Button variant="contained" color="success" size="large">
              Add Items For Sale
              <AddCircleOutlineIcon />
              </Button>
          </Link>
          </div>
          <div>
           {
            userInfo.accountName && userInfo.accountName !== ""?
            <><Button sx={{marginTop: "3px"}} variant="contained" color="secondary" size="small" onClick={handleEditAccount}>
            Edit bank account
            </Button></>:
            <><Button sx={{marginTop: "3px"}} variant="contained" color="secondary" size="small" onClick={handleAddAccount}>
            Add bank account
            </Button></>
          } 
          {/* <Button sx={{marginTop: "3px"}} variant="contained" color="secondary" size="small" onClick={handleAddAccount}>
            Add bank account
            </Button> */}
          </div>
                  <div>
                    
           <Link to="/services">
            <Button sx={{marginTop: "3px"}} variant="contained" color="primary" size="large">
              Important Information
              </Button>
          </Link> 
          </div>
        </div>

        {loadPostProduct && <LoadingBox></LoadingBox>}
        {errorPostProduct && (
          <MessageBox variant="danger">{errorPostProduct}</MessageBox>
        )}
        {successPostProduct && (
          <MessageBox variant="success">
            Product posted to product page successfully.
          </MessageBox>
        )}
        {loadingUnpostProduct && <LoadingBox></LoadingBox>}
        {errorUnpostProduct && (
          <MessageBox variant="danger">{errorUnpost}</MessageBox>
        )}
        {sucessUnpostProduct && (
          <MessageBox variant="success">
            Product removed from product page successfully.
          </MessageBox>
        )}
        
      </div>

      <div style={{backgroundColor:"white"}} className="row center">
        {loadingProduct && <LoadingBox></LoadingBox>}
        {errorProduct && (
          <MessageBox variant="danger">Failed to load items. Check your network and try again.</MessageBox>
        )}
        {userProducts &&
          userProducts.map((product) => (
            <div key={product._id} className="card">
              <Link to={`/product/${product._id}`}>
                <img
                  className="medium"
                  src={product.image}
                  alt={product.name}
                />
              </Link>
              <div className="card-body">
                <Link to={`/product/${product._id}`}>
                  <h3 style={{textAlign:"center"}}>{product.name}</h3>
                  {/* {product.isPaid && <h3 className="sold">Item Sold</h3>} */}
                </Link>
                <div style={{textAlign:"center"}} className="price">#{product.price}</div>

                <div className="store-utils">
                  <p>
                    {product.isPosted ? (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() =>
                          dispatch(unPostedProduct({ id: product._id }))
                        }
                      >
                        
                        Unpost
                        <UndoIcon />
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() =>
                          dispatch(editPostedProduct({ id: product._id }))
                        }
                        >
                          <FlightOutlinedIcon />
                        Post
                      </Button>
                    )}
                  </p>
                  {
                    !product.isPaid &&
                    <p>
                    <Link to={`/update/${product._id}`}>
                          <Button variant="contained" color="secondary" size="small">
                            <ModeEditOutlineOutlinedIcon />
                        Edit
                      </Button>
                    </Link>
                  </p>
                  }
                  {
                    !product.isPaid &&
                    <p>
                    <Link to={`/delete/${product._id}`}>
                          <Button variant="contained" color="error" size="small">
                           <DeleteOutlineIcon />
                        Delete
                      </Button>
                    </Link>
                  </p>
                  }
                  
                </div>
              </div>
            </div>
          ))}
      </div>

{/* modal for openeing and locking store */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleCloseStore} style={{display:"flex", flexDirection:"column"}}>
            <h4>Opening Date</h4>
            {
              loadCloseStore && <LoadingBox></LoadingBox>
                  }
                 
            
            {
              errorCloseStore && <Stack sx={{ width: '90%' }} spacing={2}>
                        <Alert severity="error" onClose={() => setErrorCloseStore(false)}>Failed to lock store</Alert>
      
            </Stack>
                  }
                    
            
            {
              successCloseStore && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="success" onClose={() => setSuccessCloseStore(false)}>Store locked successfully.</Alert>
      
            </Stack>
                  }
                  
            
            <label htmlFor="tobeopened">Date</label>
            <input type="text" id="tobeopened" placeholder="Monday 24th July, 2022."
              onChange={(e) => setToBeOpened(e.target.value)} required
                    />
                    <button style={{backgroundColor: "green", color:"white", margin:"5px", padding:"5px"}} type="submit">Lock store</button>
            
          </form>
          <Button sx={{margin:"5px"}} variant="contained" color="error" size="small" onClick={handleClose}>
                           
                        Close
                      </Button>
        </Box>
      </Modal>



{/* modal for adding bank account */}
<Modal
        open={openAccountModal}
        onClose={handleCloseAddAccount}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleBankModal} style={{display:"flex", flexDirection:"column"}}>
            <h4>Add bank account</h4>
            {
              loadBank && <LoadingBox></LoadingBox>
                  }
                 
            
            {
              errorLoadBank && <Stack sx={{ width: '90%' }} spacing={2}>
                        <Alert severity="error" onClose={() => setErrorLoadBank(false)}>Failed to add account</Alert>
      
            </Stack>
                  }
                    
            
            {
              successLoadBank && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="success" onClose={() => setSuccessLoadBank(false)}>Account added successfully.</Alert>
      
            </Stack>
                  }
                  
            
              
            <label htmlFor="accountName">Account Name</label>
            <input type="text" id="accountName" placeholder="John Doe" style={{marginBottom:"3px"}}
              onChange={(e) => setAccountName(e.target.value)} required
                    />
           


            
            <label htmlFor="accountNunber">Account Number</label>
            <input type="text" id="accountNumber" placeholder="1010101010" style={{marginBottom:"3px"}}
              onChange={(e) => setAccountNumber(e.target.value)} required
                    />
           

            
            <label htmlFor="bankName">Bank</label>
            <input type="text" id="bankName" placeholder="Zenith bank" style={{marginBottom:"3px"}}
              onChange={(e) => setBank(e.target.value)} required
                    />
            
            <p>Create a 4-6 character pin below, to provide extra security for this account detail. This pin will be required to make changes to this account detail.</p>

            {
              pinLessMessage && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="error" onClose={() => setPinLessMessage(false)}>Pin must not be less than 4 character</Alert>
      
            </Stack>
            }
            {
              pinMoreMessage && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="error" onClose={() => setPinMoreMessage(false)}>Pin must not be more than 6 character</Alert>
      
            </Stack>
            }
            <label htmlFor="accountPin">Pin</label>
            <input type="text" id="accountPin" placeholder="137611" style={{marginBottom:"3px"}}
              onChange={(e) => setAccountPin(e.target.value)} required
                    />
                    <button style={{backgroundColor: "green", color:"white", margin:"5px", padding:"5px"}} type="submit">Add Account</button>
            
          </form>
          <Button sx={{margin:"5px"}} variant="contained" color="error" size="small" onClick={handleCloseAddAccount}>
                           
                        Close
                      </Button>
        </Box>
      </Modal>



{/* modal for editting bank account details */}
<Modal
        open={editAccountModal}
        onClose={handleCloseEditAccount}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleEditBankModal} style={{display:"flex", flexDirection:"column"}}>
            <h4>Edit bank account</h4>
            {
              loadBank && <LoadingBox></LoadingBox>
                  }
                 
            
            {
              errorLoadBank && <Stack sx={{ width: '90%' }} spacing={2}>
                        <Alert severity="error" onClose={() => setErrorLoadBank(false)}>Wrong account pin</Alert>
      
            </Stack>
                  }
                    
            
            {
              successLoadBank && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="success" onClose={() => setSuccessLoadBank(false)}>Account edited successfully.</Alert>
      
            </Stack>
                  }
                  
            
              
            <label htmlFor="accountName">Account Name</label>
            <input type="text" id="accountName" placeholder="John Doe" style={{marginBottom:"3px"}}
            value={accountName}
              onChange={(e) => setAccountName(e.target.value)} required
                    />
           


            
            <label htmlFor="accountNunber">Account Number</label>
            <input type="text" id="accountNumber" placeholder="1010101010" style={{marginBottom:"3px"}}
            value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)} required
                    />
           

            
            <label htmlFor="bankName">Bank</label>
            <input type="text" id="bankName" placeholder="Zenith bank" style={{marginBottom:"3px"}}
            value={bank}
              onChange={(e) => setBank(e.target.value)} required
                    />
            
            <p>Enter your 4-6 digit account pin</p>

            {
              pinLessMessage && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="error" onClose={() => setPinLessMessage(false)}>Pin must not be less than 4 character</Alert>
      
            </Stack>
            }
            {
              pinMoreMessage && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="error" onClose={() => setPinMoreMessage(false)}>Pin must not be more than 6 character</Alert>
      
            </Stack>
            }
            <label htmlFor="accountPin">Pin</label>
            <input type="text" id="accountPin" placeholder="137611" style={{marginBottom:"3px"}}
              onChange={(e) => setAccountPin(e.target.value)} required
                    />
                    <button style={{backgroundColor: "green", color:"white", margin:"5px", padding:"5px"}} type="submit">Edit Account</button>
            
          </form>
          <Button sx={{margin:"5px"}} variant="contained" color="error" size="small" onClick={handleCloseEditAccount}>
                           
                        Close
                      </Button>
        </Box>
      </Modal>



</div>
          )
      }



        </div>
     
  );
}

export default UserStore;
