# useApi Custom React Hook
A custom hook to abstract API calls in React

## Overview
The useApi custom hook allows the app to set variables that depend on API calls by setting the hook in one line and passing in a predefined API function while retaining control on when the call gets made and without having to write asynchronous code.

This streamlines the development process by allowing the team to focus on building their respective components without having to worry about API responses and promises, error handling, or nuances in API call implementations.

## Getting Started
*Before we dive into how the hook works, a quick heads up. This implementation includes both the general hook architecture as well as an embedded API implementation in order to showcase how resources can be accessed. It also includes an authentication implementation that can be easily stripped out if not needed.*

### Dependencies
* [React](https://reactjs.org/)
* [axios](https://reactjs.org/)

### Architecture
There are two files that make the hook work and a third that allows for authenticated requests.
1. `hooks/useApi.js`: This is the custom hook. It takes an `apiFunction` as its argument in the form of an anonymous callback. The `useState` sets a `response` object that tracts data, loading status, errors and successful status. It returns the `response` object along with a `fetchMethod` function that, when invoked, triggers the asynchronous API call and sets the `response`.
1. `api/index.js`: This file includes various functions for asynchronously hitting API endpoints. This file should be customized to fit your needs (i.e. your specific resources, authentication needs and error handling). But the file serves as a great template from which to get started. 
1. `axiosWithAuth.js`: This file includes boilerplate for incorporating tokens into requests that require authentication. It can be adjusted for using bearer tokens or deleted when using sessions with cookies.

### Using the Hook
1. From your component, import the hook and any api functions you might need.
    1. To import every action along with the hook, use this:
      ```jsx
        import { useApi } from "./utils/hooks/useApi";
        import {
          fetchResource,
          postResource,
          fetchTasks,
          postTask,
          putTask } from "./utils/api";
      ```
2. The hook takes a callback function. That callback function is an api function with arguments per 2i below:
    1. Here are the HTTP Request options:
        - `fetchResource(resource)`
        - `postResource(resource, action, credentials)`
        - `fetchTasks(id)`
        - `postTask(task)`
        - `putTask(task, id)`
    1. Some examples for using the hook:
        - For getting all admins in the database:
          ```jsx
            const [allAdmins, getAllAdmins] = useApi(() => fetchResource("admin"));
          ```
        - For registering a new admin:
          ```jsx
            const adminToRegister = {
              name: "Example",
              email: "example@test.com",
              password: "password"
            };
            const [newAdmin, createNewAdmin] = useApi(() => postResource("admin", "register", adminToRegister));
          ``` 
        - For logging in an admin:
          ```jsx
            const adminToLogIn = {
              email: "hook@test.com",
              password: "password"
            };
            const [logIn, executeLogIn] = useApi(() => postResource("admin", "login", adminToLogIn));
          ```
3. Once the hook is set up, you can call the setter function in your code and your designated response variable will be set with the API response.
    1. An example of using the `useEffect` hook to set a list of volunteers with the `useApi` hook when the component mounts:
      ```jsx
        import { useApi } from '../../utils/hooks/useApi';
        import { fetchResource } from '../../utils/api';

        function StudentLandingPage() {
          const [volunteersResponse, setVolunteersResponse] = useApi(() => fetchResource("volunteers"));

          useEffect(() => {
            setVolunteersResponse();
          }, []);

          return (
            <div className:"container">
              <p>Now that volunteersResponse is set, format it and display it!</p>
            </div>
          )
        }
      ```
4. Then you can use the variable in your component as needed.

## Feedback
If you have any feedback, send it along. I'd love to hear it. Thanks for checking out the project.


