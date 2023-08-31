import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.svg';
import ellipse from './assets/ellipse.svg';
import ellipse2 from './assets/ellipse-2.svg';
import esmanage from './assets/esmanage.svg';
import border from './assets/border.svg';
import './App.css';

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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
        url: 'https://localhost:7240/api/auth/login',
      };
      let response = await axios(axiosConfig);
      console.log(response.data);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard', { state: { user } });
    } catch (error) {
      console.error(error);
      setError(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-primary h-screen">
      <div className="container">
        <img src={logo} alt="logo" className="w-20 ml-12 pt-10 max-md:w-16" />
        <div className="max-md:hidden">
          <h1 className="text-6xl font-semibold text-white mt-40 ml-24 mb-12">
            Welcome to <br /> our platform!
          </h1>
          <img src={esmanage} alt="esmanage" className="w-40 ml-24" />
        </div>
        <div className="flex justify-center text-center max-md:mt-6">
          <img src={ellipse} alt="ellipse" className="absolute text-center w-52 md:top-[80px] md:left-[765px] max-md:hidden" />
          <img src={ellipse2} alt="ellipse2" className="absolute text-center w-36 md:top-[550px] md:right-[180px] max-md:hidden" />
          <img src={border} alt="border" className="absolute text-center backdrop-blur-md w-96 md:top-[80px] md:left-[900px]" />
        </div>
        <div className="absolute z-10 md:top-[80px] md:left-[900px] px-12 pt-6 max-md:mt-">
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
          {error && <p className="text-red-500 mt-6">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
