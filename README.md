# TaskZZ is a sasmple REST API with token-based authentication and with handling of various HTTP status codes as per REST standards.

## Entities

1. Agency
   - AgencyId, Name, Address1, Address2, State, City, Phone Number
   - Beside Address2 all other fields are required.
2. Client
   - ClientId, AgencyId, Name, Email, PhoneNumber, TotalBill (all are required fields)

## REST API

1.Get token for authentication  
 `http://localhost:5000/api/user/login`

- Request
  ```
  {
       "username":"user1",
      "password":"User@123"
  }
  ```
- Response
  `{ "message": "user logged in successfully", "token": "eyJhbGciOiJIUzI1NiIhInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNWE0YjUxMjE2MWYxYmIwOGNlMjExYiIsImlhdCI6MTY2Njg2NDQwNX0.Q_xkwII2g1EHZ9eEWhgfmHJzDJtkxjiP3evL4Sq6OG0" }`

  <mark>Pass token in header as "x-access-token":"token string"</mark>

  2.This API should create an agency and client in single request
  `http://localhost:5000/api/agency`

- Request
  ```
  	{
  	{"agency":{
              "AgencyId":"1",
              "Name":"Agency1",
              "Address1":"Main Street",
              "Address2":"31-A",
              "State":"Delhi",
              "City":"New Delhi",
              "PhoneNumber":"011-121212"
              },
      "client":
              {
              "ClientId":"1",
              "AgencyId":"1",
              "Name":"ClientOne",
              "Email":"31-A123@example.com",
              "TotalBill":1100,
              "PhoneNumber":"011-1212"
              }}
                     }
  ```
- Response
  `Agency and clienet Created Successfully`

  3.This API should update a client detail.
  `http://localhost:5000/api/agency/client/3`

- Request
  ```
  {
      "TotalBill":"2300"
  }
  ```
- Response
  `Client details updated successfully`

  4.This API should return name of agency along with client details which has top client(s) with maximum total bill, below fields should be part of response
  `http://localhost:5000/api/agency`

- Request
  ```
  Nothing
  ```
- Response
  ```
  [ {
     "AgencyName": "Agency1", "ClientName": "ClientOne", "TotalBill": 2300
  } ]
  ```
