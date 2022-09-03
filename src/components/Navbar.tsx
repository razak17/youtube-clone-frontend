import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 56px;
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const StyeldSearch = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const StyledInput = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
`;

const StyledButton = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Navbar = () => {
  return (
    <Container>
      <StyledWrapper>
        <StyeldSearch>
          <StyledInput placeholder="Search" />
          <SearchOutlinedIcon />
        </StyeldSearch>
        <Link to="signin" style={{ textDecoration: "none" }}>
          <StyledButton>
            <AccountCircleOutlinedIcon />
            SIGN IN
          </StyledButton>
        </Link>
      </StyledWrapper>
    </Container>
  );
};

export default Navbar;

