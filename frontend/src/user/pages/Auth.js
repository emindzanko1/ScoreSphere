import React from 'react';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import AppleLogin from 'react-apple-login';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';

import './Auth.css';

const Auth = () => {
  const responseGoogle = response => {
    console.log(response);
    // Handle Google login response
  };

  const responseFacebook = response => {
    console.log(response);
    // Handle Facebook login response
  };

  const responseApple = response => {
    console.log(response);
    // Handle Apple login response
  };

  return (
    <div className='signin-form-container'>
      <h2>Sign In</h2>
      <form className='signin-form'>
        <div className='form-group'>
          {/*<label htmlFor='email'>Email/Username:</label>*/}
          <input type='text' id='email' className='input-field' placeholder='Email Address'/>
        </div>
        <div className='form-group'>
          {/*<label htmlFor='password'>Password:</label>*/}
          <input type='password' id='password' className='input-field' placeholder='Password' />
        </div>
        <button type='submit' className='signin-button'>
          Sign In
        </button>
        <div className='separator'>
          <div className='separator-line'></div>
          <div className='separator-label'>or</div>
          <div className='separator-line'></div>
        </div>
      </form>
      <div className='signin-options'>
        <GoogleLogin
          clientId='YOUR_GOOGLE_CLIENT_ID'
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          render={renderProps => (
            <button className='signin-option google-login' onClick={renderProps.onClick}>
              <FaGoogle className='signin-icon' /> Sign in with Google
            </button>
          )}
        />
        <FacebookLogin
          appId='YOUR_FACEBOOK_APP_ID'
          autoLoad={false}
          fields='name,email,picture'
          callback={responseFacebook}
          render={renderProps => (
            <button className='signin-option facebook-login' onClick={renderProps.onClick}>
              <FaFacebook className='signin-icon' /> Sign in with Facebook
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
              <FaApple className='signin-icon' /> Sign in with Apple
            </button>
          )}
        />
      </div>
      <p>
        Not registered yet? <a href='/register'>Sign Up!</a>
      </p>
    </div>
  );
};

export default Auth;
