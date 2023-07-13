import React, { useState } from 'react';
import axios from 'axios';
import logo from './assets/logo.svg';
import ellipse from './assets/ellipse.svg';
import ellipse2 from './assets/ellipse-2.svg';
import esmanage from './assets/esmanage.svg';
import border from './assets/border.svg';
import './App.css';

function Login(props) {
  const [userName, setUserName] = useState(''); // Changed variable name to match API expectation
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let axiosConfig = {
        method: 'POST',
        data: {
          userName: userName,
          password: password,
        },
        url: 'https://localhost:7240/auth/login',
      };

      let response = await axios(axiosConfig);

      console.log(response.data);

      // Handle the response
      const { token, user } = response.data;

      // Store token and user in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to home or dashboard page
      props.history.push('/dashboard');
    } catch (error) {
      console.error(error);
      setError(`An error occurred during login. Please try again. Detailed error: ${error.message}. Full error: ${JSON.stringify(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-primary h-screen">
      <div className="container">
        <img src={logo} alt="logo" className="w-20 ml-12 pt-10" />
        <img src={ellipse} alt="ellipse" className="absolute w-52 top-[80px] left-[765px]" />
        <img src={ellipse2} alt="ellipse2" className="absolute w-36 top-[550px] right-[180px]" />
        <img src={border} alt="border" className="absolute backdrop-blur-md w-96 top-[80px] left-[900px]" />
        <div>
          <h1 className="text-6xl font-semibold text-white mt-40 ml-24 mb-12">
            Welcome to <br /> our platform!
          </h1>
          <img src={esmanage} alt="esmanage" className="w-40 ml-24" />
        </div>
        <div className="absolute top-[80px] left-[900px] px-12 pt-6">
          <h2 className="text-3xl font-semibold text-white mt-24">Login</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" className="text-xl text-white bg-transparent border rounded-xl py-3 px-8 mt-16" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <br />
            <input type="password" className="text-xl text-white bg-transparent border rounded-xl py-3 px-8 mt-6" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            <button type="submit" className="bg-gradient-to-r from-secondary to-tertiary border-none text-xl font-semibold text-white border rounded-xl py-3 px-8 mt-12 text-center" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
