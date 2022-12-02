import {Routes, Route} from "react-router-dom";

import Page404 from "./pages/control/Page404";
import HomePage from "./pages/home/HomePage";

import {RoleContextProvider} from "./context/RoleProvider";
import RolePage from "./pages/role/RolePage";
import RoleForm from "./pages/role/RoleForm";

import {UserContextProvider} from "./context/UserProvider";
import UserPage from "./pages/user/UserPage";
import UserForm from "./pages/user/UserForm";

import {StudentContextProvider} from "./context/StudentProvider";
import StudentPage from "./pages/student/StudentPage";
import StudentForm from "./pages/student/StudentForm";

import {EnrollmentContextProvider} from "./context/EnrollmentProvider";
import EnrollmentPage from "./pages/enrollment/EnrollmentPage";
import EnrollmentForm from "./pages/enrollment/EnrollmentForm";
import Header from "./components/Nav.jsx";

function App() {
  return (
    <div>
      <Header/>
      <div className={"bg"}>
        <UserContextProvider>
          <EnrollmentContextProvider>
            <StudentContextProvider>
              <RoleContextProvider>
                <Routes>
                  <Route index element={<HomePage/>}/>
                  <Route path="/roles" element={<RolePage/>}/>
                  <Route path="/roles/new" element={<RoleForm/>}/>
                  <Route path="/roles/edit/:id" element={<RoleForm/>}/>
                  <Route path="/students" element={<StudentPage/>}/>
                  <Route path="/students/new" element={<StudentForm/>}/>
                  <Route path="/students/edit/:id" element={<StudentForm/>}/>
                  <Route path="/enrollments" element={<EnrollmentPage/>}/>
                  <Route path="/enrollments/new" element={<EnrollmentForm/>}/>
                  <Route path="/enrollments/edit/:id" element={<EnrollmentForm/>}/>
                  <Route path="/users" element={<UserPage/>}/>
                  <Route path="/users/new" element={<UserForm/>}/>
                  <Route path="/users/edit/:id" element={<UserForm/>}/>
                  <Route path="/404" element={<Page404/>}/>
                </Routes>
              </RoleContextProvider>
            </StudentContextProvider>
          </EnrollmentContextProvider>
        </UserContextProvider>
      </div>
    </div>
  );
}

export default App;
