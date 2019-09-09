import { authHeader } from '../_helpers';

export const employeeService = {
    registerEmployee,
    deleteEmployee,
    getAll
};

function registerEmployee(firstName, lastName, gender, dateOfBirth) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({firstName, lastName, gender, dateOfBirth })
    };

    return fetch('/api/employees', requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/employees', requestOptions).then(handleResponse);
}

function deleteEmployee(empID){
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  }

  return fetch('/api/employees/'+empID, requestOptions).then(handleResponse);

}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}
