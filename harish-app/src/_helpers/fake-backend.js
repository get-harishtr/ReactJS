export function configureFakeBackend() {
  // array in local storage for registered users
  let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
  let employees: any[] = JSON.parse(localStorage.getItem('employees')) || [];

    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // authenticate
                if (url.endsWith('/api/users/authenticate') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.username === params.username && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        // if login details are valid return user details and fake jwt token
                        let user = filteredUsers[0];
                        let responseJson = {
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            userImage: user.userImage,
                            token: 'fake-jwt-token'
                        };
                        resolve({ ok: true, json: () => responseJson });
                    } else {
                        // else return error
                        reject('Username or password is incorrect');
                    }

                    return;
                }

                // get users
                if (url.endsWith('/api/users') && opts.method === 'GET') {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        resolve({ ok: true, json: () => users });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }


                // create user
                if (url.endsWith('/api/users') && opts.method === 'POST') {
                  // get new user object from post body
                  let newUser = JSON.parse(opts.body);

                  // validation
                  let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                  if (duplicateUser) {
                    return reject('Username "' + newUser.username + '" is already taken');
                  }

                  // save new user
                  newUser.id = users.length + 1;
                  users.push(newUser);
                  localStorage.setItem('users', JSON.stringify(users));

                  // respond 200 OK
                  return   resolve({ ok: true, json: () => users });
                }


                // delete user
                if (url.match(/\/api\/users\/\d+$/) && opts.method === 'DELETE') {
                  // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                  if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                      let user = users[i];
                      if (user.id === id) {
                        // delete user
                        users.splice(i, 1);
                        localStorage.setItem('users', JSON.stringify(users));
                        break;
                      }
                    }
                    let responseJson = {
                      message: 'Deleted'
                    };
                    // respond 200 OK
                    return resolve({ ok: true, json: () => responseJson});
                  } else {
                    // return 401 not authorised if token is null or invalid
                      return reject('Unauthorised');
                  }
                }



                // list all employees
                if (url.match('/api/employees') && opts.method === 'GET') {
                  // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                  if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                      resolve({ ok: true, json: () => employees });
                  } else {
                      // return 401 not authorised if token is null or invalid
                      reject('Unauthorised');
                  }

                  return;
                }


                // Create employee
                if (url.match('/api/employees') && opts.method === 'POST') {
                  // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                  if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token')  {
                    // get new user object from post body
                    let newEmployee = JSON.parse(opts.body);

                    // validation
                    let duplicateEmployee = employees.filter(employee => {
                      return (employee.firstName === newEmployee.firstName && employee.lastName === newEmployee.lastName);
                    }).length;

                    if (duplicateEmployee) {
                      return reject('Employee "' + newEmployee.firstName + ' ' + newEmployee.lastName + '" is already registered');
                    }

                    // save new user
                    if (employees.length) {
                      newEmployee.id = employees[employees.length - 1].id + 1;
                    } else {
                      newEmployee.id = employees.length + 1;
                    }

                    employees.push(newEmployee);
                    localStorage.setItem('employees', JSON.stringify(employees));

                    // respond 200 OK
                    return resolve({ ok: true, json: () => employees });
                  } else {
                    return reject('You don\'t have access to employee data!!!');
                  }
                }


                // delete Employee
                if (url.match(/\/api\/employees\/\d+$/) && opts.method === 'DELETE') {
                  // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                  if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token')  {
                    // find user by id in users array
                    let urlParts = url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < employees.length; i++) {
                      let employee = employees[i];
                      if (employee.id === id) {
                        // delete user
                        employees.splice(i, 1);
                        localStorage.setItem('employees', JSON.stringify(employees));
                        break;
                      }
                    }

                    let responseJson = {
                      message: 'Deleted'
                    };

                    // respond 200 OK
                    return resolve({ ok: true, json: () => responseJson});
                  } else {
                    // return 401 not authorised if token is null or invalid
                    return reject('You don\'t have access to employee data!!!');
                  }
                }


                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}
