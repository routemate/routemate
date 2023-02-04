import React, { useState, useRef, useEffect } from 'react';

import Navbar from './components/Navbar';
import Item from './components/Item';
import Form from './components/Form';

const Main = () => {
  // set state
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState('');

  /*
  useEffect to create a bunch of <Items> and put them in an array
    invoke a fetch get request to ('/orders')
      the response will be an object. THe object will contain:
        {
          orders: [{item: 'item', orderDate: '1/2/3', company: 'Amazon', trackingNum: '123', eta: '1/10/3}, {item: 'item', orderDate: '1/2/3', company: 'Amazon', trackingNum: '123', eta: '1/10/3}]
          name: 'Issam'
        }

    setName(response.data.name)
    
    create an array allOrders = []

    loop through the orders
      invoke <Item item={'item'}, orderDate: '1/2/3', company: 'Amazon', trackingNum: '123', eta: '1/10/3/> and add that result to allOrders

    setOrders(allOrders)
*/
  return (
    <>
      <Navbar name={name} />
      <div>
        <div>{/* The header section for the orders */}</div>
        {/* all the items will render into here. PUT THE ARRAY OF ALL THE <Items> here */}
        {/* orders */}
      </div>
      <Form></Form>
    </>
  );
};

export default Main;
