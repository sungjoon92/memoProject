import { Outlet } from "react-router-dom";
import logo from "../assets/logo.png";

function Layout() {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} alt="Logo" className="app-logo" />
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
