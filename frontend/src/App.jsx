import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./components/mode-toggle";
import { DoorClosedIcon, Menu } from "lucide-react";
import Button from "./components/Button";
import { userAuth } from "./utilities/User";
import { ToastSuccess } from "./utilities/Toast";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = userAuth();
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    ToastSuccess("User logged out.");
  };
  return (
    <div className="min-h-screen w-full px-5 py-10">
      {/* NavBar section */}
      <nav className="flex items-center justify-between w-full pb-5 relative">
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold">
          <Link to={"/home"}>Pay Now</Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:flex gap-8 underline-offset-8 transition-all text-slate-600 dark:text-white  items-center">
          <Link className="hover:underline" to={"/about"}>
            About
          </Link>
          <Link className="hover:underline" to={"/contact"}>
            Contact
          </Link>
          <Link className="hover:underline" to={"/transaction"}>
            Transactions
          </Link>
          <Link className="hover:underline" to={"/banks"}>
            banks
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden space-x-5 sm:block">
          <ModeToggle />
          {isAuthenticated ? (
            <button
              onClick={() => signOut()}
              className="bg-red-600 px-4 py-2 capitalize text-white rounded-md"
            >
              Sign-Out
            </button>
          ) : (
            <button
              onClick={() => navigate("/signin")}
              className="bg-blue-600 text-white rounded-md px-4 py-2 capitalize"
            >
              Sign-In
            </button>
          )}
        </div>

        {/* Slide-In Menu for Small Devices */}
        <div className="sm:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? "" : <Menu className="text-3xl" />}
          </button>
        </div>
        <div
          className={`fixed top-0 right-0 h-full w-[55%] bg-slate-200 bg-opacity-90 dark:bg-slate-800 shadow-lg z-50 transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out sm:hidden`}
        >
          <div className="flex w-full items-center justify-around py-5">
            <DoorClosedIcon
              className="bg-black p-2 rounded-md size-9 hover:scale-95 transition-all"
              onClick={toggleMenu}
            />
            <ModeToggle />
          </div>
          <div className="flex text-slate-600 dark:text-white pl-10 flex-col items-start p-2 space-y-5 mt-10">
            <Link className="hover:underline" to={"/"} onClick={toggleMenu}>
              About
            </Link>
            <Link className="hover:underline" to={"/"} onClick={toggleMenu}>
              Contact
            </Link>
            <Link className="hover:underline" to={"/"} onClick={toggleMenu}>
              Transactions
            </Link>
            <Link
              className="hover:underline"
              to={"/banks"}
              onClick={toggleMenu}
            >
              banks
            </Link>
            <div className="flex items-center gap-5">
              {isAuthenticated ? (
                <button
                  onClick={() => signOut()}
                  className="bg-red-600 hover:bg-red-700 hover:scale-95 transition-all px-4 py-2 capitalize text-white rounded-md w-full"
                >
                  Sign-Out
                </button>
              ) : (
                <button
                  onClick={() => navigate("/signin")}
                  className="bg-blue-600 text-white hover:bg-blue-700 hover:scale-95 transition-all rounded-md px-4 py-2 capitalize w-full"
                >
                  Sign-In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <hr className="w-full" />

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row sm:px-5 md:px-14 py-10 gap-20 w-full items-center">
        <div className="w-full py-10 flex flex-col space-y-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold capitalize leading-tight">
            Make <br />
            Secure Payment
          </h1>
          <p className="text-base text-gray-600 sm:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
            blanditiis quod beatae aut delectus?
          </p>
          <Button
            onclick={() => navigate("/home")}
            text="Click here to get started"
            className="bg-black dark:bg-white animate-pulse dark:text-black hover:scale-95 transition-all text-white"
          />
          <div className="flex flex-wrap gap-5 sm:gap-10 items-center">
            <img
              className="w-16 cursor-pointer sm:w-24 md:w-32 hover:scale-95 transition-all"
              src="./images/client-audiophile.svg"
              alt="Audiophile"
            />
            <img
              className="w-16 cursor-pointer sm:w-24 md:w-32 hover:scale-95 transition-all"
              src="./images/client-meet.svg"
              alt="Meet"
            />
            <img
              className="w-16 cursor-pointer sm:w-24 md:w-32 hover:scale-95 transition-all"
              src="./images/client-maker.svg"
              alt="Maker"
            />
            <img
              className="w-16 cursor-pointer sm:w-24 md:w-32 hover:scale-95 transition-all"
              src="./images/client-databiz.svg"
              alt="Databiz"
            />
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <img
            className="w-[280px] cursor-pointer sm:w-[360px]"
            src="./images/image-hero-desktop.png"
            alt="Hero"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
