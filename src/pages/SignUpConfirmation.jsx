import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Import useState and useEffect hooks
import '../stylings/account.css';

const SignUpConfirmation = () => {
  // Define a state variable to store user-specific data (if needed)
  const [userData, setUserData] = useState({});

  // Simulate fetching user data (you can replace this with an actual API call)
  useEffect(() => {
    // Simulate fetching user data after successful registration
    // You can replace this with an actual API call to retrieve user data
    const fetchUserData = async () => {
      try {
        // Replace with your API endpoint to fetch user data
        const response = await fetch('/api/get_user_data'); // Adjust the endpoint
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <section className='confirmation account section-wrapper'>
      <div className='section-container-narrow'>
        <h2>Account confirmed</h2>
        <p>
          Congratulations, {userData.firstName}! Your account has been successfully created.
          Jump right in to explore the new era of cinema.
        </p>
        <Link to='/browse-cinema'>
          <button className='CTA-button-one'>Browse Cinera</button>
        </Link>
      </div>
    </section>
  );
}

export default SignUpConfirmation;
