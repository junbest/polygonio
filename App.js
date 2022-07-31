  import React, { Component, useState, useEffect, useRef } from 'react';
  import { w3cwebsocket as W3CWebSocket } from "websocket";
  import Dashboard from "./components/Dashboard";
  import { formatData } from "./utils";
  import "./styles.css";
  
  
  const APIKEY ='4Qcbpi8o3Ne9OPbhreGPEHya5b3Y0YAb';

  export default function App() {

  const [currencies, setcurrencies] = useState([]);
  const [pair, setpair] = useState("");
  const [price, setprice] = useState("0.00");
  const [stats, statsdata] = useState("");
  const [message, messagedata] = useState("");
  //const client = new W3CWebSocket('wss://delayed.polygon.io/stocks');
  const client = new W3CWebSocket('wss://socket.polygon.io/stocks');
  let first = useRef(false);

    useEffect(() => {

      //let pairs = [];
  
      //const apiCall = async () => {      
      //await fetch("https://api.pro.coinbase.com/products").then((res) => res.json()).then((data) => (pairs = fuck));

      // let filtered = pairs.filter((pair) => {
      //   if (pair.Country === "USA") {
      //     return pair;
      //   }
      // });
      
      // filtered = filtered.sort((a, b) => {
      //   if (a.Code < b.Code) {
      //     return -1;
      //   }
      //   if (a.Code > b.Code) {
      //     return 1;
      //   }
      //   return 0;
      // });

      //setcurrencies(filtered);

      //first.current = true;
    //};
    //apiCall();
  //}, []);

  
  //useEffect(() => {
    //if (!first.current) {
      //return;
    //}

client.onopen = () => {
  console.log('WebSocket Client Connected');
  client.send(`{"action":"auth","params":"${APIKEY}"}`)
  client.send(`{"action":"subscribe","params":"A.${pair}"}`)
};

client.onmessage = (data) => {

  console.log(data.data);
  data = JSON.parse(data.data)
  data.map(( msg ) => {
    console.log('Price:', msg.o)
    if (msg.o === undefined){
      
      statsdata(msg.status)
      messagedata(msg.message)
    }else{
      setprice(msg.o)
      // statsdata("")
      // messagedata("")
    }
    
  })
};

}, [pair]);
  
  const handleSelect = (e) => {
    setpair(e.target.value);
  };

    return (
    <div className="container">
      {
        // <select name="currency" value={pair} onChange={handleSelect}>
        //   {currencies.map((cur, idx) => {
        //     return (
        //       <option key={idx} value={cur.id}>
        //         {cur.Code}
        //       </option>
        //     );
        //   })}
        // </select>
        <input name="firstName" onChange={handleSelect} />
      }
      <Dashboard price={price} stats={stats} message={message}/>
    </div>
    );
}