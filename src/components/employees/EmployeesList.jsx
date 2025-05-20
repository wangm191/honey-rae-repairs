import { useEffect, useState } from "react"
import { getStaffUsers } from "../../services/userService"
import { User } from "../../users/user"
import { Link } from "react-router-dom"
import "./Employees.css"


export const EmployeeList = () => {

    const [allEmployees, setAllEmployees] = useState([])

    useEffect(() => {
        getStaffUsers().then((employeeArray) => {
            setAllEmployees(employeeArray)
        })
    }, [])

    return (
        <div className="employees">
            {allEmployees.map(employeeObj => {
            return (
                <Link to={`/employees/${employeeObj.id}`} key={employeeObj.id}>
                    <User user={employeeObj}/> 
                </Link>
            )
            })}
        </div>
    )
}