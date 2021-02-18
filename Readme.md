* This application is divided into layers in order to be isolated the frameworks (like: `sequelize`, `express`, `elasticsearch`, `redis`, `mysql`) from the main logics.
* This isolation make the application become pluggable and we can do isolated tests.
* There are totally 4 services: `Product-BFF`, `Product-DB`, `analytics`, `e2e-tests`. The user request will come to the `Product-BFF`, then forward to `Product-DB` receive the response and also forward to the `analytics` for indexing into the `elasticsearch`. The `e2e-tests` is used for making end-to-end tests.
* The `Product-BFF` serves the REST APIs. The `Product-BFF` use `grpc` to send and receive response from `Product-DB`. The `Product-BFF` send asynchronous messages to the `analytics` using `Redis Stream` (kind of message broker).

```
            (REST)                (grpc)
  Request --------> Product-BFF --------> Product-DB ------> MySQL
                         |
                         ---------------> analytics  ------> ElasticSearch
                             (message)
```

* Source code of each service has following structure:

```
├── Dockerfile
├── controllers/
├── entities/
├── frameworks/
├── index.js
├── interactors/
├── package-lock.json
├── package.json
├── repositories/
├── test/
```

* The `unit tests` are located in folder `/test` of each service. The purpose of these unit tests is mainly for writing the source codes (TDD style).
* Each service is designed to have minimal business logics. Those logics are put inside the `entities` and `interactors` folders.
* The folder: `controllers` and `reposistories` store the adapters to frameworks
* The folder: `frameworks` store all the codes that tightly depends on the frameworks like: `express`, `mysql`, `elasticsearch`.
* This architecture design trying to achieve the concepts of the `Clean Architecture`.

* Source codes of the services are put in the folder `packages`.
* The `secrets/certs` folder contain the SSL certification for doing secure GRPC calls (use the `gen-cert` script to generate these).
* Use docker and docker-compose to run the services and wire them up for end-to-end tests.
* Run on local pc:

  1. Choose passwords for DB and Redis:

    ```
    mkdir -p secrets &&
    touch secrets/db_password.txt &&
    touch secrets/redis_password.txt
    echo 'my_secret_db_password' > secrets/db_password.txt &&
    echo 'my_secret_redis_password' > secrets/redis_password.txt
    ```

  2. run the script gen-cert to generate the certs for GRPC.

  3. Use docker-compose to run all the services:

    ```
    docker-compose --env-file ./config/.env.prod up --build -d --scale e2e-tests=0 --scale seeds=0
    ```

  * Run seeds database (optional):

    ```
    docker-compose --env-file ./config/.env.prod up seeds
    ```

  * Run the end-to-end test:  

    ```
    docker-compose --env-file ./config/.env.prod up e2e-tests
    ```

  * Call API: 

  ```
  curl http://localhost:3000/products?page=1&perPage=10
  ```

  * Build dev environment and run Unit Tests on the services:

    ```
    docker-compose down -v
    docker-compose --env-file ./config/.env.dev up -d redis mysql elasticsearch

    docker-compose --env-file ./config/.env.dev build product-db product-bff analytics

    docker-compose --env-file ./config/.env.dev run --rm product-db npm run test

    docker-compose --env-file ./config/.env.dev run --rm product-bff npm run test

    docker-compose --env-file ./config/.env.dev run --rm analytics npm run test
    ```

  * Only the `Get Products API` is available. This API includes the pagination.
