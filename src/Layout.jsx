import { Link } from "wasp/client/router";
import { useAuth, logout } from "wasp/client/auth";
import { getUsername } from "wasp/auth";
import { Helmet } from "react-helmet";
import { useState, useRef, useEffect } from "react";
import "./Main.css";

const Header = () => {
  const { data: user } = useAuth();

  return (
    <header className="bg-primary-800 text-white p-4">
      <div className="container mx-auto px-4 py-2 flex justify-between w-2/3 mx-auto">
        <HeaderLogo />
        <div className="flex items-center">
          {user && <UserProfileMenu user={user} />}
        </div>
        {!user && (
          <div className="flex">
            <LoginLink />
            <SignupLink />
          </div>
        )}
      </div>
    </header>
  );
};

const HeaderLogo = () => {
  return (
    <Link to="/">
      <img
        src="/logo.jpg"
        alt="MkaeLoop Logo"
        className="w-14 h-14 rounded-full"
      />
    </Link>
  );
};

const UserProfileMenu = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
    setTimeout(() => {
      setIsMenuOpen(true);
      setTimeout(() => {
        setIsMenuOpen(false);
      }, 2000);
    }, 500);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex items-center cursor-pointer" onClick={toggleMenu}>
        <img
          src={user.profileImage}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <span className="ml-2">Hi, {getUsername(user)}!</span>
      </div>
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg">
          <Link to={`/${getUsername(user)}`}>
            <button
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              onClick={handleMenuItemClick}
            >
              Profile
            </button>
          </Link>
          <button
            onClick={() => {
              logout();
              handleMenuItemClick();
            }}
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

const LoginLink = () => {
  return (
    <Link to="/login">
      <h1 className="text-xl2 underline mr-4">Log in</h1>
    </Link>
  );
};

const SignupLink = () => {
  return (
    <Link to="/signup">
      <h1 className="text-xl2 underline">Sign up</h1>
    </Link>
  );
};

const Footer = () => {
  return (
    <footer>
      <div className="container mx-auto p-4">
        <p className="text-center text-gray-500 text-sm">
          MkaeLoop 🐙 ~ Powered by 🐝 ~ Made with ❤️
        </p>
      </div>
    </footer>
  );
};

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>MkaeLoop ~ Just ship </title>
        <title>CreatorLoop</title>
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 py-2 flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
