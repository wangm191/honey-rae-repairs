export const getAllTickets = () => {
    return fetch(`http://localhost:8088/serviceTickets?_embed=employeeTickets`)
    .then((response) => response.json())
}

export const getTicketsFromEmployee = (employeeId) => {
    return fetch(`http://localhost:8088/employeeTickets?employeeId=${employeeId}&_expand=serviceTicket`)
    .then((response) => response.json())
}

export const assignTicket = (employeeTicket) => {
    return fetch(`http://localhost:8088/employeeTickets`, {
        method: "POST",

        headers: {
          "content-Type": "application/json",
        },

        body: JSON.stringify(employeeTicket),
    })
}

export const updateTicket = (ticket) => {
    return fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
        method: 'PUT',

        headers: { 
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(ticket)
    })
}