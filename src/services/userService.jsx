export const getNonStaffUsers = () => {
    return fetch(`http://localhost:8088/users/?isStaff=false`)
    .then((response) => response.json()) 
}

export const getStaffUsers = () => {
    return fetch(`http://localhost:8088/users/?isStaff=true`)
    .then((response) => response.json())
}