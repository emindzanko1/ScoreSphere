import React, { useState } from 'react';
import { Form, Link, useActionData, useNavigation, useSearchParams } from 'react-router-dom';
import '../styles/Auth.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AuthForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const data = useActionData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  const isSubmitting = navigation.state === 'submitting';

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className='form-container'>
      <div className='header'>
        <h1>{isLogin ? 'Sign in to your account' : 'Create an Account'}</h1>
        <h2>{isLogin ? 'Sign in to your account' : 'Register to continue'}</h2>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map(err => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
      </div>

      <Form method='post'>
        {!isLogin && (
          <div className='form-group'>
            <input type='text' id='full-name' name='full-name' placeholder=' ' required />
            <label htmlFor='full-name'>Full Name</label>
          </div>
        )}
        <div className='form-group'>
          <input type='email' id='email' name='email' placeholder=' ' required />
          <label htmlFor='email'>Email</label>
        </div>

        <div className='form-group password-group'>
          <input type={passwordVisible ? 'text' : 'password'} id='password' name='password' placeholder=' ' required />
          <label htmlFor='password'>Password</label>
          <span className='password-toggle' onClick={togglePasswordVisibility}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button disabled={isSubmitting} className={isLogin ? 'login-btn' : 'register-btn'}>
          {isSubmitting ? 'Submitting...' : isLogin ? 'Login' : 'Register'}
        </button>
        <div className='divider'>
          <hr />
        </div>

        <div className='social-login'>
          <button type='button' className='google-btn'>
            {isLogin ? 'Login with Google' : 'Register with Google'}
          </button>
          <button type='button' className='facebook-btn'>
            {isLogin ? 'Login with Facebook' : 'Register with Facebook'}
          </button>
        </div>

        <div className='register-link'>
          <span>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>{isLogin ? 'Register' : 'Sign In'}</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default AuthForm;
