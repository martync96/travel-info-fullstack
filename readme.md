# Front End 

## Core Features

The Business Analyst team working with DFCorp has identified the following features that should be implemented:

- The user should see a location search box when they access the application home page that allows them to search any town or city by name (as per the wireframe supplied)
- The application should send a query to a weather API to get a 5-day forecast if the location can be found
- When the forecast data is returned, a new view should be displayed, using the wireframe(s) for the view layout
- The user should be able to save a location as a favourite (although this should only persist on the device they are using at the time)
- The application should be responsive across the main breakpoints for devices (mobile, tablet, desktop) - wireframes are provided for each of these

The layouts are pretty much agreed with the main stakeholder but they are open for you to put your creative flair into the colour scheme and any images used (that are not specific to the location content).  They are also open to suggestions for the name of the application and its logo.

> **Note:** The use of a generative AI tool to complete tasks relating to the specific requirements above is NOT allowed.  All work here should be your own.

## Additional Features

In addition to these features, should time allow, the client has asked for the application to display the following on the same view as the weather (as per the wireframes):

- A map of the selected location
- A list of hotels in the selected location, displayed on a carousel that can be moved on; Hotel images should be in a slide show within the hotel's carousel.

Please see the wireframes for more information about the specific data and layout to be used to base your application on

> **Note:** The use of a generative AI tool to help complete tasks relating to these further requirements is allowed but should be clearly documented.

| Statement                                         | User Story                                                                          | Nouns                   | Verbs      |
|---------------------------------------------------|-------------------------------------------------------------------------------------|-------------------------|------------|
| 1. The user should see a location search box when | As a user, I want to be able to search for locations, so I can find out information | Account                 | Access     |
| they access the application home page that allows | about different areas of the world                                                  |                         |            |
| them to search any town or city by name.          |                                                                                     |                         |            |
|                                                   |                                                                                     |                         |            |
| 2. The application should send a query to a       | As a user, I want to be able to get the weather forecast of a selected locations,   | Weather-forecast, World | Get        |
| weather API to get a 5-day forecast if the        | so I can find out the local weather of places around the world                      |                         |            |
| location can be found.                            |                                                                                     |                         |            |
|                                                   |                                                                                     |                         |            |
| 3. When the forecast data is returned, a new view | As a user, I want to be shown a different view when weather data is returned, to    | Weather, View           | Shown      |
| should be displayed.                              | help differentiate differences in views                                             |                         |            |
|                                                   |                                                                                     |                         |            |
| 4. The user should be able to save a location     | As a user, I want to be able to save a location as my favourite, so I can quickly   | Location                | Save       |
| as a favourite.                                   | access locations                                                                    |                         |            |
|                                                   |                                                                                     |                         |            |
| 5. The application should be responsive across    | As a user, I want the application to be responsive across the main breakpoints for  | Device, Breakpoint      | Responsive |
| the main breakpoints for devices.                 | devices, so the application is viewable on multiple devices                         |                         |            |
|                                                   |                                                                                     |                         |            |
|                                                   |                                                                                     |                         |            |

# Backend 

# Core Features

The Business Analyst team working with the Product Owner at DFCorp have identified the following core features that the backend services should provide:

1. **User Authentication**:
   - The web application will send registration details to a backend service to create a new user account
   - The web application will send login details to the backend service to authenticate a user
   - The web application will send a password change request to the backend service and update the user's password
   - A user must be authenticated on every subsequent request to any other backend service
2. **Favourite Locations**:
   - The web application will send a request to a backend service to obtain the stored favourite locations of an authenticated user
   - The web application will send a request to add a new location to an authenticated user's favourite locations
   - The web application will send a request to remove a location from an authenticated user's favourite locations

You may architect the backend services in any way you see fit.  Authentication can be handled through a simple check of username/password on each request but more efficient and secure methods are encouraged.  The storage of user data and favourite locations can be done in any way you see fit but must be held in a MongoDB database.

## Additional Features

