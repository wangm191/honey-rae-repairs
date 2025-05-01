import { useEffect, useState } from "react"
import { getAllTickets } from "./services/ticketService"
import "./App.css"

export const App = () => {
  const [allTickets, setAllTickets] = useState([]) // [stateVariable, setterFunction]
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
  const [filteredTickets, setFilteredTickets] = useState([])

  useEffect(() => {
    getAllTickets().then(ticketsArray => {
      setAllTickets(ticketsArray) 
      console.log("Tickets Set!")
    }) 
  }, []) // empty array means run on initial render of component

  useEffect(() => {
    if (showEmergencyOnly) {
      const emergencyTickets = allTickets.filter(ticket => ticket.emergency === true)
      setFilteredTickets(emergencyTickets)
    }
    else {
      setFilteredTickets(allTickets)
    }
  }, [showEmergencyOnly, allTickets])

  return <div className="tickets-container">
    <h2>Tickets</h2>
    <div>
      <button 
        className="filter-btn btn-primary" 
        onClick={() => {
          setShowEmergencyOnly(true)
        }}
      >
        Show Emergency
      </button>
      <button 
        className="filter-btn btn-info"
        onClick={() => {
          setShowEmergencyOnly(false)
        }}
      >
        Show All
      </button>
    </div>
    <article className="tickets">
       {filteredTickets.map(ticket => {
        return (
          <section className="ticket" key={ticket.id}>  
            <header className="ticket-info">#{ticket.id}</header>
            <div>{ticket.description}</div>
            <footer>
              <div className="ticket-info">Emergency</div>
              <div>{ticket.emergency ? "yes" : "no"}</div>
            </footer>
          </section>
        )
       })}
    </article>
  </div>
}
