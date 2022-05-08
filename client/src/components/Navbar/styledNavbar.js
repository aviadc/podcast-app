import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const NavbarContainer = styled.nav`
  /* height: ${(props) => (props.isMenuOpened ? "100vh" : "80px")}; */
  height: 9vh;
  display: flex;
  justify-content: space-between;
  background: transparent;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 3;
`
export const NavbarRight = styled.div`
  width: 400px;
  display: flex;
  justify-content: flex-end;
`
export const NavbarLeft = styled.div`
  width: 30%;
  /* border: 1px solid black; */
  padding: 0.5rem;
`
export const NavbarLink = styled(Link)`
  font-size: 2rem;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  margin: 10px;

  &:hover{
    transform: scale(1.1);
  }
`

export const NavbarNarrow = styled.div`
  height: 100%;
  border: 1px solid blue;
  backdrop-filter: blur(5px);
  
  
  @media screen and (min-width: 500px) {
    display: none;
    
  }
`

export const NavbarWide = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media screen and (max-width: 500px){
    display: none;
  }
`

export const NavbarMenuButton = styled.div`
  font-size: 3rem;
  /* border: 1px solid brown; */
  cursor: pointer;
  @media screen and (min-width: 500px){
    display: none;
  }

`

export const MenuButtonContainer = styled.div`
   display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
`
export const NavbarMenuNarrowLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid yellow; */
`