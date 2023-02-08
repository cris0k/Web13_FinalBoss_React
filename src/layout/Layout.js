import { Outlet } from 'react-router-dom'
import Header from '../layout/Header'

const Layout = ({ children, title, ...props}) => <div>
    <Header {...props}/>
    <main>
        <Outlet />
    </main>
    <footer>@ 2023 UwUntu Final Boss Project</footer>
</div>

export default Layout