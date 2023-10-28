import { Link } from 'react-router-dom';
import { useState } from 'react'; // Import useState hook
import axios from 'axios';
import '../stylings/account.css';

const SignUp = () => {
  // Define state variables to store user input
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      // Send a POST request to your Django backend API
      const response = await axios.post('/api/create_user/', {
        username: email, // Assuming email is used as the username
        email,
        password,
        confirm_password: confirmPassword,
      });

      // Handle the response from your API as needed
      console.log('User registration successful:', response.data);

      // Redirect to the next page after successful registration
      // You can replace '/shipping-address' with the desired route
      // or handle it differently based on your application flow
      // Example: history.push('/shipping-address');
    } catch (error) {
      // Handle API request error, e.g., display an error message
      console.error('Failed to register user:', error);
    }
  };

  return (
    <section className='sign-up account section-wrapper'>
      <div className='section-container-narrow'>
        <h2>Create an account</h2>
        <form className='user-info-form' onSubmit={handleSignUp}>
          <div className='user-infos'>
            <div className='user-info'>
              <label className='user-info-label'>First name</label>
              <input
                type='text'
                className='user-info-input'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className='user-info'>
              <label className='user-info-label'>Last name</label>
              <input
                type='text'
                className='user-info-input'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className='user-info'>
            <label className='user-info-label'>Email</label>
            <input
              type='email'
              className='user-info-input'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='user-info'>
            <label className='user-info-label'>Mobile number</label>
            <input
              type='tel'
              className='user-info-input'
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <div className='user-info'>
            <label className='user-info-label'>Password</label>
            <input
              type='password'
              className='user-info-input'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='user-info'>
            <label className='user-info-label'>Confirm Password</label>
            <input
              type='password'
              className='user-info-input'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className='user-info-CTA-button'>
            <button type='submit' className='CTA-button-one'>
              Register
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
