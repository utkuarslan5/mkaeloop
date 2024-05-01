import { Link } from "react-router-dom";
import { useAuth, logout } from "wasp/client/auth";
import { getUsername } from "wasp/auth";
import { Helmet } from "react-helmet";
import "./Main.css";


const Header = () => {
  const { data: user } = useAuth();

  return (
    <header className="bg-primary-800 text-white p-4">
      <div className="container mx-auto px-4 py-2 flex justify-between w-2/3 mx-auto">
        <HeaderLogo />
        {user ? <UserGreeting user={user} /> : <LoginLink />}
      </div>
    </header>
  );
};

const HeaderLogo = () => {
  return (
    <Link to="/">
      <h1 className="text-xl2 font-semibold">MkaeLoop</h1>
    </Link>
  );
};

const UserGreeting = ({ user }) => {
  return (
    <span>
      Hi, {getUsername(user)}!{" "}
      <button onClick={logout} className="text-xl2 underline">
        (Log out)
      </button>
    </span>
  );
};

const LoginLink = () => {
  return (
    <Link to="/login">
      <h1 className="text-xl2 underline">Log in</h1>
    </Link>
  );
};

const Footer = () => {
  return (
    <footer>
      <div className="container mx-auto p-4">
        <p className="text-center text-gray-500 text-sm">
          CreatorLoop ~ App by 🐙 Powered by 🐝 Made with ❤️
        </p>
      </div>
    </footer>
  );
};

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>CreatorLoop</title>
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 py-2 flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
