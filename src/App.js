import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebars from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard/index";
import Login from "./components/login";
import Team from "./scenes/team/Team";
import DeleteProfile from "./scenes/profileCrud/DeleteProfile/DeleteProfile";
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
import DelUser from "./scenes/userCrud/delUser";
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

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();

  // Determine whether to show the sidebar based on the current route
  const showSidebar =  !location.pathname.startsWith("/profile/") &&
  location.pathname !== "/login" &&
  location.pathname !== "/"; //

  const showNavbar =  !location.pathname.startsWith("/profile/") &&
  location.pathname !== "/login" &&
  location.pathname !== "/"; //

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {showSidebar && <Sidebars />}
          <main className="content">
            {showNavbar && <Topbar />}
            <Routes>
              <Route path="/" element={<Login/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/User/delete/:id" element={<DelUser />} />
              <Route path="/Profile/view" element={<ViewProfile />} />
              <Route path="/Profile/delete" element={<DeleteProfile />} />
              <Route path="/Profile/delete/:profileId" element={<DeleteProfile />} />
              <Route path="/Orange-menu/create"element={<CreateOrangeForm/>}/>
              <Route path="/Orange-menu/view" element={<ViewOrangeNav />} />
              <Route path="/orange-menu/edit/:id" element={<EditOrangeNav />} />
              <Route path="/green-menu/create" element={<CreategreenForm />} />
              <Route path="/green-menu/view" element={<ViewGreenNav />} />
              <Route path="/green-menu/edit/:id" element={<EditGreenNav/>} />
              <Route path="/teacher-menu/create" element={<Create />} />
              <Route path="/Filter/create" element={<CreateFilter/>} />
              <Route path="/Filter/view" element={<ViewFilter/>} />
              <Route path="/teacher-menu/view" element={<ViewTeacher/>} />
              <Route path="Agency-menu/create" element={<CreateAgency />} />
              <Route path="Agency-menu/view" element={<ViewAgency />} />
              <Route path="Advisory-menu/create" element={<AdvisorCreate />} />
              <Route path="Advisory-menu/view" element={<ViewAdvisor/>} />
              <Route path="/User/view" element={<ViewUser />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/profile/:profileId" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
