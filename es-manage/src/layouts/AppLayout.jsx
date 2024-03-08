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
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
                                <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                            </svg>
                        </span>
                        <span className="nav-link-title">Dashboard</span>
                      </Link>
                    </li>
                    {decodedToken["Show Category"] && (
                        <li className="nav-item">
                            <Link to="/item-department" className="nav-link">
                                <span className="nav-link-icon d-md-none d-lg-inline-block">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
                                        <path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" />
                                    </svg>
                                </span>
                                <span className="nav-link-title">Category</span>
                            </Link>
                        </li>
                    )}

                    {decodedToken["Show Brand"] && (
                        <li className="nav-item">
                            <Link to="/brand" className="nav-link">
                                <span className="nav-link-icon d-md-none d-lg-inline-block">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
                                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                                    </svg>
                                </span>
                                <span className="nav-link-title">Brand</span>
                            </Link>
                        </li>
                    )}

                    {decodedToken["Show Item"] && (
                        <li className="nav-item">
                            <Link to="/item" className="nav-link">
                                <span className="nav-link-icon d-md-none d-lg-inline-block">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
                                        <path d="M248 0H208c-26.5 0-48 21.5-48 48V160c0 35.3 28.7 64 64 64H352c35.3 0 64-28.7 64-64V48c0-26.5-21.5-48-48-48H328V80c0 8.8-7.2 16-16 16H264c-8.8 0-16-7.2-16-16V0zM64 256c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H224c35.3 0 64-28.7 64-64V320c0-35.3-28.7-64-64-64H184v80c0 8.8-7.2 16-16 16H120c-8.8 0-16-7.2-16-16V256H64zM352 512H512c35.3 0 64-28.7 64-64V320c0-35.3-28.7-64-64-64H472v80c0 8.8-7.2 16-16 16H408c-8.8 0-16-7.2-16-16V256H352c-15 0-28.8 5.1-39.7 13.8c4.9 10.4 7.7 22 7.7 34.2V464c0 12.2-2.8 23.8-7.7 34.2C323.2 506.9 337 512 352 512z" />
                                    </svg>
                                </span>
                                <span className="nav-link-title">Item</span>
                            </Link>
                        </li>
                    )}

                    {decodedToken["Show Supplier"] && (
                        <li className="nav-item">
                            <Link to="/supplier" className="nav-link">
                                <span className="nav-link-icon d-md-none d-lg-inline-block">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512">
                                        <path d="M112 0C85.5 0 64 21.5 64 48V96H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 272c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 48c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 240c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 208c8.8 0 16 7.2 16 16s-7.2 16-16 16H64V416c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H112zM544 237.3V256H416V160h50.7L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z" />
                                    </svg>
                                </span>
                                <span className="nav-link-title">Supplier</span>
                            </Link>
                        </li>
                    )}

                    {decodedToken["Show Item Supplier"] && (
                        <li className="nav-item">
                            <Link to="/item-supplier" className="nav-link">
                                <span className="nav-link-icon d-md-none d-lg-inline-block">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                                        <path d="M0 80C0 35.8 35.8 0 80 0H432c44.2 0 80 35.8 80 80V368c0 26.2-12.6 49.4-32 64v48c0 17.7-14.3 32-32 32H416c-17.7 0-32-14.3-32-32V448H128v32c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V432C12.6 417.4 0 394.2 0 368V80zm129.9 72.2L112 224H400l-17.9-71.8C378.5 138 365.7 128 351 128H161c-14.7 0-27.5 10-31 24.2zM128 320a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                                    </svg>
                                </span>
                                <span className="nav-link-title">Item Supplier</span>
                            </Link>
                        </li>
                    )}

                    {decodedToken["Show Item Supplier Transaction"] && (
                        <li className="nav-item">
                            <Link
                                to="/item-supplier-transaction"
                                className="nav-link"
                            >
                                <span className="nav-link-icon d-md-none d-lg-inline-block">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512">
                                        <path d="M323.4 85.2l-96.8 78.4c-16.1 13-19.2 36.4-7 53.1c12.9 17.8 38 21.3 55.3 7.8l99.3-77.2c7-5.4 17-4.2 22.5 2.8s4.2 17-2.8 22.5l-20.9 16.2L512 316.8V128h-.7l-3.9-2.5L434.8 79c-15.3-9.8-33.2-15-51.4-15c-21.8 0-43 7.5-60 21.2zm22.8 124.4l-51.7 40.2C263 274.4 217.3 268 193.7 235.6c-22.2-30.5-16.6-73.1 12.7-96.8l83.2-67.3c-11.6-4.9-24.1-7.4-36.8-7.4C234 64 215.7 69.6 200 80l-72 48V352h28.2l91.4 83.4c19.6 17.9 49.9 16.5 67.8-3.1c5.5-6.1 9.2-13.2 11.1-20.6l17 15.6c19.5 17.9 49.9 16.6 67.8-2.9c4.5-4.9 7.8-10.6 9.9-16.5c19.4 13 45.8 10.3 62.1-7.5c17.9-19.5 16.6-49.9-2.9-67.8l-134.2-123zM16 128c-8.8 0-16 7.2-16 16V352c0 17.7 14.3 32 32 32H64c17.7 0 32-14.3 32-32V128H16zM48 320a16 16 0 1 1 0 32 16 16 0 1 1 0-32zM544 128V352c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V144c0-8.8-7.2-16-16-16H544zm32 208a16 16 0 1 1 32 0 16 16 0 1 1 -32 0z" />
                                    </svg>
                                </span>
                                <span className="nav-link-title">
                                    Item Supplier Transaction
                                </span>
                            </Link>
                        </li>
                    )}

                    {decodedToken["Show User"] && (
                        <li className="nav-item">
                            <Link
                                to="/user"
                                className="nav-link"
                            >
                                <span className="nav-link-icon d-md-none d-lg-inline-block">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                                    </svg>
                                </span>
                                <span className="nav-link-title">
                                    User
                                </span>
                            </Link>
                        </li>
                    )}

                    {decodedToken["Show Role"] && (
                        <li className="nav-item">
                            <Link
                                to="/role"
                                className="nav-link"
                            >
                                <span className="nav-link-icon d-md-none d-lg-inline-block">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                        <path d="M0 80v48c0 17.7 14.3 32 32 32H48 96V80c0-26.5-21.5-48-48-48S0 53.5 0 80zM112 32c10 13.4 16 30 16 48V384c0 35.3 28.7 64 64 64s64-28.7 64-64v-5.3c0-32.4 26.3-58.7 58.7-58.7H480V128c0-53-43-96-96-96H112zM464 480c61.9 0 112-50.1 112-112c0-8.8-7.2-16-16-16H314.7c-14.7 0-26.7 11.9-26.7 26.7V384c0 53-43 96-96 96H368h96z" />
                                    </svg>
                                </span>
                                <span className="nav-link-title">
                                    Role
                                </span>
                            </Link>
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
