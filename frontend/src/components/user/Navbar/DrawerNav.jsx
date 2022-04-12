import React from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import styled from "styled-components";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { logout } from "../../../redux/user/userSlice";
import { useDispatch } from "react-redux";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function DrawerNav({ session, isAuth, handleDrawerClose, open }) {
  const drawerWidth = 240;
  const dispatch = useDispatch();
  return (
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
              <ListItemText primary={session.name + " " + session.surname} />
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
  );
}

export default DrawerNav;
