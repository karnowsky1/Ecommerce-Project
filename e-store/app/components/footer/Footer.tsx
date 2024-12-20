import React from 'react'
import Container from '../Container'
import FooterList from './FooterList'
import Link from 'next/link'
import { MdFacebook } from 'react-icons/md'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">Shop Categories</h3>
            <Link href="#">Phones</Link>
            <Link href="#">Laptops</Link>
            <Link href="#">Desktops</Link>
            <Link href="#">Watches</Link>
            <Link href="#">Tvs</Link>
            <Link href="#">Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Customer Service</h3>
            <Link href="#">Contact Us</Link>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">Returns & Exchanges</Link>
            <Link href="#">Watches</Link>
            <Link href="#">FAQs</Link>
          </FooterList>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2">About Us</h3>
            <p className="mb-2 max-w-32 sm:max-w-40 md:max-w-80">At our electronics store, we are dedicated to providing the latest and greatest devices and accessories to our customers. With a wide selection of phones, TVs, laptops, watches, and accessories.</p>
            <p>&copy; {new Date().getFullYear()} E~Store. All rights reserved</p>
          </div>
          <FooterList>
            <div className="sm:ml-0 md:ml-6 lg:ml-0">
              <h3 className="text-base font-bold mb-2">Follow Us</h3>
              <div className="flex gap-2">
                <Link href="https://www.linkedin.com/in/karnowsky-estime/">
                  <FaLinkedin size={24} />
                </Link>
                <Link href="https://github.com/karnowsky1">
                  <FaGithub size={24} />
                </Link>
                <Link href="https://www.facebook.com/karnowsky.estime/">
                  <MdFacebook size={24} />
                </Link>
              </div>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  )
}

export default Footer