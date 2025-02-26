import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../stylings/account.css';
import axios from 'axios'; // Import Axios for API requests

const BACKEND_URL = 'http://localhost:8000/api'; // Replace with your backend API URL

const Login = () => {
  // Form Data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Password Input Outline
  const [passwordInput, setPasswordInput] = useState(false);
  const handleInputFocus = () => {
    setPasswordInput(true);
  };
  const handleInputBlur = () => {
    setPasswordInput(false);
  };

  // Password Visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  const passwordInputRef = useRef(null);
  const handleTogglePasswordVisibility = (e) => {
    e.preventDefault();

    if (passwordInputRef.current) {
      const caretPosition = passwordInputRef.current.selectionStart;

      setPasswordVisible(!passwordVisible);

      setTimeout(() => {
        if (passwordInputRef.current) {
          passwordInputRef.current.focus();
          passwordInputRef.current.setSelectionRange(caretPosition, caretPosition);
        }
      });
    }
  };

  // Remember Me Functionality
  const [rememberMe, setRememberMe] = useState(false);
  useEffect(() => {
    const rememberMePreference = localStorage.getItem('rememberMe');
    if (rememberMePreference === 'true') {
      setRememberMe(true);
    } // if
  }, []);
  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  // Login Status Message
  const [statusMessage, setStatusMessage] = useState('');

  // Login Button
  const handleLoginClick = async (e) => {
    e.preventDefault();

    if (!email && !password) {
      setStatusMessage('Please enter an email and password');
      return;
    } // if

    if (!email) {
      setStatusMessage('Please enter an email');
      return;
    } // if

    if (!password) {
      setStatusMessage('Please enter a password');
      return;
    } // if

    try {
      const response = await axios.post(`${BACKEND_URL}/login`, {
        email: 'user@example.com', // Replace with the user's email input
        password: password,
      });

      if (response.status === 200) {
        console.log('Login successful:', response.data);
        setStatusMessage('');

        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberMe');
        } // if else
      } else {
        // Handle authentication errors here, e.g., show an error message
        console.error('Login failed:', response.data);
        setStatusMessage('Invalid email and/or password');
      } // if else
    } catch (error) {
      console.error('Failed to log in:', error);
      setStatusMessage('Invalid email and/or password');
    } // try catch
  };

  return (
    <section className='login account section-wrapper'>
      <div className='section-container-narrow'>
        <h2>Log in to your account</h2>
        <form id='login-form' className='user-info-form'>
          <div className='user-info'>
            <label className='user-info-label'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='user-info-input'
            />
          </div>
          <div className='user-info'>
            <label className='user-info-label'>Password</label>
            <div className={`password-info ${passwordInput ? 'is-active' : ''}`}>
              <input
                type={passwordVisible ? 'text' : 'password'}
                value={password}
                ref={passwordInputRef}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={(e) => setPassword(e.target.value)}
                className='enhanced-input'
              />
              <button
                onClick={handleTogglePasswordVisibility}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className='eye-icon-wrapper'
              >
                <FontAwesomeIcon
                  icon={passwordVisible ? 'fa-solid fa-eye-slash fa-1x' : 'fa-solid fa-eye fa-1x'}
                  className='eye-icon'
                />
              </button>
            </div>
          </div>
          <div className='user-options'>
          <label className='user-checkbox-option'><input type='checkbox' />Remember me</label>
            <a href='/forgot' className='user-info-option'>Forgot password</a>
          </div>
        </form>
        <div>
          <button
            onClick={handleLoginClick}
            className='CTA-button-one'
          >
            Log in
          </button>
          <div className='status-message'>{statusMessage}</div>
        </div>
      </div>
    </section>
  );
};

export default Login;