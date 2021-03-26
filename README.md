# useApi Custom React Hook
A custom hook to abstract API calls in React

## Overview
The useApi custom hook allows the app to set variables that depend on API calls:
1. by setting the hook in one line and passing in a predefined API function
1. while retaining control on when the call gets made
1. and without having to write asynchronous code

This streamlines the development process by allowing the team to focus on building their respective components without having to worry about API responses and promises, error handling, or nuances in API call implementations.

## Getting Started
*Before we dive into how the hook works, a quick heads up. This implementation includes both the general hook architecture as well as an embedded API implementation in order to showcase how resources can be accessed. It also includes an Authentication requirement that can be easily stripped out if not needed.*

### Dependencies
* React
* axios

### Architecture
There are two files that make the hook work and a third that allows for authenticated requests.
1. `hooks/useApi.js`: This is the custom hook. It takes an `apiFunction` as its argument in the form of an anonymous callback. The `useState` sets a `response` object that tracts data, loading status, errors and successful status. It returns the `response` object along with a `fetchMethod` function that, when invoked, triggers the asynchronous API call and sets the `response`.
1. `api/index.js`: This file includes various functions for asynchronously hitting API endpoints. This file should be customized to fit your needs (i.e. your specific resources, authentication needs and error handling). But the file serves as a great template from which to get started. 
1. `axiosWithAuth.js`: This file includes boilerplate for incorporating tokens into requests that require authentication. It can be adjusted for using bearer tokens or deleted when using sessions with cookies.

### Using the Hook
1. From your component, import this hook and any api functions you might need
  1. To import every action along with the hook, use this:
        import {useApi} from "./utils/hooks/useApi";
        import {fetchResource, postResource, fetchTasks, postTask, putTask} from "./utils/api";
1. The hook takes a callback function -> that callback function is an api function with arguments per 2a below
  1. Here are the HTTP Request options:
       - fetchResource(resource)
       - postResource(resource, action, credentials)
       - fetchTasks(id)
       - postTask(task)
       - putTask(task, id)
  1. Some examples for using the hook:
       - For getting all admins in the database:
           const [allAdmins, getAllAdmins] = useApi(() => fetchResource("admin"));
       - For registering a new admin:
           const adminToRegister = {
             name: "Example",
             email: "example@test.com",
             password: "password"
           };
           const [newAdmin, createNewAdmin] = useApi(() => postResource("admin", "register", adminToRegister));
       - For logging in an admin:
           const adminToLogIn = {
             email: "hook@test.com",
             password: "password"
           };
           const [logIn, executeLogIn] = useApi(() => postResource("admin", "login", adminToLogIn));
1. Once the hook is set up, you can call the setter function in your code and the variable (i.e. slice of state) will be set with the API response
1. Use the variable in your component as needed

## Feedback
If you have any feedback, send it along. I'd love to hear it. Thanks for checking out the project.


