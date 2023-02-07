import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Item from './Item';
import Form from './Form';
const axios = require('axios');
import '../stylesheets/styles.css';

const Main = () => {
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState('');

  const helper = ({ item, orderDate, vendor, trackingId, status, eta }) => {
    const newOrderComponent = (
      <Item
        item={item}
        orderDate={orderDate}
        vendor={vendor}
        trackingId={trackingId}
        status={status}
        eta={eta}
        key={trackingId}
      />
    );
    const newState = [...orders, newOrderComponent];
    setOrders(newState);
  };

  useEffect(async () => {
    try {
      const response = await axios.get('/orders');
      const name = response.data.name;

      const allOrders = response.data.orders.map(
        ({ item, orderDate, vendor, trackingId, status, eta }, index) => (
          <Item
            item={item}
            orderDate={orderDate}
            vendor={vendor}
            trackingId={trackingId}
            status={status}
            eta={eta}
            key={trackingId}
          />
        ),
        []
      );

      setOrders(allOrders);
    } catch (e) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Navbar name={name} />
      <div>
        <div className={'orderHeader'}>Orders</div>
        <div className='info-container'>
          <div className={'infoHeader'}>Item </div>
          <div className={'infoHeader'}>Order Date</div>
          <div className={'infoHeader'}>Vendor</div>
          <div className={'infoHeader'}>Tracking ID</div>
          <div className={'infoHeader'}>Status</div>
          <div className={'infoHeader'}>Date Of Status</div>
        </div>
        <div>{orders}</div>
      </div>
      <div className={'formContainer'}>
        <Form helper={helper} />
      </div>
    </>
  );
};

export default Main;
