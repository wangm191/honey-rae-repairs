import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getEmployeeByUserId } from "../../services/employeeService"
import { getStaffNotEmployee } from "../../services/userService"
import { getTicketsFromEmployee } from "../../services/ticketService"


export const EmployeeDetails = () => {

    // this is actually userId
    const { userId } = useParams()

    const [employee, setEmployee] = useState({})

    const [numberOfTickets, setNumberOfTickets] = useState(0)

    useEffect(() => {
        const fetchEmployee = async () => {
          try {
            const employeeData = await getEmployeeByUserId(Number(userId))
            
            if (employeeData.length > 0) {
              setEmployee(employeeData[0])
            } else {
              const staffData = await getStaffNotEmployee(Number(userId))
              if (staffData.length > 0) {
                setEmployee(staffData[0])
              } else {
                console.warn("No employee or staff found for ID:", userId)
              }
            }
          } catch (error) {
            console.error("Error fetching employee or staff data:", error)
          }
        }

        fetchEmployee()
      }, [userId])
      

    useEffect(() => {
        getTicketsFromEmployee(employee.id).then((data) => {
            setNumberOfTickets(data.length)
        })
    }, [employee]) 

    return (
        <section className="employee">
            <header className="employee-header">{employee.user === undefined ? employee.fullName : employee.user?.fullName}</header>
            <div>
                <span className="employee-info">Email : </span>
                {employee.user === undefined ? employee.email : employee.user?.email}
            </div>
            <div>
                <span className="employee-info">Specialty : </span>
                {employee.specialty === undefined ? "N/A" : employee.specialty}
            </div>
            <div>
                <span className="employee-info">Rate : </span>
                {employee.rate === undefined ? "N/A" : employee.rate}
            </div>
            <footer className="employee-footer">
                Currently working on {numberOfTickets === 1 ? numberOfTickets + " ticket." : numberOfTickets + " tickets."}
            </footer>
        </section>
    )

} 