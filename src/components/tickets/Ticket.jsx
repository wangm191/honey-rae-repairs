import { useEffect, useState } from "react"
import { getAllEmployees, getEmployeeByEmployeeId } from "../../services/employeeService"
import { assignTicket, updateTicket } from "../../services/ticketService" 

export const Ticket = ({ ticket, currentUser, getAndSetTickets }) => {
    const [employees, setEmployees] = useState([])

    const [assingedEmployee, setAssingedEmployee] = useState("")

    // Consolidated function solution
    // useEffect(() => {
    //     if (ticket.employeeTickets.length) {
    //        getEmployeeByEmployeeId(ticket.employeeTickets[0].employeeId)
    //         .then((employee) => setAssingedEmployee(employee))
    //     }
    // }, [ticket])

    useEffect(() => {
        getAllEmployees().then((employeesArray) => {
            setEmployees(employeesArray)
            })
    }, [])

    useEffect(() => {
        const foundEmployee = employees.find(
            (employee) => employee.id === ticket.employeeTickets[0]?.employeeId
        )
        setAssingedEmployee(foundEmployee)
    }, [employees, ticket])

    const handleClaim = () => {
      const currentEmployee = employees.find((employee) => employee.userId === currentUser.id)

      const newEmployeeTicket = {
        employeeId: currentEmployee.id,
        serviceTicketId: ticket.id
      }

      assignTicket(newEmployeeTicket).then(() => {
        getAndSetTickets() 
      })
    }

    const handleClose = () => {
      const closedTicket = {
        id: ticket.id,
        userId: ticket.userId,
        description: ticket.description,
        emergency: ticket.emergency, 
        dateCompleted: new Date()
      } 

      updateTicket(closedTicket).then(() => {
        getAndSetTickets()
      })
    }
 
    return <section className="ticket" >  
    <header className="ticket-info">#{Number(ticket.id)}</header>
    <div>{ticket.description}</div>
    <footer>
      <div>
        <div className="ticket-info">Assingee</div> 
        {/*expect user to be undefined on initial render which is why we need another optional chaining (IT IS NOT TERTIARY OPERATOR) to let undefined user become "None"*/}
        <div>{assingedEmployee ? assingedEmployee.user?.fullName : "None"}</div>
      </div>
      <div className="ticket-info">Emergency</div>
      <div>{ticket.emergency ? "yes" : "no"}</div>
      <div className="btn-container">
        {/* If login user is employee and no employee ticket is associated with the service ticket, 
        then a claim ticket button should display */}
        {currentUser.isStaff && !assingedEmployee ? (
          <button className="btn btn-secondary" onClick={handleClaim}>Claim</button>
        ) : (
          ""
        )}
        {/* If login user is the assinged employee and there is no dateCompleted, 
        then a close ticket button should display */}
        {assingedEmployee?.userId === currentUser.id && !ticket.dateCompleted ? (
          <button className="btn btn-warning" onClick={handleClose}>Close</button>
        ) : (
          ""
        )}
      </div>
    </footer>
  </section>
}