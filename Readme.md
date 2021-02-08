* This application is divided into layers in order to be isolated the frameworks (like: `sequelize`, `express`, `elasticsearch`, `redis`, `mysql`) from the main logics.
* This isolation make the application become pluggable and we can do isolated tests.
* There are totally 4 services: `Product-BFF`, `Product-DB`, `analytics`, `e2e-tests`. The user request will come to the `Product-BFF`, then forward to `Product-DB` receive the response and also forward to the `analytics` for indexing into the `elasticsearch`. The `e2e-tests` is used for making end-to-end tests.
* The `Product-BFF` serves the REST APIs. The `Product-BFF` use `grpc` to send and receive response from `Product-DB`. The `Product-BFF` send asynchronous messages to the `analytics` using `Redis Stream` (kind of message broker).

```
               (REST)                    (grpc)
  Request --------> Product-BFF --------> Product-DB ------> MySQL
                         |
                         ---------------> analytics  ------> ElasticSearch
                          (message)
```

* The `unit tests` are located in folder `/test` of each service. The purpose of these unit tests is mainly for writing the source codes (TDD style).
* Each service is designed to have minimal business logics. Those logics are put inside the `entities` and `interactors` folders. `controllers` and `reposistories` store the adapters to frameworks like: `express`, `mysql`, `elasticsearch`. The architecture design trying to achieve the concepts of the `Clean Architecture`.
* Source codes of the services are put in the folder `packages`.
* The `certs` folder contain the SSL certification for doing secure GRPC calls.
* Use docker and docker-compose to run the services and wire them up for end-to-end tests.
* Run on local pc: `docker-compose --env-file ./config/.env.dev up`
* Can run the DB migration and seeds separately by: `docker-compose --env-file ./config/.env.dev up migration`
* Run the end-to-end test by:  `docker-compose --env-file ./config/.env.dev up e2e-tests`
* Call API: `curl http://localhost:3000/products?page=1&perPage=10`
* Sorry, only the `Get Products API` is available. This API includes the pagination.
