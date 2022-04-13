// Importing files from Material-UI
import React from "react";
// import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { logout } from "../../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";
import {
  Drawer,
  List,
  Divider,
  IconButton,
  ListItemText,
  ListItemIcon,
  ListItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";

export default function NavBar() {
  const drawerWidth = 240;
  const dispatch = useDispatch();
  const session = useSelector((state) => state.user.user);
  const isAuth = useSelector((state) => state.user.isLoggedIn);

  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));
  return (
    <>
      <Nav>
        <NavLink to="/">
          <img src={require("../../../images/logo.svg")} alt="logo" />
        </NavLink>
        <Bars onClick={!open ? handleDrawerOpen : handleDrawerClose} />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <List>
              <ListItem>
                {isAuth ? (
                  <ListItemText
                    primary={session.name + " " + session.surname}
                  />
                ) : (
                  <ListItemText primary={process.env.WEBPAGE_NAME} />
                )}
              </ListItem>
            </List>

            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem button key={"HOME"}>
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"Faqja Kryesore"} />
            </ListItem>{" "}
            <ListItem button key={"SEARCH"}>
              <ListItemIcon>
                <SearchOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"Kërko"} />
            </ListItem>{" "}
            <ListItem button key={"CONTACT"}>
              <ListItemIcon>
                <CallOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"Kontakt"} />
            </ListItem>
            {isAuth && session?.role === 2 && (
              <ListItem button key={"COMPANY_PANEL"}>
                <ListItemIcon>
                  <DisplaySettingsIcon />
                </ListItemIcon>
                <ListItemText primary={"Paneli Kompanisë"} />
              </ListItem>
            )}
            {isAuth && session?.role === 3 && (
              <ListItem button key={"COMPANY_PANEL"}>
                <ListItemIcon>
                  <DisplaySettingsIcon />
                </ListItemIcon>
                <ListItemText primary={"Paneli Adminit"} />
              </ListItem>
            )}
          </List>

          <Divider />
          <List>
            {isAuth ? (
              <ListItem
                button
                key={"LOGOUT"}
                onClick={() => {
                  dispatch(logout());
                  localStorage.removeItem("token");
                }}
              >
                <ListItemIcon>
                  <LoginOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItem>
            ) : (
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <ListItem button key={"LOGIN"}>
                  <ListItemIcon>
                    <LogoutOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Login"} />
                </ListItem>
              </Link>
            )}
          </List>
        </Drawer>

        <NavMenu>
          <NavLink to="/about">Faqja Kryesore</NavLink>
          <NavLink to="/services">Kërko</NavLink>
          <NavLink to="/contact-us">Kontakt</NavLink>
          {isAuth && session?.role === 2 && (
            <NavLink to="/protected">Paneli Kompanisë</NavLink>
          )}{" "}
          {isAuth && session?.role === 3 && (
            <NavLink to="/admin">Paneli Adminit</NavLink>
          )}
        </NavMenu>
        <NavBtn>
          {isAuth ? (
            <NavBtnLink
              to="#"
              onClick={() => {
                dispatch(logout());
                localStorage.removeItem("token");
              }}
            >
              Logout
            </NavBtnLink>
          ) : (
            <NavBtnLink to="/login">Login</NavBtnLink>
          )}
        </NavBtn>
      </Nav>
    </>
  );
}
