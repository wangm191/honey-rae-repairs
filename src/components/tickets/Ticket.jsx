import { useEffect, useState } from "react"
import { getAllEmployees, getEmployeeById } from "../../services/employeeService"

export const Ticket = ( {ticket} ) => {
    const [employees, setEmployees] = useState([])

    const [assingedEmployee, setAssingedEmployee] = useState("")

    // Consolidated function solution
    // useEffect(() => {
    //     if (ticket.employeeTickets.length) {
    //         getEmployeeById(ticket.employeeTickets[0].employeeId)
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
    </footer>
  </section>
}