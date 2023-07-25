import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import AppleLogin from 'react-apple-login';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = event => {
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

  const handleSubmit = event => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    console.log(formData);
    // Handle form submission
  };

  const togglePasswordVisibility = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      showPassword: !prevFormData.showPassword,
    }));
  };

  const responseGoogle = response => {
    console.log(response);
    // Handle Google register response
  };

  const responseFacebook = response => {
    console.log(response);
    // Handle Facebook register response
  };

  const responseApple = response => {
    console.log(response);
    // Handle Apple register response
  };

  return (
    <div className='registration-form-container'>
      <div className='registration-form-wrapper'>
        <h2>Create an Account</h2>
        <form className='registration-form' onSubmit={handleSubmit}>
          <div className='form-group'>
            {/*<label htmlFor="firstName">First Name</label>*/}
            <input
              type='text'
              id='fullName'
              name='fullName'
              value={formData.fullName}
              onChange={handleChange}
              required
              className='registration-form-input'
              placeholder='Your Name'
              // onInvalid={e => e.target.setCustomValidity('Please enter your name')}
              // onInput={e => e.target.setCustomValidity('')}
            />
          </div>
          <div className='form-group'>
            {/*<label htmlFor="email">Email</label>*/}
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              className='registration-form-input'
              placeholder='Your Email'
            />
          </div>
          <div className='form-group'>
            {/*<label htmlFor="password">Password</label>*/}
            <div className='input-with-icon'>
              <input
                type={formData.showPassword ? 'text' : 'password'}
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
                className='registration-form-input'
                placeholder='Password'
              />
              <FontAwesomeIcon
                icon={formData.showPassword ? faEyeSlash : faEye}
                className='password-icon'
                onClick={togglePasswordVisibility}
              />
            </div>
            {/*<span
              className={`toggle-password ${formData.showPassword ? 'active' : ''}`}
              onClick={() => handleChange({ target: { name: 'showPassword', checked: !formData.showPassword } })}
            >
              <img src='eye.png' alt='Toggle Password' />
            </span>*/}
          </div>
          <div className='form-group'>
            {/*<label htmlFor="confirmPassword">Confirm Password</label>*/}
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className='registration-form-input'
              placeholder='Repeat your password'
            />
            {!passwordMatch && (
              <span className='error-message'>Your password and confirmation password must match.</span>
            )}
          </div>
          <div className='form-group'>
            <label htmlFor='agreeTerms' className='checkbox-label'>
              <input
                type='checkbox'
                id='agreeTerms'
                name='agreeTerms'
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
              />
              <span className='checkbox-custom'></span>I agree to the terms and conditions
            </label>
          </div>
          <div className='form-group'>
            <button type='submit' className='registration-form-button'>
              Register
            </button>
          </div>
          <div className='separator'>
            <div className='separator-line'></div>
            <div className='separator-label'>or</div>
            <div className='separator-line'></div>
          </div>
        </form>
        <div className='signup-options'>
          <GoogleLogin
            clientId='MY_GOOGLE_CLIENT_ID'
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
              <button className='signup-option google-signup' onClick={renderProps.onClick}>
                <FaGoogle className='signup-icon' /> Sign up with Google
              </button>
            )}
          />
          <FacebookLogin
            appId='MY_FACEBOOK_APP'
            autoLoad={false}
            fields='name,email,picture'
            callback={responseFacebook}
            render={renderProps => (
              <button className='signup-option facebook-signup' onClick={renderProps.onClick}>
                <FaFacebook className='signup-icon' /> Sign up with Facebook
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
              <button className='signup-option apple-signup' onClick={renderProps.onClick}>
                <FaApple className='signup-icon' /> Sign up with Apple
              </button>
            )}
          />
        </div>
        <p>
          Already have an account? <a href='/login'>Log In!</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
