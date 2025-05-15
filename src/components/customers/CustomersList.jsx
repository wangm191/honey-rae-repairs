import { useEffect, useState } from "react"
import { getNonStaffUsers } from "../../services/userService"
import { User } from "../../users/user"
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
            return <User user={customerObj} key={customerObj.id}/>
        })}
    </div>
    )
}