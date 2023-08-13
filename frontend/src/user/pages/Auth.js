import React, { useState, useContext } from 'react';

import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import AppleLogin from 'react-apple-login';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import AuthContext from '../../shared/context/auth-context';
import './Auth.css';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();

    if (isLoginMode) {
    } else {
      try {
        const response = await fetch('http://localhost:5000/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();
        console.log(responseData);
      } catch (err) {
        console.log(err);
      }
    }

    auth.login();
  };

  const successGoogleHandler = response => {
    //auth.login();
  };

  const failureGoogleHandler = response => {
    //console.log(response);
  };

  const responseFacebook = response => {
    //console.log(response);
  };

  const responseApple = response => {
    // console.log(response);
  };

  return (
    <div className='signin-form-container'>
      {isLoginMode ? <h2>Sign In</h2> : <h2>Create an Account</h2>}
      <hr />
      <form className='signin-form' onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element='input'
            id='name'
            type='text'
            label='Your Name'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a name.'
            onInput={inputHandler}
          />
        )}
        <Input
          element='input'
          id='email'
          type='email'
          label='E-Mail'
          validators={[VALIDATOR_EMAIL()]}
          errorText='Please enter a valid email address.'
          onInput={inputHandler}
        />
        <Input
          element='input'
          id='password'
          type='password'
          label='Password'
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText='Please enter a valid password, at least 6 characters.'
          onInput={inputHandler}
        />
        {/* {!isLoginMode ? (
          <div className='form-group'>
            <Input
              element='input'
              id='confirmPassword'
              type='password'
              label='Confirm Password'
              validators={['passwordMatch']}
              errorText='Repeat your password.'
              onInput={inputHandler}
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
                //checked={formData.agreeTerms}
                //onChange={changeHandler}
                required
              />
              <span className='checkbox-custom'></span>I agree to the terms and conditions
            </label>
          </div>
        ) : (
          ''
        )} */}
        <button
          type='submit'
          disabled={!formState.isValid}
          className={`signin-button ${!formState.isValid ? 'disabled' : ''}`}
        >
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
          onSuccess={successGoogleHandler}
          onFailure={failureGoogleHandler}
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
        {isLoginMode ? ' Not registered yet?  ' : 'Already have an account?  '}{' '}
        <a onClick={switchModeHandler} role='button'>
          {isLoginMode ? 'Sign Up!' : 'Log In!'}{' '}
        </a>{' '}
      </p>
    </div>
  );
};

export default Auth;
