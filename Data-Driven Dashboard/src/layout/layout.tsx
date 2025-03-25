import   { useState } from 'react' 
import LeftMenuBar from './leftmenubar'
import TopNavbar from "./tapnavbar"
import { Outlet } from 'react-router-dom'
const Layout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
  return ( 
<div className='overflow-auto scrollbar-none custom-scrollbar' style={{ display: 'flex', minHeight: '98dvh' ,backgroundColor: "rgba(243, 247, 252, 1)",padding:.7,gap:1}}>
          <LeftMenuBar   />
          <div
            // component="main"
            className="MainContent overflow-auto scrollbar-none custom-scrollbar"
            style={{  flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                overflow: 'auto',
              }}
              >
                <TopNavbar  />
                <Outlet />      
          </div>  
      </div>
  )
}

export default Layout