"use client";
import React, { createContext, useState, useEffect } from "react";
import {
  AppContextType,
  IUser,
  SellProductInfoType,
} from "@/interFace/interFace";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  ProductType,
} from "@/interFace/api-interFace";
export const AppContext = createContext<AppContextType | undefined>(undefined);
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(12);
  const [totalPages, setotalPages] = useState<number>(0);
  const [currentPage, setcurrentPage] = useState<number>(0);
  const [prodcutLoadding, setProdcutLoadding] = useState<boolean>(false);

  const [products, setProducts] = useState<ProductType[]>([]);
  const [cars, setCars] = useState<any[]>([]);
  const [myproducts, setMyProducts] = useState<ProductType[]>([]);
  const [Paymentproducts, setPaymentProducts] = useState<SellProductInfoType[]>(
    []
  );
  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalId, setModalId] = useState<string>("");
  const [scrollDirection, setScrollDirection] = useState("up");
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);
  // wishlist states
  const [showSidebarWishlist, setShowSidebarWishlist] =
    useState<boolean>(false);
  const [openWishlist, setOpenWishlist] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [update, setUpdate] = useState<boolean>(false);
  const [dynamicId, setDynamicId] = useState<string>("");
  const [totalProduct, settotalProduct] = useState<number>(0);

  const token =localStorage.getItem("accessToken")
  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setLoading(false);
    setLoggedIn(false);
    setUser(undefined);
  }; 

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };
  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const contextValue: AppContextType = {
    sideMenuOpen,
    toggleSideMenu,
    scrollDirection,
    setScrollDirection,
    showSidebar,
    setShowSidebar,
    user,
    setLoggedIn,
    setLoading,
    loading,
    logout,
    setUser,
    header,
    loggedIn,
    setProducts,
    products,
    openCart,
    setOpenCart,
    Paymentproducts,
    setPaymentProducts,
    toggleModal,
    openModal,
    setOpenModal,
    modalId,
    setModalId,
    newComment,
    setNewComment,
    myproducts,
    setMyProducts,
    paymentSuccess,
    setPaymentSuccess,
    currentPage,
    setcurrentPage,
    totalPages,
    setotalPages,
    page,
    setPage,
    limit,
    showSidebarWishlist,
    setShowSidebarWishlist,
    openWishlist,
    setOpenWishlist,
    prodcutLoadding, setProdcutLoadding,
    update, setUpdate,dynamicId, setDynamicId,totalProduct, settotalProduct,
    cars, setCars
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
