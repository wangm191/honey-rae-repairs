import { Route, Outlet, Routes } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"
import { Welcome } from "../welcome/welcome"
import { TicketList } from "../components/tickets/TicketList"
import { EmployeeList } from "../components/employees/EmployeesList"
import { EmployeeDetails } from "../components/employees/EmployeeDetails"
import { CustomerList } from "../components/customers/CustomersList"
import { CustomerDetails } from "../components/customers/CustomerDetails"
import { useEffect, useState } from "react"
import { EmployeeForm } from "../forms/EmployeeForm"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObj = JSON.parse(localHoneyUser)

    setCurrentUser(honeyUserObj)
  }, [])

  return (
      <Routes>
        <Route path="/" 
          element={
            <>
              <NavBar/>
              <Outlet/>
            </>
          }
        >
          <Route index element={<Welcome />} />
          <Route 
              path="tickets" 
              element={<TicketList currentUser={currentUser} />} 
          />
          <Route path="employees">
            <Route index element={<EmployeeList />} />
            <Route path=":userId" element={<EmployeeDetails />} />
          </Route>
          <Route path="customers">
            <Route index element={<CustomerList/>} /> 
            <Route path=":customerId" element={<CustomerDetails />} /> {/*Path is the key and what is stored is the value that gets passed into useParams in CustomerDetails.jsx*/}
          </Route>
          <Route path="profile" element={<EmployeeForm currentUser={currentUser} />} />
        </Route>
      </Routes>
  )
}
