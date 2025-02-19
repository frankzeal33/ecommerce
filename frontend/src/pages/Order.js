import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from "moment"
import displayINRCurrency from "../helpers/displayCurrency"

const Order = () => {

  const [data, setData] = useState([])

  const fetchOrderdetails = async() =>{
    const response = await fetch(SummaryApi.getOrder.url, {
        method : SummaryApi.getOrder.method,
        credentials: "include"
    })

    const dataResponse = await response.json()

    setData(dataResponse?.data || [])
  }

  useEffect(()=>{
    fetchOrderdetails()
  },[data])

  return (
    <div className='container mx-auto'>
        
        <div className='text-center text-lg my-3'>
            {
                !data[0] && (
                    <p className='bg-white py-5'>No Order Available</p>
                )
            }
        </div>
        

        <div className='px-4 w-full'>
            {
                data.map((item, index) => (
                    <div key={index} className='mt-8'>
                       <p className='font-medium text-lg'>{moment(item.createdAt).format('LL')}</p>
                       <div className='border rounded'>
                          <div className='flex flex-col lg:flex-row justify-between'>
                            <div className='space-y-5'>
                              {
                                item?.productDetails.map((product, index) => (
                                  <div key={index} className='flex gap-3 bg-slate-100'>
                                    <img src={product.image[0]} className='w-28 h-28 bg-slate-200 object-scale-down mix-blend-multiply transition-all p-2'/>
                                    <div>
                                      <div className='font-medium text-lg text-ellipsis line-clamp-1'>{product.name}</div>
                                      <div className='flex items-center gap-5'>
                                        <div className='text-lg text-red-500'>{displayINRCurrency(product.price)}</div>
                                        <p>Quantity: {product.quantity}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              }
                            </div>
                            <div className='flex flex-col gap-4 p-2 min-w-[300px]'>
                              <div>
                                <div className='text-lg font-medium'>Payment Details:</div>
                                <p className='ml-1'>Payment method: {item.paymentDetails.payment_method_type[0]}</p>
                                <p className='ml-1'>Payment status: {item.paymentDetails.payment_status}</p>
                              </div>
                              <div>
                                <div className='text-lg font-medium'>Shipping Details:</div>
                                {
                                  item.shipping_options.map((shipping, index) => (
                                    <div className='ml-1' key={index}>Shipping Amount: {displayINRCurrency(shipping.shipping_amount)}</div>
                                  ))
                                }
                              </div>
                            </div>
                          </div>
                          <div className='bg-black mt-5'>
                            <div className='font-semibold text-white ml-auto w-fit lg:text-lg py-2 px-4'>Total Amount: {displayINRCurrency(item.totalAmount)}</div>
                          </div>    
                       </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Order