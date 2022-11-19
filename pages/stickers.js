import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import sticker from '../public/sticker.jpg'

const stickers = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap items-center justify-center -m-4">
          <div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-lg m-5">
            <Link href={'/product/wear-the-code'} className="block relative  rounded overflow-hidden">
              <Image alt="ecommerce" className=" block " src={sticker}  width='100%' height='100%' layout="responsive" objectFit="contain" />
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  T-SHIRTS
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  Wear the code
                </h2>
                <p className="mt-1">₹499</p>
                <p className="mt-1">Size - S, M, L, XL, XXL</p>
              </div>
            </Link>
          </div>
          <div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-lg m-5">
            <Link href={'/product/wear-the-code'} className="block relative  rounded overflow-hidden">
              <Image alt="ecommerce" className=" block " src={sticker}  width='100%' height='100%' layout="responsive" objectFit="contain" />
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  T-SHIRTS
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  Wear the code
                </h2>
                <p className="mt-1">₹499</p>
                <p className="mt-1">Size - S, M, L, XL, XXL</p>
              </div>
            </Link>
          </div>
          <div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-lg m-5">
            <Link href={'/product/wear-the-code'} className="block relative  rounded overflow-hidden">
              <Image alt="ecommerce" className=" block " src={sticker}  width='100%' height='100%' layout="responsive" objectFit="contain" />
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  T-SHIRTS
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  Wear the code
                </h2>
                <p className="mt-1">₹499</p>
                <p className="mt-1">Size - S, M, L, XL, XXL</p>
              </div>
            </Link>
          </div>
          <div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-lg m-5">
            <Link href={'/product/wear-the-code'} className="block relative  rounded overflow-hidden">
              <Image alt="ecommerce" className=" block " src={sticker}  width='100%' height='100%' layout="responsive" objectFit="contain" />
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  T-SHIRTS
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  Wear the code
                </h2>
                <p className="mt-1">₹499</p>
                <p className="mt-1">Size - S, M, L, XL, XXL</p>
              </div>
            </Link>
          </div>
         
         





        </div>
      </div>
    </section>
  )
}

export default stickers
