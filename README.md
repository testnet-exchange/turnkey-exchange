This Repo is the Exact Clone of
https://github.com/testnet-exchange/testnet.backend.

The following work is added to the existing repo -:

1. We have added some of the remaining methods of the AccessHttp API(ViaBTC).

2. We have created a WebSocket-Server, that can access all of the Websocket methods of AccessWs API(ViaBTC).

File ws-run-method, ws-methods, ws-check-method is added in the /services/xchange.

- ws-run-method -: It utilizes the url endpoint exposed by ViaBTC trade-engine, and creates our
  own websocket server on the top of it.

- ws-methods -: All of the methods available in AccessWs API are referenched here.

- ws-check-method -: It checks wether we are making ws connection with AccessWs API with right method name and params. (It is incomplete as of right now).

Descriptive Info about how the ws-run-method works -:

1. Two methods are exported  from "ws-run-method.js" that are "xchangeWs" and "wsRunMethod".

    xchangeWsMethod establishes the connection and if connected it calls the wsRunMethod by passing up arguments like method name,socketId, role, etc.

2. wsRunMethod forms the payload object with the passed arguments and calls callWsServer. (Though I am not sure why you exported this method).

3. callWsServer recieves payload, increments a global variable callId, let extract params,method, socketId from payload,
   then calls startWs(), with two functional arguments -:


    I. A function that recieves sock object and request to xchange with suitable params.

    II. A function that basically displays the data refcieved by previous request, on the basis of SocketID.

4. startWs recieves two callback function as a arguments and then do the following steps -:


    1. If ws is null then creates teh ne WebSocket Connection.

    2. If Ws connection is open then fires up the request with the help of callback.

    3. Upon recieving data, callback is fired which displays the data.

    4. On Close event, the event is closed.

We have implemented the "ws-run-method", but it is not completed yet. Changes can happen in it from time to time.


Coming Soon -: We will describe about Ngnix setting that redirects the AccessWs ws-run-method to which our websocket server can reference to.