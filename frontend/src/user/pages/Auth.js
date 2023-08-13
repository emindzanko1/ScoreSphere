import React, { useState, useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import AppleLogin from 'react-apple-login';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import AuthContext from '../../shared/context/auth-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import './Auth.css';

const Auth = () => {
  const auth = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const switchModeHandler = () => {
    setIsLoginMode(prevMode => !prevMode);
  };

  const changeHandler = event => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: newValue,
    }));

    if (name === 'confirmPassword') {
      setPasswordMatch(formData.password === value);
    }
  };

  const togglePasswordVisibility = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      showPassword: !prevFormData.showPassword,
    }));
  };

  const responseGoogle = response => {
    console.log(response);
  };

  const responseFacebook = response => {
    console.log(response);
  };

  const responseApple = response => {
    console.log(response);
  };

  const submitHandler = event => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    // fetch('http://localhost:5000/users/register',{
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     name,
    //     email,
    //     password
    //   })
    // })

    console.log(formData);
    auth.login();
  };

  return (
    <div className='signin-form-container'>
      {isLoginMode ? <h2>Sign In</h2> : <h2>Create an Account</h2>}
      <form className='signin-form' onSubmit={submitHandler}>
        {!isLoginMode ? (
          <div className='form-group'>
            {/*<label htmlFor="firstName">First Name</label>*/}
            <input
              element='input'
              id='name'
              //type=''Yor Name''
              label='name'
              //value={formData.fullName}
              //onChange={handleChange}
              required
              //className='registration-form-input'
              className='input-field'
              placeholder='Your Name'
              onInput={changeHandler}
              // onInvalid={e => e.target.setCustomValidity('Please enter your name')}
              // onInput={e => e.target.setCustomValidity('')}
            />
          </div>
        ) : (
          ''
        )}
        <div className='form-group'>
          <input
            element='input'
            id='email'
            type='email'
            label='E-Mail'
            required
            className='input-field'
            placeholder='Email Address'
            onInput={changeHandler}
          />
        </div>
        <div className='form-group'>
          <input
            element='input'
            id='password'
            type={formData.showPassword ? 'text' : 'password'}
            label='Password'
            required
            className='input-field'
            placeholder='Password'
            onInput={changeHandler}
          />
          <FontAwesomeIcon
            icon={formData.showPassword ? faEye : faEyeSlash}
            className='password-icon'
            onClick={togglePasswordVisibility}
          />
        </div>
        {!isLoginMode ? (
          <div className='form-group'>
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={changeHandler}
              required
              className='input-field'
              placeholder='Repeat your password'
            />
            {!passwordMatch && (
              <span className='error-message'>Your password and confirmation password must match.</span>
            )}
          </div>
        ) : (
          ''
        )}
        {!isLoginMode ? (
          <div className='form-group'>
            <label htmlFor='agreeTerms' className='checkbox-label'>
              <input
                type='checkbox'
                id='agreeTerms'
                name='agreeTerms'
                checked={formData.agreeTerms}
                onChange={changeHandler}
                required
              />
              <span className='checkbox-custom'></span>I agree to the terms and conditions
            </label>
          </div>
        ) : (
          ''
        )}
        <button type='submit' className='signin-button'>
          {isLoginMode ? 'Sign In' : 'Register'}
        </button>
        <div className='separator'>
          <div className='separator-line'></div>
          <div className='separator-label'>or</div>
          <div className='separator-line'></div>
        </div>
      </form>
      <div className='signin-options'>
        <GoogleLogin
          clientId={process.env.REACT_APP_CLIENT_ID}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          render={renderProps => (
            <button className='signin-option google-login' onClick={renderProps.onClick}>
              <FaGoogle className='signin-icon' />
              {isLoginMode ? 'Sign in' : 'Register'} with Google
            </button>
          )}
        />
        <FacebookLogin
          appId='MY_FACEBOOK_APP_ID'
          autoLoad={false}
          fields='name,email,picture'
          callback={responseFacebook}
          render={renderProps => (
            <button className='signin-option facebook-login' onClick={renderProps.onClick}>
              <FaFacebook className='signin-icon' /> {isLoginMode ? 'Sign in' : 'Register'} with Facebook
            </button>
          )}
        />
        <AppleLogin
          clientId='YOUR_APPLE_CLIENT_ID'
          redirectURI='https://your-redirect-uri.com'
          responseType='code'
          responseMode='query'
          usePopup={true}
          callback={responseApple}
          render={renderProps => (
            <button className='signin-option apple-login' onClick={renderProps.onClick}>
              <FaApple className='signin-icon' /> {isLoginMode ? 'Sign in' : 'Register'} with Apple
            </button>
          )}
        />
      </div>
      <p>
        {isLoginMode ? ' Not registered yet?  ' : 'Already have an account?  '}
        <a onClick={switchModeHandler} role='button'>
          {isLoginMode ? 'Sign Up!' : 'Log In!'}
        </a>
      </p>
    </div>
  );
};

export default Auth;
