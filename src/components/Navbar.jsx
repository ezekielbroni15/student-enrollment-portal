import { NavLink } from "react-router-dom";

const getNavLinkClass = ({ isActive }) => {
  return isActive ? "nav-link active-nav-link" : "nav-link";
};

const Navbar = () => {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-content">
        <NavLink to="/" className={getNavLinkClass}>
          Home
        </NavLink>

        <NavLink to="/enroll" className={getNavLinkClass}>
          Enroll
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
