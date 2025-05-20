import { useEffect, useState } from "react"
import { getNonStaffUsers } from "../../services/userService"
import { User } from "../../users/user"
import { Link } from "react-router-dom"
import "./Customers.css"

export const CustomerList = () => {
    const [allCustomers, setAllCustomers] = useState([])

    useEffect(() => {
      getNonStaffUsers().then((customerArray) => {
        setAllCustomers(customerArray)
      })
    }, []) 

    return (
    <div className="customers">
        {allCustomers.map(customerObj => {
          return (
            <Link to={`/customers/${customerObj.id}`} key={customerObj.id}> 
              <User user={customerObj}/>
            </Link>
          )
        })}
    </div>
    )
}