This Repo is the Exact Clone of
https://github.com/testnet-exchange/testnet.backend.

The following work is added to the existing repo -:

1. We have added some of the remaining methods of the AccessHttp API(ViaBTC).

2. We have created a WebSocket-Server, that can access all of the Websocket methods of AccessWs API(ViaBTC).

File ws-run-method, ws-methods, ws-check-method is added in the /services/xchange.

- ws-run-method -: It utilizes the url endpoint exposed by ViaBTC trade-engine, and creates our
  own websocket server on the top of it.

- ws-methods -: All of the methods available in AccessWs API are referenced here.

- ws-check-method -: It checks pramameters and method name while making connection with AccessWs API.(As of right now, it is incomplete).

Descriptive Info about How the ws-run-method works -:

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

How to make a ws connection to the trade-engine-server -:

- File "ws-run-method.js" at /services/xServices/Xchange/ is making a connection to trade-engine server.
- You have to provide the exposed engine's Accessws URL to "wsUrl" in "ws-run-method.js"
  Ex-: 
   Suppose, We are using Bitlum/viabtc-engine, this engine exposes the Accessws server's endpoint at port 8090,
   so we have to provide wsUrl the path.
    " let wsUrl = "ws://localhost:8090"; ".
   
   Then you can call methods with clients as describe below. 

How to hit/ping ws methods to ws connection of the backend-server -:

- There is a file named "wsdemo.js", in the root directory of the project, It provides an example of how to establish connection with our WebSocket Server.
- It act as a client and can connect to the server.
- As defined in "wsdemo.js" , you can make ws connection like this -:
   ``` 
   ioClient.emit("wsx", {
  method: "deals.subscribe",
  params: { market_list: "ETHBTC" },
  role: "public"
  });
   
Coming Soon -: We will describe about Ngnix setting that redirects the AccessWs endpoint from Docker-Trade-Engine to ws-run-method to which our websocket server can reference to.