DFCorp have been made aware that inserting API keys into frontend applications can leave their accounts open to abuse.  To counter this, they have asked that you create proxy services that will allow the frontend application to make requests to the backend services without exposing the API keys.

They are also concerned that an industry standard method of authentication is not being used and have asked that you implement JSON Web Token (JWT) authentication for the backend services.

The Product Owner at DFCorp has also identified a number of additional features that they would like to see in the backend services if time should allow you:

1. **JSON Web Token Authentication**:
   - Once a user has logged in, a JSON Web Token (JWT) should be returned to the web application and used for all subsequent requests
2. **Proxy Services**:
   - Weather API Proxy Service:
      - The web application will send a request to the backend service to obtain weather information for a location using the weather API and its key used in the frontend application and it will be responsible for returning the data to the web application (in JSON format)
   - **Map API Proxy Service**:
     - The TomTom API used allows you to set a whitelist of domains that can access the API - this means a proxy is not needed as the domain for the web application can be used and key exposure is not a concern
   - **Hotel API Proxy Service**:
     - The web application will send a request to the backend service to obtain hotel information for a location using the hotel API and its key used in the frontend application and it will be responsible for returning the data to the web application (in JSON format)

     | Statement                                                                             | User Story                                                                                 | Nouns                                  | Verbs                  |
|---------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|----------------------------------------|------------------------|
| The web application will send registration details to a backend service to create     | As a system admin I want the user's registrations details to be sent to a backend service, | web application, backend service, user | send, create           |
| a new user account details to a backend service to create a new user account          | so the backend can create user accounts for them                                           | web application, backend service, user | send, create           |
|                                                                                       |                                                                                            |                                        |                        |
| The web application will send login details to the backend service to authenticate    | As a system admin I want the user's login details to be authenticated by the backend, to   | web application, backend service, user | send, authenticate     |
| a user                                                                                | ensure only those with authorised details saved in the backend can access accounts         | web application, backend service, user | send, authenticate     |
|                                                                                       |                                                                                            |                                        |                        |
| The web application will send a password change request to the backend service        | As a system admin I want the backend to handle password request services, to ensure        | web application, backend service, user | send, update           |
| and update the user's password                                                        | that only authorised users can change their passwords                                      | web application, backend service, user | send, update           |
|                                                                                       |                                                                                            |                                        |                        |
| A user must be authenticated on every subsequent request to any other backend service | As a system admin I want users to be requested whenever they send a request to other       | user                                   | authenticated, request |
|                                                                                       | backend services, to ensure users only access services authorised to them                  |                                        |                        |
|                                                                                       |                                                                                            |                                        |                        |
| The web application will send a request to a backend service to obtain the stored     | As a user, I want to be able fetch my favourites locations from the web applications       | web application, backend service, user | send, obtain           |
| favourite locations of an authenticated user                                          | so my data is persistent across multiple devices                                           | web application, backend service, user | send, obtain           |
|                                                                                       |                                                                                            |                                        |                        |
|                                                                                       |                                                                                            |                                        |                        |
| The web application will send a request to add a new location to an authenticated     | As a user, I want to be able to add new locations to my favourites, so i can keep track of | web application, backend service, user | send, add              |
| user's favourite locations                                                            | new and interesting locations I find                                                       |                                        |                        |
|                                                                                       |                                                                                            |                                        |                        |
| The web application will send a request to remove a location from an authenticated    | As a user, I want to be able to remove locations from my favourites, so I no longer have   | web application, backend service, user | send, remove           |
| user's favourite locations                                                            | to keep up with locations that are no longer interesting to me                             |                                        |                        |
|                                                                                       |                                                                                            |                                        |                        |

| Object | Property     |
|--------|--------------|
| User   | ID           |
|        | firstName    |
|        | lastName     |
|        | emailAddress |
|        | password     |
|        |              |
|        |              |

| Object             | Property  |
|--------------------|-----------|
| favouriteLocations | ID        |
|                    | placeName |
|                    | lat       |
|                    | long      |
|                    | country   |
|                    |           |
|                    |           |
