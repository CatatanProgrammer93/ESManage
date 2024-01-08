import { useLocation, useNavigate, Link } from "react-router-dom";

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
                <Link to="/profile/edit" className="dropdown-item">
                  Settings
                </Link>
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
                          </svg>
                        </span>
                        <span className="nav-link-title">Dashboard</span>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/item-department" className="nav-link">
                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <path d="M9 11l3 3l8 -8"></path>
                            <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"></path>
                          </svg>
                        </span>
                        <span className="nav-link-title">Item Department</span>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/brand" className="nav-link">
                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <path d="M9 11l3 3l8 -8"></path>
                            <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"></path>
                          </svg>
                        </span>
                        <span className="nav-link-title">Brand</span>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/item" className="nav-link">
                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <path d="M9 11l3 3l8 -8"></path>
                            <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"></path>
                          </svg>
                        </span>
                        <span className="nav-link-title">Item</span>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/supplier" className="nav-link">
                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <path d="M9 11l3 3l8 -8"></path>
                            <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"></path>
                          </svg>
                        </span>
                        <span className="nav-link-title">Supplier</span>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/item-supplier" className="nav-link">
                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <path d="M9 11l3 3l8 -8"></path>
                            <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"></path>
                          </svg>
                        </span>
                        <span className="nav-link-title">Item Supplier</span>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        to="/item-supplier-transaction"
                        className="nav-link"
                      >
                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <path d="M9 11l3 3l8 -8"></path>
                            <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"></path>
                          </svg>
                        </span>
                        <span className="nav-link-title">
                          Item Supplier Transaction
                        </span>
                      </Link>
                    </li>
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
