import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import images from "../../assets";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const handleShowMenu = (state) => {
    if (state == true) {
      setShowMenu(!state);
    }
  };
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const session = sessionStorage.getItem("userData");
    if (session) {
      setUser(JSON.parse(session));
    }
  }, []);

  return (
    <div onClick={() => handleShowMenu(showMenu)}>
      <nav className="m-2">
        <div className="justify-between max-w-screen flex flex-wrap items-center mx-auto p-4">
          <a className="flex flex-row">
            <img src={images.commonLogo} className="h-10 mr-2" />
            <span className="self-center text-xl font-semibold whitespace-nowrap capitalize">
              {/* {user.faculty.name} */}
            </span>
          </a>
          <div style={{ position: "relative" }} className="flex">
            <button
              type="button"
              className="text-sm bg-gray-8000 rounded-lg md:me-0 focus:ring-4 self-center focus:ring-gray-300"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            >
              <img
                className="w-8 h-8 rounded-full"
                src={images.avatar}
                style={{ width: "100%" }}
                alt="user photo"
              />
              <span className="sr-only">Open user menu</span>
            </button>
            <span className="ml-10 self-center border-solid border border-gray-400 rounded-xl text-black bg-slate-50 p-2 visible sm:invisible md:visible lg:visible">
              {/* {user.user.name} */}
            </span>
            <div
              style={{ position: "absolute", top: "35px" }}
              className={`z-50 ${
                showMenu ? "" : "hidden"
              } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {/* {user.user.name} */}
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  {/* {user.user.email} */}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
