import { useState } from 'react';
import '../styles/Auth.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function AuthForm({ isRegister }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className='form-container'>
      <div className='header'>
        <h1>{isRegister ? 'Create an Account' : 'Sign in to your account'}</h1>
        <h2>{isRegister ? 'Register to continue' : 'Sign in to your account'}</h2>
      </div>

      <form>
        {isRegister && (
          <div className='form-group'>
            <label>Full Name</label>
            <input type='text' id='full-name' name='full-name' placeholder='Full Name' required />
          </div>
        )}
        <div className='form-group'>
          <label>Email</label> 
          <input type='email' id='email' name='email' placeholder='Email' required />
        </div>

        <div className='form-group password-group'>
          <label>Password</label>
          <input
            type={passwordVisible ? 'text' : 'password'}
            id='password'
            name='password'
            placeholder='Password'
            required
          />
          <span className='password-toggle' onClick={togglePasswordVisibility}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type='submit' className={isRegister ? 'register-btn' : 'login-btn'}>
          {isRegister ? 'Register' : 'Login'}
        </button>

        <div className='divider'>
          <hr />
        </div>

        <div className='social-login'>
          <button type='button' className='google-btn'>
            {isRegister ? 'Register with Google' : 'Login with Google'}
          </button>
          <button type='button' className='facebook-btn'>
            {isRegister ? 'Register with Facebook' : 'Login with Facebook'}
          </button>
        </div>

        <div className='register-link'>
          {isRegister ? (
            <span>
              Already have an account? <a href='/auth'>Sign In</a>
            </span>
          ) : (
            <span>
              Don't have an account? <a href='/search'>Register</a>
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
