import React, { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import Item from './Item';
import Form from './Form';
const axios = require('axios');

const Main = () => {
  // set state
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState('');
  const allOrders = [];

  const helper = (newOrder) => {
    const newState = [...orders,newOrder];
    setOrders(newState)
  }

  useEffect(() => {
    axios.get('/order').then((response) => {
      setOrders(response.data.orders);
      setName(response.data.name);

      for (let i = 0; i < orders.length; i++) {
        const { item, orderDate, vendor, trackingId, eta } = orders[i];
        allOrders(
          <Item
            item={item}
            orderDate={orderDate}
            vendor={vendor}
            trackingId={trackingId}
            eta={eta}
            key={trackingId}
          />
        );
      }
    });
  });
  return (
    <>
      <Navbar name={name} />
      <div>
        <h1>Orders</h1>
        <div>{allOrders}</div>
      </div>
      <Form helper = {helper}/>
    </>
  );
};

export default Main;
