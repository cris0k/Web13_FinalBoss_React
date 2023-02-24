import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import AuthButton from "../auth/AuthButton";

function Header() {
  const { token } = useSelector((state) => state.auth)

  return (
    <header>
      <NavLink to='/' className="main-title">
        <h1>UwUntu's Final BOSS</h1>
      </NavLink>
      
      <section className="nav-buttons"> 
         {token ? (
        <nav className="header-nav">
            <NavLink to="/adverts/new" className="nav-link">
            | New Advert |
            </NavLink>
            
            <NavLink to="/user-profile" className="nav-link">
            | My Profile |
            </NavLink> 
        </nav>
            ) : (
          <nav>
            <NavLink to="/register" className='button-log'>
            Sign Up
            </NavLink> 
          </nav>
            )}
        <AuthButton />
        </section>

    </header>
  )
  
}

export default Header;