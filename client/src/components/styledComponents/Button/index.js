import styled from "styled-components";

const Button = styled.button`
  background-color: black;
  color: gold;
  cursor: pointer;
  border-radius: 20px;
  padding: 5px ;
  font-size: ${props=>props.fontSize} ;
  transition: all 0.4s ease-in-out;

  &:hover{
    transform: scale(1.1);
  }
`

export default Button