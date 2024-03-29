import React, { useState } from 'react'
import Link from 'next/link'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import Head from 'next/head';
import Script from 'next/script';
// import fetch from 'isomorphic-unfetch'
const Checkout = ({ cart, subTotal, addToCart, removeFromCart }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [disable, setDisable] = useState(true)

  const handleChange = (e) => {
    if (!e || !e.target) return;
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'phone') {
      setPhone(value);
    } else if (name === 'address') {
      setAddress(value);
    } else if (name === 'pincode') {
      setPincode(value);
    }
    setTimeout(() => {
      if (name && email && phone && address && pincode) {
        setDisable(false);
        console.log('disabled');
      } else {
        setDisable(true);
        console.log('not deis');
      }
    }, 200);
  }
  const initiatePaytment = async () => {
    console.log('initiate payment');
    const orderid = Math.floor(Math.random() * Date.now());
    const data = { cart, subTotal, orderid, email: 'email' };
    // Get a transaction token * MID is invalid
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      console.log(res);
      
      const txnRes = await res.json();
      console.log("This is response ", txnRes)
      const txnToken = txnRes.txnToken;
      console.log("This is Token" , txnToken);
    } catch (error) {
      console.log('Error:', error);
    }
    try {

      var config = {
        "root": "",
        "flow": "DEFAULT",
        "data": {
          "orderId": orderid, /* update order id */
          "token": txnToken, /* update token value */
          "tokenType": "TXN_TOKEN",
          "amount": subTotal /* update amount */
        },
        "handler": {
          "notifyMerchant": function (eventName, data) {
            console.log("notifyMerchant handler function called");
            console.log("eventName => ", eventName);
            console.log("data => ", data);
          }
        }
      };

      window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
        window.Paytm.CheckoutJS.invoke();
      }).catch(function onError(error) {
        console.log("error => ", error);
      });
    } catch (error) {
      console.log(error)
      console.log("Hello Bhai")
    }


  }


  return (
    <div className='container px-4 sm:m-auto'>
      <Head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      <Script type="application/javascript" crossorigin="anonymous" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} />
      <h1 className='font-bold text-3xl my-8 text-center '>Checkout</h1>
      <h2 className='text-xl font-semibold'>1. Delivery Details</h2>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className="px-2 w-full">
        <div className="">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
          <textarea onChange={handleChange} value={address} name="address" id="address" cols="10" rows="3" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" ></textarea>
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input onChange={handleChange} value={phone} type="phone" id="phone" name="phone" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input onChange={handleChange} value={pincode} type="text" id="pincode" name="pincode" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>

        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input value={state} type="text" id="state" name="state" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
            <input value={city} type="text" id="city" name="city" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly />
          </div>
        </div>
      </div>
      <h2 className='text-xl font-semibold'>2. Review Cart Items & Pay</h2>
      <div className="sideCart z-10 p-5 m-2">


        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length == 0 &&
            <div className='my-4  text-center'>Your cart is empty.</div>
          }
          {Object.keys(cart).map((k) => {
            cart[k].variant = cart[k].variant[0].toUpperCase() + cart[k].variant.substring(1)
            return (<li key={k}>
              <div className="item flex my-5">
                <div className='font-semibold'>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                <div className='w-1/3 flex items-center justify-center font-semibold text-xl '><AiOutlineMinusCircle onClick={() => removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className='cursor-pointer' /> <span className="mx-2">{cart[k].qty}</span>
                  <AiOutlinePlusCircle onClick={() => addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className='cursor-pointer' /></div>
              </div>
            </li>
            )
          })}

        </ol>
        <span className='font-bold'>Subtotal : ₹ {subTotal}</span>
      </div>
      <div className="mx-4">
        <Link href={'/checkout'}><button onClick={initiatePaytment} className="disabled:bg-indigo-300 flex mx-3 mt-5 text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-md">
          Pay ₹ {subTotal}
        </button></Link>
      </div>
    </div>
  )
}

export default Checkout
