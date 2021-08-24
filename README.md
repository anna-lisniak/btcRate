# API endpoints

##GET
`Getting information about btc rate`[/btcRate](#get-btcRate) </br>

##POST
`Register new user`[/user/create](#post-usercreate) </br>
`Login exist user`[/user/login](#post-userlogin) </br>

### GET /btcRate

### POST /user/create
After sending valid user data, you will receive a response with a private token.
Also, token will save in cookies.

**Body Data**

|          Name | Required |  Type   | Description |
| -------------:|:--------:|:-------:| ----------------------------------------- |
|     `email` | true | string(email)  | User valid email |
|      `password`| true | string | User password |

**Return Data**

|          Name | Required |  Type   | Description |
| -------------:|:--------:|:-------:| ----------------------------------------- |
|      `token`| true | string | JWT Token for auth |


### POST /user/login
After sending valid user data, you will receive a response with a private token.
Also, token will save in cookies.

**Body Data**

|          Name | Required |  Type   | Description |
| -------------:|:--------:|:-------:| ----------------------------------------- |
|     `email` | true | string(email)  | User valid email |
|      `password`| true | string | User password |

Return Data

|          Name | Required |  Type   | Description |
| -------------:|:--------:|:-------:| ----------------------------------------- |
|     `token`| true | string | JWT Token for auth |"# genesis_homework1" 
