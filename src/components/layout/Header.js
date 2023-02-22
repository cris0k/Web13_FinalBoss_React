import { NavLink } from "react-router-dom";
import AuthButton from "../auth/AuthButton";

function Header() {

  return (
    <header>
      <NavLink to='/' className="main-title">
        <h1>UwUntu's Final BOSS</h1>
      </NavLink>
      
      <section> 
        <nav className="header-nav">
            <NavLink to="/adverts/new" className="nav-link">
            New Advert
            </NavLink>
            <NavLink to="/user-profile" className="nav-link">
            My Profile
            </NavLink>
            <NavLink to="/register" className="nav-link">
            Sign Up
            </NavLink>
        </nav>
        </section>
      
      <AuthButton />
    </header>
  )
  
}

export default Header;