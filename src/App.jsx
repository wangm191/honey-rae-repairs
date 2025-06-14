import "./App.css"
import { Routes, Route } from "react-router-dom"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"


export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="*" element={
        // Check if user is authorized 
        <Authorized>
          {/* ApplicationViews is the child component of authorized, therefore returning Application View Components */}
          <ApplicationViews />
        </Authorized>} 
      />
    </Routes>
  )
}