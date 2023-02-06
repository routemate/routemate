import React, { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import Item from './Item';
import Form from './Form';
const axios = require('axios');
import '../stylesheets/styles.css';

const Main = () => {
  // set state
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState('');

  const helper = ({ item, orderDate, vendor, trackingId, status ,eta, }) => {
    const newOrderComponent = (
      <Item
        item={item}
        orderDate={orderDate}
        vendor={vendor}
        trackingId={trackingId}
        status = {status}
        eta={eta}
        key={trackingId}
      />
    );
    const newState = [...orders, newOrderComponent];
    setOrders(newState);
  };

  useEffect(() => {
    axios.get('/order').then((response) => {
      setName(response.data.name);

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
      // for (let i = 0; i < response.data.orders.length; i++) {
      //   const { item, orderDate, vendor, trackingId, eta } = orders[i];
      //   allOrders.push(
      //     <Item
      //       item={item}
      //       orderDate={orderDate}
      //       vendor={vendor}
      //       trackingId={trackingId}
      //       eta={eta}
      //       key={trackingId}
      //       className={'item'}
      //     />
      //   );
      // }
      setOrders(allOrders);
    });
  });

  return (
    <>
      <Navbar name={name} />
      <div>
        <div className={'orderHeader'}>Orders</div>
        <div className="info-container">
          <div className={'infoHeader'}>Item </div>
          <div className={'infoHeader'}>Order Date</div>
          <div className={'infoHeader'}>Vendor</div>
          <div className={'infoHeader'}>Tracking ID</div>
          <div className={'infoHeader'}>Status</div>
          <div className={'infoHeader'}>Date Of Status</div>

        </div>
        <div>{orders}</div>
      </div>
      <div className = {'formContainer'}>
      <Form helper={helper} />
      </div>
    </>
  );
};

export default Main;

// give container a set width and height, overflow: scroll,

// const axios = require("axios");

// const apiKey = "your_api_key_here";
// const trackingNumber = "your_tracking_number_here";

// axios.get(`https://api.tracktry.com/v1/track?tracking_number=${trackingNumber}&carrier_code=auto&api_key=${apiKey}`)
//   .then(response => {
//     if (response.status === 200) {
//       const deliveryDate = response.data.delivery_date;
//       console.log("Delivery date: ", deliveryDate);
//     } else {
//       console.error("Error fetching delivery date");
//     }
//   })
//   .catch(error => {
//     console.error("Error fetching delivery date: ", error);
//   });
