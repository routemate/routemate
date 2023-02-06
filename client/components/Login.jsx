import React, { useState, useRef, useEffect } from 'react';
import GoogleButton from 'react-google-button';
const axios = require('axios');

const Login = () => {
  const manualSignup = () => {
    const username = document.querySelector('.username');
    const password = document.querySelector('.password');
    fetch('/login', {
      method: post,
      body: {
        username: username,
        password: password,
      },
    });
  };

  const handleClick = () => {
    axios
      .post(
        '/login/google',
        {},
        {
          header: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        window.location.href = response.data.url;
      })
      .catch((error) => console.log(`Error redirecting to google: ${error}`));
  };

  return (
    <>
      <div className='login-container'>
        {/* <input
          className='username'
          placeholder='Username'
          name='username'
          type='text'
        />
        <input
          className='password'
          placeholder='Password'
          name='password'
          type='password'
        /> */}
        <GoogleButton onClick={handleClick}>Login</GoogleButton>
      </div>
    </>
  );
};

export default Login;

// import React, { useState, useRef, useEffect } from 'react';
// import GithubButton from 'react-github-login-button';
// import axios from 'axios';

// const Homepage = () => {
//   const manualSignup = () => {
//     const email = document.querySelector('#email').value;
//     const password = document.querySelector('#password').value;

//     fetch('/login', {
//       method: 'POST',
//       body: {
//         email,
//         password,
//       },
//     });
//   const githubSignup = () => {
//     axios
//       .post(
//         '/login/github',
//         {},
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       )
//       .then((response) => {
//         window.location.href = response.data.url;
//       })
//       .catch((error) => console.log(error));
//   };
//   };

//   return (
//     <div className='home-page'>
//       <form>
//         <h2>Login</h2>
//         {/* <label for='username'>Username</label> */}
//         <input
//           type='text'
//           name='username'
//           id='username'
//           placeholder='Username'
//           required
//         ></input>
//         {/* <label for='password'>Password</label> */}
//         <input
//           type='password'
//           name='password'
//           placeholder='Password'
//           required
//         ></input>
//         <button onClick={manualSignup}>Submit</button>
//       </form>
//       <GithubButton onClick={githubSignup} />
//     </div>
//   );
// };

// export default Homepage;
