
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
const Layout = ({ children }) => {
    return (
        <SideBar >
            <Header />
            {children}
        </SideBar>
    )
}

export default Layout