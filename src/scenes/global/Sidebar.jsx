import React, { useState } from "react"; // Make sure to import React
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import GridViewIcon from "@mui/icons-material/GridView";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

// Define the DropdownItem component
const DropdownItem = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dropdownBackgroundColor = colors.primary[400];

  return (
    <MenuItem
      component={<Link to={to} />}
      active={selected === title}
      style={{
        color: colors.grey[100],
        backgroundColor: dropdownBackgroundColor,
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      component={<Link to={to} />}
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Sidebars = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const adminInfo = localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin') ):null
  console.log(adminInfo , "././.")


  return (
    <Box
      sx={{
        "& .ps-sidebar-container": {
          background: `${colors.primary[400]} !important`,
        },
        "& .ps-menu-button": {
          backgroundColor: "transparent !important",
        },
        "& .ps-menu-icon": {
          padding: "5px 20px 5px 10px !important",
        },
        "& .ps-menu-button:hover": {
          color: "#868dfb !important",
        },
        "& .ps-active": {
          color: "#6870fa !important",
        },
      }}
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "2px 0 2px 0",
              color: colors.grey[100],
              transition: "0.5s",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h4" color={colors.grey[100]}>
                  Admin Pannel
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* User Profile */}
          {!isCollapsed && (
            <Box mb="10px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/profile.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "2px 0 0 0" }}
                >
                  {adminInfo.name}
                </Typography>
                <Typography   sx={{ m: "2px 0 0 0" }} color={colors.greenAccent[100]}>
                 {adminInfo.email}
                </Typography>
                <Typography   sx={{ m: "2px 0 0 0" }} variant="h5" color={colors.greenAccent[500]}>
                  Admin Pannel
                </Typography>
              </Box>
            </Box>
          )}

          {/* Main Menu */}
          <Box paddingLeft={isCollapsed ? undefined : "5%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <SubMenu icon={<PeopleOutlinedIcon />} label="Profile">
              <DropdownItem
                title="View Profiles"
                to="/Profile/view"
                icon={<GridViewIcon />}
                selected={selected}
                setSelected={setSelected}
                style={{ backgroundColor: colors.primary[400] + " !important" }}
              />
              {/* <DropdownItem
                title="Edit Profile Member"
                to="/Profile/edit"
                icon={<EditIcon />}
                selected={selected}
                setSelected={setSelected}
              /> */}
              <DropdownItem
                title="Delete Profiles"
                to="/Profile/delete/"
                icon={<PersonRemoveIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            <SubMenu icon={<PeopleOutlinedIcon />} label="User">
              <DropdownItem
                title="View User"
                to="/User/view"
                icon={<GridViewIcon />}
                selected={selected}
                setSelected={setSelected}
                style={{ backgroundColor: colors.primary[400] + " !important" }}
              />
              {/* <DropdownItem
                title="Edit User Member"
                to="/User/edit"
                icon={<EditIcon />}
                selected={selected}
                setSelected={setSelected}
              /> */}
              <DropdownItem
                title="Delete Users"
                to="/User/delete/_:id"
                icon={<PersonRemoveIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            <SubMenu icon={<PeopleOutlinedIcon />} label="Filters">
              <DropdownItem
                title="View Filters"
               to='/Filter/view'
                icon={<GridViewIcon />}
                selected={selected}
                setSelected={setSelected}
                style={{ backgroundColor: colors.primary[400] + " !important" }}
              />
              {/* <DropdownItem
                title="Edit Profile Member"
                to="/Profile/edit"
                icon={<EditIcon />}
                selected={selected}
                setSelected={setSelected}
              /> */}
              <DropdownItem
                title="Create Filters"
                to='/Filter/create'
                icon={<PersonRemoveIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            <Item
              title="Site Settings"
              to="/"
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* ........................Orange Navbar Items START......................... */}

            <SubMenu icon={<PeopleOutlinedIcon />} label="Orange Navbar Items">
              <DropdownItem
                title="View Navbar Items"
                style={{ backgroundColor: "red !important" }}
                to="/Orange-menu/view"
                icon={<GridViewIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <DropdownItem
                title="Create Navbar Items"
                style={{ backgroundColor: "red !important" }}
                to="/Orange-menu/create"
                icon={<AddIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <DropdownItem
                title="Edit Navbar Items"
                to="/orange-menu/edit"
                icon={<EditIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <DropdownItem
                title="Delete Navbar Items"
                to="/Orange-menu/delete"
                icon={<PersonRemoveIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            {/* ........................Orange Navbar Items END......................... */}

            {/* ........................Green Navbar Items START......................... */}

            <SubMenu icon={<PeopleOutlinedIcon />} label="Green Navbar Items">
              <DropdownItem
                title="View Navbar Items"
                style={{ backgroundColor: "red !important" }}
                to="/green-menu/view"
                icon={<GridViewIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <DropdownItem
                title="Create Navbar Items"
                style={{ backgroundColor: "red !important" }}
                to="/green-menu/create"
                icon={<AddIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <DropdownItem
                title="Edit Navbar Items"
                to="/green-menu/edit"
                icon={<EditIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <DropdownItem
                title="Delete Navbar Items"
                to="/green-menu/delete"
                icon={<PersonRemoveIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            {/* ........................Green Navbar Items END......................... */}

            {/* ........................Registration Teacher Items START......................... */}

            <SubMenu
              icon={<PeopleOutlinedIcon />}
              label="Teacher Registration Items"
            >
              <DropdownItem
                title="View Teacher Items"
                style={{ backgroundColor: "red !important" }}
                to="/teacher-menu/view"
                icon={<GridViewIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <DropdownItem
                title="Create Teacher Items"
                style={{ backgroundColor: "red !important" }}
                to="/teacher-menu/create"
                icon={<AddIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <DropdownItem
                title="Edit Teacher Items"
                to="/teacher-menu/edit"
                icon={<EditIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <DropdownItem
                title="Delete Teacher Items"
                to="/teacher-menu/delete"
                icon={<PersonRemoveIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            {/* ........................Registration Teacher Items END......................... */}

            {/* ........................Registration Agency Items START......................... */}

            <SubMenu
              icon={<PeopleOutlinedIcon />}
              label="Agency Registration Items"
            >
              <DropdownItem
                title="View Agency Items"
                style={{ backgroundColor: "red !important" }}
                to="/Agency-menu/view"
                icon={<GridViewIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <DropdownItem
                title="Create Agency Items"
                style={{ backgroundColor: "red !important" }}
                to="/Agency-menu/create"
                icon={<AddIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <DropdownItem
                title="Edit Agency Items"
                to="/Agency-menu/edit"
                icon={<EditIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <DropdownItem
                title="Delete Agency Items"
                to="/Agency-menu/delete"
                icon={<PersonRemoveIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            {/* ........................Registration Agency Items END......................... */}

            {/* ........................Registration Advisory Items START......................... */}

            <SubMenu
              icon={<PeopleOutlinedIcon />}
              label="Advisory Registration Items"
            >
              <DropdownItem
                title="View Advisory Items"
                style={{ backgroundColor: "red !important" }}
                to="/Advisory-menu/view"
                icon={<GridViewIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <DropdownItem
                title="Create Advisory Items"
                style={{ backgroundColor: "red !important" }}
                to="/Advisory-menu/create"
                icon={<AddIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <DropdownItem
                title="Edit Advisory Items"
                to="/Advisory-menu/edit"
                icon={<EditIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <DropdownItem
                title="Delete Advisory Items"
                to="/Advisory-menu/delete"
                icon={<PersonRemoveIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            {/* ........................Registration Advisory Items END......................... */}

            <SubMenu label="Pages" icon={<CalendarTodayOutlinedIcon />}>
              <DropdownItem
                title="Profile Form"
                to="/form"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <DropdownItem
                title="Calendar"
                to="/calendar"
                icon={<CalendarTodayOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <DropdownItem
                title="FAQ Page"
                to="/faq"
                icon={<HelpOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            <SubMenu label="Charts" icon={<BarChartOutlinedIcon />}>
              <DropdownItem
                title="Bar Chart"
                to="/bar"
                icon={<BarChartOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <DropdownItem
                title="Pie Chart"
                to="/pie"
                icon={<PieChartOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <DropdownItem
                title="Line Chart"
                to="/line"
                icon={<TimelineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <DropdownItem
                title="Geography Chart"
                to="/geography"
                icon={<MapOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default Sidebars;
