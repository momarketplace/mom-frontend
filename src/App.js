
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import HomePage from './pages/HomePage';
import StoresPage from './pages/StoresPage';
import BasketPage from './pages/BasketPage';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import { logout } from './actions/userActions';
import RegisterPage from './pages/RegisterPage';
import ShippingAddressPage from './pages/ShippingAddressPage';
import PaymentMethodPage from './pages/PaymentMethodPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ProfilePage from './pages/ProfilePage';
import CreateStore from './pages/CreateStorePage';
import CreateProductPage from './pages/CreateProductPage';
import StoreDetailsPage from './pages/StoreDetailsPage';
import UserStore from './pages/UserStore';
import EditStore from './pages/EditStore';
import UpdateProduct from './pages/UpdateProduct';
import DeleteProduct from './pages/DeleteProduct';
import SoldProducts from './pages/SoldProducts';
import WithdrawHistory from './pages/WithdrawHistory';
import Chats from './pages/Chats';
import { ChatState } from "./context/ChatProvider";
import axios from 'axios';
import {useEffect, useState } from 'react';
import Guide from './pages/Guide';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CustomerOrders from './pages/CustomerOrders';
import Feedback from './pages/Feedback';
import UserList from './pages/UserList';
import StoreList from './pages/StoreList';
import ProductList from './pages/ProductList';
import OrderList from './pages/OrderList';
import WithdrawList from './pages/WithdrawList';
import ComplainList from './pages/ComplainList';
import TermConditions from './pages/TermConditions';
import About from './pages/About';
//import Ojiko from './pages/Ojiko';
// import Stack from '@mui/material/Stack';
// import Alert from '@mui/material/Alert';
// import LoadingBox from './components/LoadingBox';
import NewsletterEmailList from './pages/NewsletterEmailList';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
//import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Services from './pages/Services';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import ChatIcon from '@mui/icons-material/Chat';
import ViewUser from './pages/ViewUser';
import ForgotPassword from './pages/ForgotPassword';
import Resetpassword from './pages/Resetpassword';
import Privacy from './pages/Privacy';
import Dashboard from './pages/Dashboard';
import CreateStoreSteps from './pages/CreateStoreSteps';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import StoreUrlLandingPage from './pages/StoreUrlLandingPage';
import Recruitment from './pages/Recruitment';
import ConfirmVerificationLink from './pages/ConfirmVerificationLink';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';




