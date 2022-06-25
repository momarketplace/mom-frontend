import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import { Link } from "react-router-dom"
import Button from "@mui/material/Button";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';


function StoreUrlLandingPage(props) {
    const storename = props.match.params.storename
  
   
    const [loadProduct, setLoadProduct] = useState(false);
    const [errorProduct, setErrorProduct ] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [mystore, setMyStore] = useState()
    const [storeId, setStoreId ] = useState()
    

    
    useEffect(() => {
        const fetchStore = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get(`https://mosganda-online-market-backend.herokuapp.com/${storename}`)
                setLoading(false)
                setMyStore(data)
                
            } catch (error) {
                setError(error.message);
                setLoading(false)
         }
        } 
        fetchStore()
  }, [storename])
    
    //console.log(mystore)


    useEffect(() => {
        if (mystore) {
             setStoreId(mystore._id)
        }
       
    }, [mystore])

  //const storeId = props.match.params.id;
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoadProduct(true);
                const { data } = await axios.get(`https://mosganda-online-market-backend.herokuapp.com/api/v1/product/nonuser/${storeId}`)
                setLoadProduct(false);
                setProducts(data)
            } catch (error) {
                setErrorProduct(error.message);
                setLoadProduct(false);
                
            }
        }
        fetchProduct()
    }, [storeId])
    //console.log(products)
 
  
    
    return (
        
        <div>
            <div>
                {
                    mystore && <div>
                        {
                   loading? (<LoadingBox></LoadingBox>):
                   error? (<MessageBox variant="danger">{error}</MessageBox>):
                        <>
                            {
                                mystore?.isClosed?
                                (<div className='close-store' style={{maxWidth:"100%"}}>
          <h1>Business Activities Closed.</h1>
          <p>To be opened: </p>
                                    <h3>{mystore.toBeOpened}</h3>
                                    </div>) :
                                    (
                                        <div>
                                            <div className="row top bottom">
                    <div className="col-1">
          <div className="profile-card">
            <div>
              
                <h3 className="profile-header">
                  <span className="name-description">Seller Name:</span>{" "}
                  {mystore.creatorName}
                        </h3>  
                                    
             
              <div>
                        <div className="row around">
                          <div>
                             <img
                  className="profile-img"
                  src= {mystore.creatorImage}
                  alt="profile"
                /> 
                          </div>
                  <div className="contact">
                    <p>
                      <span>
                        <PhoneIcon />
                      </span>{" "}
                      {mystore.creatorPhone}
                    </p>
                    <p>
                      <span>
                        <EmailIcon />
                      </span>
                      {mystore.creatorEmail}
                      </p>
                      <p><Link to='/chats'>
                        <Button variant="contained" color="primary" size="small">
                      Chat
                    </Button>
                      </Link></p>
                  </div>
                </div>
                
              </div>
            </div>
            
          </div>
        </div>
                   
                       <div className="col-2">
                       <div className="row around nonuser-col2">
                           <div className="store-image">
                           <h3 className="store-name"><span className="name-description">Store Name:</span>{" "} <strong>{mystore.name}</strong> </h3>
                           <img className="img large" src ={mystore.image} alt="store" />
                           </div>
                           <div className="description">
                                   <h3>Store Details</h3>
                                   <p>Business Address: <strong>{mystore.address}</strong></p>
                                   <p>City/Town: <strong>{mystore.city} </strong></p>
                                   <p>State: <strong>{mystore.state}</strong></p>
                                   <p>Country: <strong>{mystore.country}</strong></p>
                                            <p>Description: <strong>{mystore.description}</strong></p>
                                            <p>
                Delivery: <strong>{mystore.deliveryCapacity}</strong>
                                            </p>
                                            
                                   
                           </div>
                       </div>
                       </div>
                       
                   </div>
                            <div style={{backgroundColor:"white", padding:"10px"}}>
                                
                   <h3 style={{textAlign:"center"}}>Checkout list of our items below, for your shopping pleasure.</h3>
               </div>
                            <div className="row center">
                                {loadProduct && <LoadingBox></LoadingBox>}
                                {errorProduct && <MessageBox variant="danger">{ errorProduct}</MessageBox>}
                   {
                       products.map((product) =>(
                        <Product key = {product._id} product = {product} showStoreButton={false}></Product>
                       ))
                   }

                            </div>
                                        </div>
                                    )
                            }
                   
                            
           </>
            }
            
                        
                    </div>
                }
            </div>
            
            
        </div>
                    
    )
}

export default StoreUrlLandingPage
