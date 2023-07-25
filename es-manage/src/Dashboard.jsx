import { useLocation } from 'react-router-dom';
import logo from './assets/logo.svg';
import search from './assets/search.svg';
import dashboard from './assets/dashboard.svg';
import recent from './assets/recent.svg';
import alert from './assets/alert.svg';
import asset from './assets/asset.svg';
import userIcon from './assets/user.svg';
import setting from './assets/setting.svg';
import './App.css';

function Dashboard() {
  const location = useLocation();
  const userFromState = location.state ? location.state.user : null;
  const userFromStorageItem = localStorage.getItem('user');
  let userFromStorage = null;
  try {
    if (userFromStorageItem && userFromStorageItem !== 'undefined') {
      userFromStorage = JSON.parse(userFromStorageItem);
    }
  } catch (e) {
    console.error(e);
    // handle parsing error if necessary
  }

  const user = userFromState || userFromStorage;
  const displayName = user ? user.displayName : 'Guest';

  return (
    <div className="bg-quaternary h-screen">
      <div className="bg-quinary w-64 h-screen">
        <img src={logo} alt="logo" className="w-20 ml-20 pt-10 max-md:w-16" />
        <nav className="flex flex-col gap-10 p-12">
          <ul className="">
            <li className="inline-flex items-center py-6">
              <img src={dashboard} alt="dashboard" className="w-8" />
              <span className="text-white font-medium ml-2">Dashboard</span>
            </li>
            <br />
            <li className="inline-flex items-center py-6">
              <img src={alert} alt="alert" className="w-8" />
              <span className="text-white font-medium ml-2 ">Alerts</span>
            </li>
            <br />
            <li className="inline-flex items-center py-6">
              <img src={asset} alt="asset" className="w-8" />
              <span className="text-white font-medium ml-2 ">Assets</span>
            </li>
            <br />
            <li className="inline-flex items-center py-6">
              <img src={recent} alt="recent" className="w-8" />
              <span className="text-white font-medium ml-2 ">Recent Activities</span>
            </li>
            <br />
            <li className="inline-flex items-center py-6">
              <img src={setting} alt="setting" className="w-8" />
              <span className="text-white font-medium ml-2 ">Settings</span>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container">
        <div className="absolute top-2 left-96">
          <div className="mt-16 inline-flex items-center">
            <form action="">
              <input type="text" className="bg-white text- text-lg text-black bg-transparent border-none rounded-xl py-3 px-8 w-[50rem] mr-32" placeholder="Search" />
            </form>
            <span className="text-white font-semibold text-xl mx-4">{displayName}</span>
            <img src={userIcon} alt="user" className="w-[52px]" />
          </div>
          <div className="mt-20 ml-96">
            <h1 className="text-white font-semibold text-4xl">Hi, {displayName}!</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