function App() {


  //get access to basket items
  const basket = useSelector((state) => state.basket);
  const { basketItems } = basket;
  const [notifs, setNotifs] = useState([]) //for notification

  //get access to userLogin from redux store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  


  //logout function
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    window.location = "/";
  };

   //import state from context
    const { selectedChat, chats } = ChatState();

  //fetch all user notifications
  const myNotification = async () => {
    try {
      const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

      const { data } = await axios.get("https://us-central1-mosganda-one-7604d.cloudfunctions.net/api/v1/chat/findnotification", config);
      setNotifs(data)

    } catch (error) {
      console.log(error)
    }
  }
 
  useEffect(() => {
    myNotification()
  },[userInfo, selectedChat, chats])
 
  const myNotifications = notifs?.filter((n) => n.latestMessage.sender._id !== userInfo._id)
  
  
  return (
    <BrowserRouter>
    
      <div className="grid-container page-container" style={{ marginBottom: "0px" }}>
        <header>
        <div className='mosganda-header'>
          <div className='mosganda-header-left'>
            {/*header logo*/}
            <Link to ="/">
            <img style={{width:"80px", height:"auto", marginLeft:"10px"}} src="/images/mom-logo.jpg" alt="" />  
            </Link>
            {/* <p className='mosganda-footer-image-container'>
            <img style={{width:"70px", height:"auto", marginRight:"1px"}} src="/images/mom-logo.jpg" alt="" />  
            </p> */}
          {/* <Link to="/">
                        <img style={{width:"90px", height:"auto", margin:"10px"}} src="/images/mom-logo.jpg" alt="" />
          </Link> */}
           
            <div className='mosganda-header-itemslink'>
              <Link to="/stores">
                Stores
              </Link>

              <Link to="/createstoresteps">
                
            Sell now
                </Link>
                <Link to="/createstore">
                
            Create-store
          </Link>
            </div>
            
          </div>
          <div className='mosganda-header-right'>
             {/*haeder nav */}
          <div className='mosganda-header-option'>
            <Link to="/chats">
                <div className='mosganda-header-tripple-iconandtext'>
                  <span className='mosganda-option-lineone'>
                  <ChatIcon sx={{ fontSize: "25px", color:"white", borderRadius:"10px", padding:"2px"}} />
                  </span>
                  <div className='mosganda-header-double-container'>
                  <span className='mosganda-option-linetwo'>Chat</span>
                   {myNotifications.length > 0 && (
                <span className="badge">{myNotifications.length}</span>
                  )} 
                  {/* <span className='badge'>0</span> */}
                </div>
                
                </div>
                
              
            </Link>
          </div>
          <div className='mosganda-header-option'>
            <Link to="/basket/:id">
                <div className='mosganda-header-tripple-iconandtext'>
                  <span className='mosganda-option-lineone'>
                  <ShoppingBasketOutlinedIcon  sx={{ fontSize: "25px", color:"white", borderRadius:"10px" }} />
                  </span>
                  <div className='mosganda-header-double-container'>
                  <span className='mosganda-option-linetwo'>Basket</span>
                  {basketItems.length > 0 && (
                <span className="badge">{basketItems.length}</span>
              )}
                  {/* <span className='badge'>0</span> */}
                </div>
                
                </div>
                
              
            </Link>
          </div>
          <div className='mosganda-header-option'>
            {
              /* Show name of user that logged in. Also implement logout */
              userInfo ? (
                <div className="dropdown">
                      <Link to="#">
                        <div className='mosganda-header-tripple-iconandtext'>
                  <span className='mosganda-option-lineone'>
                  <img style={{width:"25px", maxHeight:"25px", backgroundColor:"white"}} src={userInfo.image} alt="" />
                  </span>
                  <span className='mosganda-option-linetwo'>{userInfo.name.split(" ")[0]}<span><ArrowDropDownIcon sx={{fontSize:"18px"}} /></span> {" "}</span>
                </div>
                    {/* {userInfo.name}<span><ArrowDropDownIcon /></span> {" "} */}
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/profile">Edit Profile</Link>
                    </li>
                    <li>
                      <Link
                        to={userInfo.isSeller ? "/userstore" : "/createstore"}
                      >
                        {userInfo.isSeller ? "User Store" : "Create Store"}
                      </Link>
                    </li>
                    <li>
                      <Link to="/orderhistory">My Orders</Link>
                    </li>
                     <li>
                      {userInfo.isSeller && (
                        <Link to="/orderedproducts">Customer Orders</Link>
                      )}
                    </li> 
                    <li>
                      {userInfo.isSeller && (
                        <Link to="/soldproducts">Sold Items</Link>
                      )}
                    </li>
                    <li>
                      {userInfo.isSeller && (
                        <Link to="/findwithdrawals">Withdraws</Link>
                      )}
                    </li>
                    
                    <li>
                      <Link to="#logout" onClick={logoutHandler}>
                        {" "}
                        Logout{" "}
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                    <Link to="/login">
                       <div className='mosganda-header-tripple-iconandtext'>
                  <span className='mosganda-option-lineone'>
                  <LoginIcon sx={{ fontSize: "25px", color:"white", borderRadius:"10px"}} />
                  </span>
                  <span className='mosganda-option-linetwo'>Login</span>
                </div>
                </Link>
              )
            }
          </div>
          <div className='mosganda-header-option'>
            {
                !userInfo && <span>
                  <Link to="/register">
                    <div className='mosganda-header-tripple-iconandtext'>
                  <span className='mosganda-option-lineone'>
                  <HowToRegIcon sx={{ fontSize: "25px", color:"white", borderRadius:"10px"}} />
                  </span>
                  <span className='mosganda-option-linetwo'>Register</span>
                </div>
                </Link>
              </span>
              }
          </div>
          <div className='mosganda-header-option'>
            {
              userInfo && userInfo.isAdmin && (
                <div className='dropdown'>
                  <Link to="#admin">Admin {" "}<span><ArrowDropDownIcon /></span></Link>
                  <ul className='dropdown-content'>
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/userlist">Users</Link>
                    </li>
                    <li>
                      <Link to="/storelist">Stores</Link>
                    </li>
                    <li>
                      <Link to="/productlist">Products</Link>
                    </li>
                    <li>
                      <Link to="/orderlist">Orders</Link>
                    </li>
                    <li>
                      <Link to="/withdrawlist">withdraws</Link>
                    </li>
                    <li>
                      <Link to="/complainlist">Complains</Link>
                    </li>
                    <li>
                      <Link to="/newsletterlist">Newsletters</Link>
                    </li>
                  </ul>
                </div>
              )
            }
          </div>
         </div>
          </div>
          </header>
         
        <main className='content-wrap'>
          <Routes>
          <Route path="/confirmverification/:id" element={ <ConfirmVerificationLink />}></Route>
           <Route path="/recruitment" element={ <Recruitment />}></Route>
          <Route path = "/:storename" element = { <StoreUrlLandingPage />}></Route>
         <Route path="/createstoresteps" element={ <CreateStoreSteps />}></Route>
          <Route path="/dashboard" element={ <Dashboard />}></Route>
           <Route path="/privacy" element={<Privacy />}></Route>
          <Route path="/resetpassword/:id" element={ <Resetpassword />}></Route>
          <Route path="/forgotpassword" element={ <ForgotPassword />}></Route>
          <Route path="/viewuser/:id" element={ <ViewUser />}></Route>
        <Route path="/services" element={ <Services />}></Route>
          <Route path="/newsletterlist" element={ <NewsletterEmailList />}></Route>
          {/* <Route path="/ojiko" element={ <Ojiko />}></Route> */}
          <Route path="/about" element={ <About />}></Route>
          <Route path="/termsandconditions" element={ <TermConditions />}></Route>
          <Route path="/complainlist" element={ <ComplainList />}></Route>
          <Route path="/withdrawlist" element={ <WithdrawList />}></Route>
          <Route path="/orderlist" element={ <OrderList />}></Route>
          <Route path="/productlist" element={ <ProductList /> }></Route>
          <Route path="/storelist" element={ <StoreList />}></Route>
          <Route path="/userlist" element={ <UserList />}></Route>
          <Route path="/feedback" element={ <Feedback />}></Route>
          <Route path="/guide" element={<Guide />}></Route>
          <Route path="/chats" element={<Chats />}></Route>
          <Route path="/findwithdrawals" element={<WithdrawHistory />}></Route>
          <Route path="/soldproducts" element={<SoldProducts />}></Route>
         <Route path="/orderedproducts" element={<CustomerOrders />}></Route> 
          <Route path="/delete/:id" element={<DeleteProduct />}></Route>
          <Route path="/update/:id" element={<UpdateProduct />}></Route>
          <Route path="/editstore" element={<EditStore />}></Route>
          <Route path="/userstore" element={<UserStore />}></Route>
          {/* <Route path="/store/bizname/:name" component={StoreDetailsPageCopy}></Route> */}
          <Route path="/store/:id" element={<StoreDetailsPage />}></Route>
          <Route path="/createproduct" element={<CreateProductPage />}></Route>
          <Route path="/createstore" element={<CreateStore />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/orderhistory" element={<OrderHistoryPage />}></Route>
          <Route path="/order/:id" element={<OrderPage />}></Route>
          <Route path="/placeorder" element={<PlaceOrderPage />}></Route>
          <Route path="/payment" element={<PaymentMethodPage />}></Route>
          <Route path="/shipping" element={<ShippingAddressPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/basket/:id" element={<BasketPage />}></Route>
          {/* <Route path="/basket/:id?" element={<BasketPage />}></Route> */}
          <Route path="/stores" element={<StoresPage />}></Route>
          <Route path="/product/:id" element={<ProductPage />}></Route>
            <Route path="/" index element={<HomePage />}></Route>
            </Routes>
          
        </main>
        <footer className='footer'>
          <div className='mosganda-footer'>
            <div className='mosganda-footer-left'>
              <h4 style={{color:"yellow"}}>Contact us</h4>
              <p className='mosganda-footer-image-container'>
            <img style={{width:"70px", height:"auto", marginRight:"1px"}} src="/images/mom-logo.jpg" alt="" />  
            </p>
            {/* <p className='mosganda-footer-image-container'>
            <img style={{width:"20px", height:"auto", marginRight:"1px"}} src="/images/mom2.jpg" alt="" />  
            <p style={{fontSize:"15px", marginLeft:"5px"}}>Mosganda</p>
            </p> */}
            <p>
              <span><CallIcon /></span>
              <span style={{marginLeft:"5px"}}>09028718288</span>
            </p>
            <p>
              <span><EmailIcon /></span>
              <span style={{marginLeft:'5px'}}>contact@mosganda.com</span>
            </p>
                  

            </div>
            <div className='mosganda-footer-center'>
              <h4 style={{color:"yellow"}}>Quick links</h4>
              <p className="mosganda-footer-center-links">
              <Link to="/about">About us</Link>
              <Link to="/guide">Guide</Link>
              <Link to="/privacy">Privacy</Link>
              <Link to="/termsandconditions">Terms and Conditions</Link>
              <Link to="/feedback">Your feedback</Link>
              <Link to="/recruitment">Careers</Link>
              </p>
            </div>
            <div className='mosganda-footer-right'>
              <h4 style={{color:"yellow"}}>Follow us</h4>
              <p className="mosganda-footer-social-links">
                <Link to="#"><FacebookIcon sx={{ fontSize: 25, backgroundColor: "white", color: "blue" }} /></Link>
                <Link to="#"><InstagramIcon sx={{fontSize:25, backgroundColor:"white", color:"purple"}} /></Link>
                <Link to="#"><TwitterIcon sx={{fontSize:25, backgroundColor:"white", color:"#1c86ee"}} /></Link>
                <Link to="#"><YouTubeIcon sx={{fontSize:25, backgroundColor:"white", color:"red"}} /></Link>
              </p>
            </div>
          </div>
          <div className="footer-all-right-reserved">All rights reserved</div>
          
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
