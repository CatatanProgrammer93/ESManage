import { useLocation, useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function AppLayout({ children }) {
  const location = useLocation();
  const userFromState = location.state || null;
  const userFromStorageItem = localStorage.getItem("user");
  let userFromStorage = null;
  try {
    if (userFromStorageItem && userFromStorageItem !== "undefined") {
      userFromStorage = JSON.parse(userFromStorageItem);
    }
  } catch (e) {
    console.error(e);
    // Handle parsing error if necessary
  }

  // Here, the user object is preferred from state; if not available, then from storage
  const user = userFromState || userFromStorage;

  // Extract the displayName and accessToken, defaulting to "Guest" and null respectively if not available
  const displayName = user?.displayName || "Guest";
  const accessToken = user ? localStorage.getItem("token") : null;

  const decodedToken = jwtDecode(accessToken);

  const navigate = useNavigate(); // Obtain navigate function

  const handleLogout = () => {
    // Clearing user information from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Ensure the token is also removed

    // Redirect to /login
    navigate("/login");
  };

  return (
    <div>
      <header className="navbar navbar-expand-md navbar-light d-print-none">
        <div className="container-xl">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
            <Link to="/dashboard">
              <span>ESManage</span>
            </Link>
          </h1>
          <div className="navbar-nav flex-row order-md-last">
            <div className="nav-item dropdown d-none d-md-flex me-3">
              <Link
                to="#"
                className="nav-link px-0"
                data-bs-toggle="dropdown"
                tabIndex="-1"
                aria-label="Show notifications"
              >
                {/* Download SVG icon from http://tabler-icons.io/i/bell */}
                  <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                    <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/>
                  </svg>
                <span className="badge bg-red"></span>
              </Link>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-card">
                <div className="card">
                  <div className="card-body">There is no new notification.</div>
                </div>
              </div>
            </div>
            <div className="nav-item dropdown">
              <Link
                to="#"
                className="nav-link d-flex lh-1 text-reset p-0"
                data-bs-toggle="dropdown"
                aria-label="Open user menu"
              >
                <div className="d-none d-xl-block ps-2">
                  {/* Assuming user data is fetched and stored in a state */}
                  <div>{displayName}</div>
                  <div className="mt-1 small text-muted">
                    {/* Replace with user's username */}
                  </div>
                </div>
              </Link>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              {/* <Link to="/profile/edit" className="dropdown-item">
                  Settings
                </Link>*/}
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="navbar-expand-md">
        <div
          className="navbar navbar-light navbar-collapse collapse"
          id="navbar-menu"
        >
          <div className="navbar">
            <div className="container-xl">
              <div className="row flex-fill align-items-center">
                <div className="col">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link to="/dashboard" className="nav-link">
                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
                                <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                            </svg>
                        </span>
                        <span className="nav-link-title">Dashboard</span>
                      </Link>
                    </li>
{/* MASTER */}
{(decodedToken["Show Category"] || decodedToken["Show Brand"] || decodedToken["Show Item"]) && (
                      <li className="nav-item dropdown">
                        <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                          <span className="nav-link-icon d-md-none d-lg-inline-block">
                          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
                                <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                            </svg>
                          </span>
                          <span className="nav-link-title">Master</span>
                        </Link>
                        <ul className="dropdown-menu">
                          {decodedToken["Show Category"] && (
                            <li>
                                        <Link to="/item-department" className="dropdown-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
                                        <path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" />
                                    </svg>
                                    <span className="icon-text">Category</span>
          </Link>
                            </li>
                          )}
                          {decodedToken["Show Brand"] && (
                            <li>
                              <Link to="/brand" className="dropdown-item">Brand</Link>
                            </li>
                          )}
                          {decodedToken["Show Item"] && (
                            <li>
                              <Link to="/item" className="dropdown-item">Item</Link>
                            </li>
                          )}
                        </ul>
                      </li>
                    )}
{/* TRANSACTION */}
{decodedToken["Show Supplier"] && decodedToken["Show Item Supplier"] && decodedToken["Show Item Supplier Transaction"] && (
                      <li className="nav-item dropdown">
                        <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                          <span className="nav-link-icon d-md-none d-lg-inline-block">
                          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
                                <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                            </svg>
                          </span>
                          <span className="nav-link-title">Transaction</span>
                        </Link>
                        <ul className="dropdown-menu">
                          {decodedToken["Show Supplier"] && (
                            <li>
                              <Link to="/supplier" className="dropdown-item">Supplier</Link>
                            </li>
                          )}
                          {decodedToken["Show Item Supplier"] && (
                            <li>
                              <Link to="/item-supplier" className="dropdown-item">Item Supplier</Link>
                            </li>
                          )}
                          {decodedToken["Show Item Supplier Transaction"] && (
                            <li>
                              <Link to="/item-supplier-transaction" className="dropdown-item">Item Supplier Transaction</Link>
                            </li>
                          )}
                        </ul>
                      </li>
                    )}

{/* AUTHORITY */}
{decodedToken["Show User"] && decodedToken["Show Role"] && (
                      <li className="nav-item dropdown">
                        <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                          <span className="nav-link-icon d-md-none d-lg-inline-block">
                          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
                                <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                            </svg>
                          </span>
                          <span className="nav-link-title">Authority</span>
                        </Link>
                        <ul className="dropdown-menu">
                          {decodedToken["Show User"] && (
                            <li>
                              <Link to="/user" className="dropdown-item">User</Link>
                            </li>
                          )}
                          {decodedToken["Show Role"] && (
                            <li>
                              <Link to="/role" className="dropdown-item">Role</Link>
                            </li>
                          )}
                        </ul>
                      </li>
                    )}


                    {decodedToken["Show Report"] && (
                        <li className="nav-item">
                            <Link
                                to="/report"
                                className="nav-link"
                            >
                                <span className="nav-link-icon d-md-none d-lg-inline-block">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                  <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"/>
                                  </svg>
                                </span>
                                <span className="nav-link-title">
                                    Report
                                </span>
                            </Link>
                        </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div className="col mt-3">
          <div className="page-header d-print-none">
            <div className="container-xl">
              <div className="row g-2 align-items-center">
                <div className="col">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer footer-transparent d-print-none">
        <div className="container-xl">
          <div className="row text-center align-items-center flex-row-reverse">
            <div className="col-lg-auto ms-lg-auto">
              <ul className="list-inline list-inline-dots mb-0">
                <li className="list-inline-item">
                  <Link to="/privacy-policy" className="link-secondary">
                    Privacy Policy
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/terms-of-service" className="link-secondary">
                    Terms of Service
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/help-center" className="link-secondary">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-12 col-lg-auto mt-3 mt-lg-0">
              <ul className="list-inline list-inline-dots mb-0">
                <li className="list-inline-item">
                  Copyright &copy; {new Date().getFullYear()}{" "}
                  <Link to="/dashboard" className="link-secondary">
                    ESManage
                  </Link>
                  . All rights reserved.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AppLayout;
