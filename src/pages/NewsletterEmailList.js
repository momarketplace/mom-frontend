import React from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useState } from 'react';

function NewsletterEmailList() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [newsletterEmails, setNewsletterEmails] = useState([])

    //get access to userLogin from redux store
  const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    if (!userInfo.isAdmin) {
        window.location="/"
    }
   
    //remove duplicate emails
    // const myNewsEmails = newsletterEmails.filter((email) => {
    //     if (email.newsEmail === email.newsEmail) {
    //        return newsletterEmails.splice(email, 1)
    //     }
        
    // })
  
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true)
            const { data } = await axios.get('https://us-central1-mosganda-one-7604d.cloudfunctions.net/app/api/v1/user/find', {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
            setLoading(false)
            setNewsletterEmails(data)
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }

        fetchUsers()
    }, [userInfo.isAdmin])
    

    return (
        <div style={{backgroundColor:"white"}}>
            <h4 style={{ textAlign: "center" }}> List Of Newsletter Emails</h4>
            {
                loading && <LoadingBox></LoadingBox>
            }
            {
                error && <MessageBox variant="danger">Could not load emails</MessageBox>
                }
            <div className='row center'>
                
                {
                    newsletterEmails?.map((newsletter) => (
                        <div key={newsletter._id}>
                            <p style={{padding:"5px"}}>{newsletter.email}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default NewsletterEmailList
