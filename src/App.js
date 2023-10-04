import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebars from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard/index";
import Login from "./components/login";
import Team from "./scenes/team/Team";
import ViewProfile from "./scenes/profileCrud/ViewProfile/ViewProfile";
import Invoices from "./scenes/invoices/Invoices";
import Form from "./scenes/form/Form";
import Calendar from "./scenes/calendar/Calendar";
import FAQ from "./scenes/faq/FAQ";
import Bar from "./scenes/bar/Bar";
import Pie from "./scenes/pie/Pie.jsx";
import Line from "./scenes/line/Line";
import Geography from "./scenes/geography/Geography";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ViewUser from "./scenes/userCrud/viewUser";
import Profile from "./components/Profile";
import CreateOrangeForm from "./scenes/orangeNavbar/create";
import CreategreenForm from "./scenes/greenNavbar/create";
import Create from "./scenes/teacher/create";
import CreateAgency from "./scenes/agency/create";
import AdvisorCreate from "./scenes/advisor/create";
import ViewOrangeNav from "./scenes/orangeNavbar/view";
import EditOrangeNav from "./scenes/orangeNavbar/edit";
import ViewGreenNav from "./scenes/greenNavbar/view";
import EditGreenNav from "./scenes/greenNavbar/edit";
import ViewTeacher from "./scenes/teacher/view";
import ViewAgency from "./scenes/agency/view";
import ViewAdvisor from "./scenes/advisor/view";
import CreateFilter from "./scenes/filter/create";
import ViewFilter from "./scenes/filter/view";
import EditTeacher from "./scenes/teacher/edit";
import CreateMetaTags from "./scenes/metaTags/CreateMetaTags";
import ViewMetaTags from "./scenes/metaTags/ViewMetaTags";

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();

  // Determine whether to show the sidebar based on the current route
  const showSidebar =
    !location.pathname.startsWith("/profile/") &&
    location.pathname !== "/login" &&
    location.pathname !== "/";

  const showNavbar =
    !location.pathname.startsWith("/profile/") &&
    location.pathname !== "/login" &&
    location.pathname !== "/";

  const containerStyle = {
    display: "flex",
    height: "100vh", // Set a fixed height for your container
  };

  const sidebarStyle = {
    width: showSidebar ? "250px" : "0px", // Set the width based on whether the sidebar is shown
    overflowX: "hidden", // Hide both x and y overflow
    transition: "width 0.5s", // Add transition for smooth width change
    // Add any other styles you need for your sidebar
  };

  // Calculate the content width based on whether the sidebar is shown
  const contentStyle = {
    flex: showSidebar ? "1" : "auto", // Adjust flex property
    // Apply overflow-y: auto; to make it scrollable when needed
    overflowY: "auto",
    transition: "flex 0.5s", // Add transition for smooth width change
  };

  // Custom scrollbar styles for webkit-based browsers
  const customScrollbarStyles = `
    ::-webkit-scrollbar {
      width: 8px; /* Width of the scrollbar */
    }
    ::-webkit-scrollbar-track {
      background: #141B2D; /* Color of the scrollbar track */
    }
    ::-webkit-scrollbar-thumb {
      background: #141B2D; /* Color of the scrollbar thumb */
      border-radius: 4px; /* Rounded corners of the thumb */
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #555; /* Color of the scrollbar thumb on hover */
    }
  `;

  // Apply custom scrollbar styles using a style tag
  const styleTag = document.createElement("style");
  styleTag.innerHTML = customScrollbarStyles;
  document.head.appendChild(styleTag);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" style={containerStyle}>
          <div className="sidebar" style={sidebarStyle}>{" "}{showSidebar && <Sidebars />}{" "}
          </div>{" "}
          <main className="content" style={contentStyle}>{" "}{showNavbar && <Topbar />}
            <Routes>
              <Route path="/" element={<Login />} />{" "}
              <Route path="/login" element={<Login />} />{" "}
              <Route path="/Dashboard" element={<Dashboard />} />{" "}
              <Route path="/team" element={<Team />} />{" "}
              <Route path="/Profile/view" element={<ViewProfile />} />{" "}
              <Route path="/Profile/view/:id" element={<ViewProfile />} />{" "}
              <Route path="/Orange-menu/create" element={<CreateOrangeForm />}/>{" "}
              <Route path="/Orange-menu/view" element={<ViewOrangeNav />} />{" "}
              <Route path="/orange-menu/edit/:id" element={<EditOrangeNav />} />{" "}
              <Route path="/green-menu/create" element={<CreategreenForm />} />{" "}
              <Route path="/green-menu/view" element={<ViewGreenNav />} />{" "}
              <Route path="/green-menu/edit/:id" element={<EditGreenNav />} />{" "}
              <Route path="/teacher-menu/create" element={<Create />} />{" "}
              <Route path="/teacher-menu/edit/:id" element={<EditTeacher />} />{" "}
              <Route path="/Filter/create" element={<CreateFilter />} />{" "}
              <Route path="/Filter/view" element={<ViewFilter />} />{" "}
              <Route path="/CreateMetaTags" element={<CreateMetaTags />} />{" "}
              <Route path="/ViewMetaTags" element={<ViewMetaTags />} />{" "}
              <Route path="/teacher-menu/view" element={<ViewTeacher />} />{" "}
              <Route path="Agency-menu/create" element={<CreateAgency />} />{" "}
              <Route path="Agency-menu/view" element={<ViewAgency />} />{" "}
              <Route path="Advisory-menu/create" element={<AdvisorCreate />} />{" "}
              <Route path="Advisory-menu/view" element={<ViewAdvisor />} />{" "}
              <Route path="/User/view" element={<ViewUser />} />{" "}
              <Route path="/invoices" element={<Invoices />} />{" "}
              <Route path="/form" element={<Form />} />{" "}
              <Route path="/calendar" element={<Calendar />} />{" "}
              <Route path="/faq" element={<FAQ />} />{" "}
              <Route path="/bar" element={<Bar />} />{" "}
              <Route path="/pie" element={<Pie />} />{" "}
              <Route path="/line" element={<Line />} />{" "}
              <Route path="/geography" element={<Geography />} />{" "}
              <Route path="/profile/:profileId" element={<Profile />} />{" "}
            </Routes>{" "}
          </main>{" "}
        </div>{" "}
      </ThemeProvider>{" "}
    </ColorModeContext.Provider>
  );
}

export default App;
