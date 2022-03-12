import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import {  useSelector } from 'react-redux'
import {Link} from "react-router-dom"
import {logOut} from "../redux/userRedux"
import { useDispatch } from "react-redux";
import { useState } from "react";
const Container = styled.div`
  position: relative;
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`

  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`

  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const NameItem = styled.div`
  font-size: 14px;
  font-weight:bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;  
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
  margin-top:5px;
`;

const ListContainer = styled.div`
  position: relative;
  top: 100%;
  right: 0;
  z-index: 2;
  &:hover {
    background-color: #e9f5f5;
    transition: all 0.5s ease;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  background-color:#EAF6FF;
  position: absolute;
  width: 200px;
  z-index: 1;
`;

const ListItem = styled.li`
  padding: 8px 12px;
  
`;

const UserContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin-right: 10px;
  color: #555;
  width: 100px;
  height: 20px;
  margin-left:0px;

`;


const Navbar = () => {
  const dispatch = useDispatch()
  let isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  let username = useSelector((state) => state.user.username)
  const quantity = useSelector(state=> state.cart.quantity)
  
  const [open, setOpen] = useState(false)

  const handleLogOut =() => {
    dispatch(logOut())
  }

  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>Shop.</Logo>
        </Center>
        <Right>

        {!isLoggedIn && (
          <>
          <Link to="/register"><MenuItem>REGISTER</MenuItem></Link>
          <Link to="/login"><MenuItem>SIGN IN</MenuItem></Link>
          </> 
        )}
        {isLoggedIn && (
          <>
          <ListContainer>
          <UserContainer onClick={handleClick}>
          <NameItem >{username}</NameItem>
          </UserContainer>
          {open &&
          <List className="dropdown">
          <Link to="/profile">
            <ListItem>
              show Profile
            </ListItem>
          </Link> 
          </List>
          }
          </ListContainer>
          <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
          </>
        )}
          <Link to="/cart"> 
          <MenuItem>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
