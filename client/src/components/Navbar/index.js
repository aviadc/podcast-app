import React, { useState } from 'react'
import {
  NavbarContainer, NavbarRight, NavbarLeft, NavbarLink, NavbarNarrow, NavbarWide,
  NavbarMenuButton, NavbarMenuNarrowLinksContainer, MenuButtonContainer
} from './styledNavbar'
import MenuIcon from '../MenuIcon'
import logo from '../../img/brandPodco.JPG'

const Navbar = () => {
  const [isMenueOpened, setIsMenueOpened] = useState(false);

  const toggleMenu = () => {
    setIsMenueOpened((curr) => !curr);
  }
  return (
    <NavbarContainer isMenueOpened={isMenueOpened}>
      <NavbarLeft>
        <img src={logo} alt='logo' style={{ width: '50px' }} />
      </NavbarLeft>
      <NavbarRight>
        <NavbarWide>
          <NavbarLink to={'/'}>
            Home
          </NavbarLink>
          <NavbarLink to={'/podcasts'}>
            Podcasts
          </NavbarLink>
          <NavbarLink to={'/profile'}>
            profile
          </NavbarLink>
        </NavbarWide>
        <NavbarNarrow>
          <MenuButtonContainer>
            <NavbarMenuButton onClick={toggleMenu}>
              {isMenueOpened ? <div>X</div> : <MenuIcon />}
            </NavbarMenuButton>
          </MenuButtonContainer>
          {isMenueOpened &&
            <NavbarMenuNarrowLinksContainer>
              <NavbarLink to={'/'} onClick={toggleMenu}>
                Home
              </NavbarLink>
              <NavbarLink to={'/podcasts'} onClick={toggleMenu}>
                Podcasts
              </NavbarLink>
              <NavbarLink to={'/profile'} onClick={toggleMenu}>
                profile
              </NavbarLink>
            </NavbarMenuNarrowLinksContainer>}
        </NavbarNarrow>
      </NavbarRight>
    </NavbarContainer>
  )
}

export default Navbar