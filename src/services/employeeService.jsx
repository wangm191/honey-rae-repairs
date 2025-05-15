export const getAllEmployees = () => {
    return fetch(`http://localhost:8088/employees/?_expand=user`)
    .then((response) => response.json())
}

export const getEmployeeById = (employeeId) => {
    return fetch(`http://localhost:8088/employees/${employeeId}?_expand=user`)
    .then((response) => response.json())
}