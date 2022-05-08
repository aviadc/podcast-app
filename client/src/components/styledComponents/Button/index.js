import styled from "styled-components";

const Button = styled.button`
  background-color: yellow;
  cursor: pointer;
  border-radius: 20px;
  padding: 5px ;
  font-size: ${props=>props.fontSize} ;
`

export default Button