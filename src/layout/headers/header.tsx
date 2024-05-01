"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useGlobalContext from "../../hooks/use-context";
import Image from "next/image";
import whiteLogo from "../../../public/assets/img/logo/logo.png";
import hotline from "../../../public/assets/img/icon/action-hotline.png";
import CartIcon from "@/sheardComponent/elements/icons/cart-icon";
import WishlistIcon from "@/sheardComponent/elements/icons/wishlist-icon";
import { useUniqueProductCount, useUniqueWishlstCount } from "@/hooks/useCartQuantity";
import SidebarCart from "./SidebarCart";
import SidebarWishlist from "./SidebarWishlist";

const HeaderOne = () => {

  const { setShowSidebar, setOpenCart, user,setOpenWishlist } = useGlobalContext();
  const safeSetShowSidebar = setShowSidebar || (() => {});
  const [searchOpen, setSearchOpen] = useState(false);
  const productQuantity = useUniqueProductCount();
  const wishlistQuantity = useUniqueWishlstCount();

  useEffect(() => {
    window.addEventListener("scroll", sticky);
    return () => {
      window.removeEventListener("scroll", sticky);
    };
  });

  const sticky = () => {
    const header = document.querySelector("#header-sticky");
    const scrollTop = window.scrollY;
    if (header) {
      scrollTop >= 40
        ? header.classList.add("header-sticky")
        : header.classList.remove("header-sticky");
    }
  };

  // Sticky Menu Area End
  return (
    <>
      <header>
        <div id="header-sticky">
          <div className="bd-header__area-2 position-relative">
            <div className="container">
              <div className="bd-header__main-wrapper-2">
                <div className="row align-items-center">
                  <div className="col-12">
                        <div className="bd-header__logo-2 p-relative">
                          <Link href="/">
                            <Image
                              className="logo-white"
                              style={{
                                marginLeft: 0,
                                borderRadius: '20px',
                                height: '75px',
                                width: '245px'
                              }}
                              src={whiteLogo}
                              alt="logo"
                            />
                            <Image
                              style={{
                                marginLeft: 0,
                                borderRadius: '20px',
                                height: '75px',
                                width: '245px'
                              }}
                              className="logo-black"
                              src={whiteLogo}
                              alt="logo"
                            />
                          </Link>
                          {/* <div className="bd-header__logo-bg">
                            <Image src={headerLogo} alt="logo-bg" />
                          </div> */}
                          <Link
                                className="cart-btn bd-fill__btn"
                                href="/cart"
                                style={{width: 100, right: 0, top: "15%", position: "absolute"}}
                              >
                              <button
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Quick View"
                              >
                                Reservation
                              </button>
                            </Link>
                        </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </header>
      
      <SidebarCart />
      <SidebarWishlist/>
    </>
  );
};

export default HeaderOne;
