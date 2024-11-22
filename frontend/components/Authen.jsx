
// import React, { useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import "../components/Auth.css";
// import { useNavigate } from "react-router-dom";

// const Auth = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [isLogin, setIsLogin] = useState(true);
//   const [loading, setLoading] = useState(false); // Add loader state
//   const navigate = useNavigate();

//   const validateInputs = () => {
//     if (!username || username.length < 3) {
//       toast.error('Username must be at least 3 characters long.');
//       return false;
//     }
//     if (!password || password.length < 6) {
//       toast.error('Password must be at least 6 characters long.');
//       return false;
//     }
//     if (!isLogin && (!email || !/\S+@\S+\.\S+/.test(email))) {
//       toast.error('Please provide a valid email address.');
//       return false;
//     }
//     return true;
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     if (!validateInputs()) return;

//     setLoading(true);
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/accounts/register/', {
//         username,
//         password,
//         email,
//       });
//       console.log('Registration successful:', response.data);
//       toast.success('Registration successful!');
//       setIsLogin(true);
//     } catch (error) {
//       console.error('Error during registration:', error.response?.data || error.message);
//       toast.error(error.response?.data?.message || 'Registration failed!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!validateInputs()) return;

//     setLoading(true);
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/accounts/login/', {
//         username,
//         password,
//       });
//       console.log('Login successful:', response.data);
//       localStorage.setItem('access', response.data.access); // Store token securely
//       toast.success('Login successful!');
//       navigate("/profile");
//     } catch (error) {
//       console.error('Error during login:', error.response?.data || error.message);
//       toast.error(error.response?.data?.message || 'Login failed!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2 className="auth-heading">{isLogin ? 'Login' : 'Register'}</h2>
//       <form className="auth-form" onSubmit={isLogin ? handleLogin : handleRegister}>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Username"
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />
//         {!isLogin && (
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             required
//           />
//         )}
//         <button type="submit" disabled={loading}>
//           {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
//         </button>
//       </form>
//       <div className="auth-toggle">
//         <button onClick={() => setIsLogin(!isLogin)}>
//           {isLogin ? 'Switch to Register' : 'Switch to Login'}
//         </button>
//       </div>
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop
//         closeButton={false}
//       />
//     </div>
//   );
// };

import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import "../components/Auth.css";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false); // Add loader state
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility toggle
  const navigate = useNavigate();

  // Improved password validation function
  const validateInputs = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    
    if (!username || username.length < 3) {
      toast.error('Username must be at least 3 characters long.');
      return false;
    }
    if (!password || !passwordRegex.test(password)) {
      toast.error('Password must be at least 6 characters long, contain an uppercase letter, a number, and a special character.');
      return false;
    }
    if (!isLogin && (!email || !/\S+@\S+\.\S+/.test(email))) {
      toast.error('Please provide a valid email address.');
      return false;
    }
    return true;
  };

  // Password suggestion function
  const generateSuggestedPassword = () => {
    const length = 8;  // Minimum length of 8 characters
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialCharacters = '@$!%*?&';
    
    let password = '';
    password += upperCaseLetters.charAt(Math.floor(Math.random() * upperCaseLetters.length));
    password += lowerCaseLetters.charAt(Math.floor(Math.random() * lowerCaseLetters.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    password += specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));
    
    while (password.length < length) {
      const allCharacters = upperCaseLetters + lowerCaseLetters + numbers + specialCharacters;
      password += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
    }

    return password;
  };

  const suggestPassword = () => {
    const password = generateSuggestedPassword();
    toast.info(`Suggested password: ${password}`);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/accounts/register/', {
        username,
        password,
        email,
      });
      console.log('Registration successful:', response.data);
      toast.success('Registration successful!');
      setIsLogin(true);
    } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Registration failed!');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/accounts/login/', {
        username,
        password,
      });
      console.log('Login successful:', response.data);
      localStorage.setItem('access', response.data.access); // Store token securely
      toast.success('Login successful!');
      navigate("/profile");
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Login failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-heading">{isLogin ? 'Login' : 'Register'}</h2>
      <form className="auth-form" onSubmit={isLogin ? handleLogin : handleRegister}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        
        {/* Password input with eye icon */}
        <div className="password-container">
          <input
            type={passwordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <span className="eye-icon" onClick={() => setPasswordVisible(!passwordVisible)}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        
        {/* Email input (only shown for registration) */}
        {!isLogin && (
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
        </button>

        {/* Button to suggest a password */}
        <button type="button" onClick={suggestPassword} disabled={loading}>
          Suggest Password
        </button>
      </form>

      {/* Toggle between Login and Register forms */}
      <div className="auth-toggle">
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Switch to Register' : 'Switch to Login'}
        </button>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeButton={false}
        style={{ width: '600px' }} // Adjust the width as needed
      />
    </div>
  );
};

export default Auth;

