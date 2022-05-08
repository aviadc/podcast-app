import styled from "styled-components";

const StyledPageBackground = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: -1;
  background-image: url(${props=>props.bbb});  
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`

export default StyledPageBackground