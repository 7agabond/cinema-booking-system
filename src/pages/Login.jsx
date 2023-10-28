import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../stylings/account.css';

const Login = () => {
  const [passwordInput, setPasswordInput] = useState(false);
  const handleInputFocus = () => {
    setPasswordInput(true);
  };
  const handleInputBlur = () => {
    setPasswordInput(false);
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordInputRef = useRef(null);

  const handleTogglePasswordVisibility = (e) => {
    setPasswordVisible(!passwordVisible);
    e.preventDefault();

    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make an API POST request to your login endpoint with email and password
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const token = await response.text();
        // Store the token in your authentication state or cookie
        // Redirect to the desired page after successful login
      } else {
        // Handle authentication errors here, e.g., show an error message
      }
    } catch (error) {
      console.error('Failed to log in:', error);
    }
  };

  return (
    <section className='login account section-wrapper'>
      <div className='section-container-narrow'>
        <h2>Log in to your account</h2>
        <form className='user-info-form' onSubmit={handleLogin}>
          <div className='user-info'>
            <label className='user-info-label'>Email</label>
            <input
              type='email'
              className='user-info-input'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
                required
              />
              <button onClick={handleTogglePasswordVisibility} onFocus={handleInputFocus} onBlur={handleInputBlur} className='eye-icon-wrapper'>
                <FontAwesomeIcon
                  icon={passwordVisible ? 'fa-solid fa-eye-slash fa-1x' : 'fa-solid fa-eye fa-1x'}
                  className='eye-icon'
                />
              </button>
            </div>
          </div>
          <Link to='forgot'><button className='user-info-option'>Forgot password</button></Link>
          <button type='submit' className='CTA-button-one'>
            Log in
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
