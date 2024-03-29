import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
//import MessageBox from '../components/MessageBox';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from "@mui/material/Button";
import axios from "axios"



function RegisterPage() {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [show, setShow] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  //activate send verification button
  const [showVerificationBox, setShowVerificationBox] = useState(false)
  const [loadVerification, setLoadVerification] = useState(false)
  const [errorVerification, setErrorVerification] = useState(false)
  const [result, setResult] = useState()
  

    //const redirect = props.location.search? props.location.search.split('=')[1] : '/';

    //get access to userRegister from redux store
    const userRegister = useSelector((state) => state.userRegister)
    const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  //view password in input field
  const handlePassword = () => setShow(!show);

    //function to submit the form
    const handleSummit = (e) => {
        e.preventDefault();
        if(!password) {
          alert("Password cannot be empty.")
          return
        } else if (name === "Mosganda" || name === "mosganda" || name === "MOSGANDA" || name.includes('mosganda') || name.includes('Mosganda') || name.includes('MOSGANDA')) {
          alert("You cannot register with the company's name")
          return
        } else if (password.length < 6) {
          alert("Password should be more than six(6) characters.")
          return
        }
        else {
          dispatch(register(name, email, password));
          setName("");
          
          setPassword("");
          if(error){
           setErrorMessage(true)
           return
          }else{
            setSuccessMessage(true)
            setShowVerificationBox(true)
          }
        }
        
  }
  
  
    

  //handle verification function
  const handleVerification = async() =>{
    try {
      setLoadVerification(true)
      const { data} = await axios.post('https://us-central1-mosganda-one-7604d.cloudfunctions.net/app/api/v1/user/sendverificationlink', { email })
      setLoadVerification(false)
      setResult(data)
      setEmail('')
    } catch (error) {
      setErrorVerification(true)
      setLoadVerification(false)
    }
  }


  
    return (
      <div>
        {
          !showVerificationBox &&
          <form onSubmit={handleSummit}>
          <div className='register'>
            <h3 style={{textAlign:"center"}}>Register</h3>
            <p>Please fill in this form to create an account.</p>
            
            <div className='register-items'>
              <div className='reister-item-option'>
                <label htmlFor='name'>Name<span className="required-field">*</span></label>
                <input className='register-input' type="text" placeholder='Fullname' id="name" required
                  onChange={(e) => setName(e.target.value)}
                  value ={name}
                />
              </div>

              <div className='reister-item-option'>
              <label htmlFor='email'>Email<span className="required-field">*</span></label>
                <input className="register-input" type="text" id="email" placeholder='Enter email' required
                  onChange={(e) => setEmail(e.target.value)}
                  value = {email}
                />
              </div>
              
            <div className='reister-item-option'>
              <label htmlFor='password'>Password<span className="required-field">*</span></label>
                <div className='register-password-container'>
                  <input className="register-input-password" placeholder="Enter Password" id="password" required
                    type={show ? "test" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    value = {password}
                  />
                  <button type="button" className='password-view-button' onClick={handlePassword}>
                {show? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </button>
            </div>
              </div>
              
            </div>
            <p>By creating an account you agree to our <Link to="/termsandconditions">Terms and Privacy</Link>.</p>
            {
              successMessage && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="success" onClose={() => setSuccessMessage(false)}>Successful. A verification link has been sent to your email.</Alert>
      
            </Stack>
            }
            {
              loading && <LoadingBox></LoadingBox>
            }
            {
              errorMessage && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="error" onClose={() => setErrorMessage(false)}>Failed to register</Alert>
      
            </Stack>
            }
            {/* {
              error && <MessageBox className="danger">Failed to register.</MessageBox>
            } */}
            <button type="submit" class="register-button">Register</button>
            <div class="signin">
            <p>Already have an account? <Link to="/login">Login</Link>.</p>
            </div>
            

          </div>
          
        </form>
        }

        <div>
        {
          showVerificationBox &&
          <div className='row center' style={{display:"flex", flexDirection:"column"}}>
            <p>Please, click on the button below to send a verification link to your email.</p>
            <Button variant="contained" color="primary" size="small" onClick={handleVerification}>
                Send Verification link
              </Button>
              {loadVerification && <LoadingBox></LoadingBox>}
                    {
              result && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="success" onClose={() => setResult("")}>Successful. A verification link has been sent to your email.</Alert>
      
            </Stack>
                    }
                    {
              errorVerification && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="error" onClose={() => setErrorVerification(false)}>Failed to sent verification link.</Alert>
      
            </Stack>
              }
          </div>
        }

        </div>

      </div>
    );
}

export default RegisterPage
