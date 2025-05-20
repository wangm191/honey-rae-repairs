import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCustomerDetailsByUserId } from "../../services/customerService"

export const CustomerDetails = () => {
    // Example:
    // /customers/3
    // path="/customers/:customerId"
    // Looking for the same name key defined in corresponding path { customerId: 3 }, its actually userId
    const { customerId } = useParams() 

    const [customer, setCustomer] = useState({})  

    // customerId is actually userId in the customer {} when getCustomerDetailsByUserId() is called.
    useEffect(() => {
        getCustomerDetailsByUserId(Number(customerId)).then((data) => {
            const customerObj = data[0]
            setCustomer(customerObj) 
        })
    }, [customerId]) 

    return (
        <section className="customer">
            <header className="customer-header">{customer.user?.fullName}</header>
            <div>
                <span className="customer-info">Email : </span>
                {customer.user?.email}
            </div>
            <div>
                <span className="customer-info">Address : </span>
                {customer.address}
            </div>
            <div>
                <span className="customer-info">Phone Number : </span>
                {customer.phoneNumber}
            </div>
        </section>
    )
}