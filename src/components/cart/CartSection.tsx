"use client";
import {
  cart_product,
  change_cart_product,
  clear_cart,
  decrease_quantity,
  remove_cart_product,
} from "@/redux/slices/cartSlice";
import { RootState } from "@/redux/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ImageWithBasePath from "../common/image/ImageWithBasePath";
import { DatePicker } from "antd";
import { Dropdown, Tag } from '@douyinfe/semi-ui';
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";

const CartSection = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector(
    (state: RootState) => state.cart.cartProducts
  );
  const availableButton = cartProducts.every(product => {
    const {dateStart, dateReturn} = product;
    return (product.price_per_day ?? 0) * (product.totalCard ?? 0) * (Math.abs(dateStart && dateReturn ?  dayjs(dateReturn).diff(dateStart, 'day') : 0) ?? 1) > 0;
  })

  const removeAllProduct = () => {
    dispatch(clear_cart());
  };

  const handleAddToCart = (product: any, totalCard: number) => {
    if ( totalCard && totalCard >= product.quantity) {
      toast.info("The car is out of quanitity, you cannot increase");
      return;
    }
    const carProduct = { ...product, fromGrid: false};
    dispatch(cart_product(carProduct));
  };

  const handleChangeCart = (product: any, totalCard: number, dateStart?: Date, dateReturn?: Date) => {
    const carProduct = { ...product, dateStart, dateReturn, dateInterval: Math.abs(dateStart && dateReturn ?  dayjs(dateReturn).diff(dateStart, 'day') : 1)};
    dispatch(change_cart_product(carProduct));
  };

  const handDecressCart = (product: any) => {
    dispatch(decrease_quantity(product));
  };

  const handleDelteProduct = (product: any) => {
    dispatch(remove_cart_product(product));
  };

  const handleChange = (e: any) => {};
  return (
    <>
      {cartProducts.length === 0 && (
        <div className="container">
          <div className="empty-text pt-100 pb-100 text-center">
            <h3>Your cart is empty</h3>
          </div>
        </div>
      )}
      {cartProducts.length >= 1 && (
        <section className="cart-area pt-115 pb-130">
          <div className="container small-container">
            <div className="row">
              <div className="col-12">
                <div className="table-content table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="product-thumbnail">Images</th>
                        <th className="cart-product-name">Type</th>
                        <th className="cart-product-name">Car Model</th>
                        <th className="cart-product-name">Brand</th>
                        <th className="product-price">Price Per day</th>
                        <th className="product-quantity">Mileage</th>
                        <th className="product-quantity">Quantity</th>
                        <th className="cart-product-name">Fuel Type</th>
                        <th className="product-subtotal">Seats</th>
                        <th className="cart-product-name">Description</th>
                        <th className="cart-product-name">Start Date</th>
                        <th className="cart-product-name">Return Date</th>
                        <th className="product-subtotal">Rent Num</th>
                        <th className="product-subtotal">SubTotal</th>
          
                        <th className="product-remove">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartProducts.map((item, index) => (
                        <tr key={index}>
                          <CartItem 
                          item={item}
                          handleChange={handleChange} 
                          handDecressCart={handDecressCart} 
                          handleAddToCart={handleAddToCart} 
                          handleDelteProduct={handleDelteProduct}
                          handleChangeCart={handleChangeCart} />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="coupon-all">
                    
                      <div className="coupon2">
                        <button
                          className="bd-border__btn"
                          name="update_cart"
                          type="submit"
                          onClick={removeAllProduct}
                          style={{
                            marginRight: "30px"
                          }}
                        >
                          Clear cart
                        </button>
                        <Link className={`${!availableButton ? "custom_button_disable" : "bd-border__btn"}`} href="/checkout">
                          Proceed to checkout
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};


const CartItem = ({
  item,
  handDecressCart, 
  handleChange,  
  handleAddToCart,
  handleDelteProduct,
  handleChangeCart,
} : 
  { item: any;
    handleChange: (e: any) => void;
    handDecressCart: (product: any) => void;
    handleAddToCart: (product: any, totalCard: number) => void;
    handleDelteProduct: (product: any) => void;
    handleChangeCart: (product: any, totalCard: number, date1?: Date, date2?: Date) => void;
  }) => {
  
    const [isVisible, setIsVisible] = useState(false);  // 控制文字显示的状态
    const [price, setPrice] = useState<number>(item.totalCard * item.price_per_day);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);  // 切换状态
    };

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
      // Can not select days before today and today
      return current && current < dayjs().endOf('day') || (date2  && current > dayjs(date2).endOf('day'));
    };

    const disabledReturnDate: RangePickerProps['disabledDate'] = (current) => {
      // Can not select days before today and today
      return current && current < dayjs(date1).endOf('day');
    };
  
  const [date1, setDate1] = useState(item.dateStart || dayjs().toDate());
  const [date2, setDate2] = useState(item.dateReturn || dayjs().toDate());

  useEffect(() => {
    setPrice(item.totalCard * item.price_per_day * (date1 && date2 ? (dayjs(date2).diff(dayjs(date1), 'day')) : 1));
  }, [date1, date2, item.totalCard])

 
  return (
    <>
    <td className="product-thumbnail">
                          <Link href="#" className="author-img">
                            <ImageWithBasePath
                              src={item.model + '.jpg'}
                              alt="author"
                              height={50}
                              width={50}
                            />
                          </Link>
                          </td>
                          <td className="product-name">
                            <Link href="#">
                              {item.category}
                            </Link>
                          </td>
                          <td className="product-name">
                            <Link href="#">
                              {item.model}
                            </Link>
                          </td>
                          <td className="product-name">
                            <Link href="#">
                              {item.brand}
                            </Link>
                          </td>
                          <td className="product-quantity">
                            <Link href="#">
                              {"$"+item.price_per_day}
                            </Link>
                          </td>
                          
                          <td className="product-quantity">
                            <Link href="#">
                              {item.mileage}
                            </Link>
                          </td>
                          <td className="product-quantity">
                            <Link href="#">
                              {item.quantity}
                            </Link>
                          </td>
                          <td className="cart-product-name">
                            <Link href="#">
                              {item.fuel_type}
                            </Link>
                          </td>
                          <td className="cart-product-name">
                            <Link href="#">
                              {item.seats}
                            </Link>
                          </td>
                          <td className="cart-product-name">
                           <Dropdown
                              render={
                                  <Dropdown.Menu>
                                      <Dropdown.Item>{item.description}</Dropdown.Item>
                                  </Dropdown.Menu>
                              }
                          >
                              <Tag>Hover to See</Tag>
                          </Dropdown>
                          </td>
                          <td className="product-quantity">
                            <div className="input-block date-widget">
                              <div className="group-img">
                                <DatePicker
                                  value={dayjs(date1)}
                                  onChange={(e) => {
                                    setDate1(e.toDate());
                                    handleChangeCart(item, item.totalCard, e.toDate(), date2)
                                  }}
                                  placeholder="04/11/2024"
                                  disabledDate={disabledDate}
                                  allowClear={false}
                                />
                                <span>
                                  <i className="feather icon-calendar"></i>
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="product-quantity">
                          <div className="input-block date-widge">
                              <div className="group-img">
                                <DatePicker
                                  value={dayjs(date2)}
                                  onChange={(e) => {
                                    setDate2(e.toDate());
                                    handleChangeCart(item, item.totalCard, date1, e.toDate())
                                  }}
                                  placeholder="04/11/2024"
                                  disabledDate={disabledReturnDate}
                                  allowClear={false}
                                />
                                <span>
                                  <i className="feather icon-calendar" />
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="product-quantity text-center">
                            <div className="product-quantity mt-10 mb-10">
                              <div className="product-quantity-form">
                                <form onSubmit={(e) => e.preventDefault()}>
                                  <button
                                    type="button"
                                    className="cart-minus"
                                    onClick={() => handDecressCart(item)}
                                  >
                                    <i className="far fa-minus"></i>
                                  </button>
                                  <input
                                    className="cart-input"
                                    type="text"
                                    onChange={handleChange}
                                    value={item.totalCard}
                                  />
                                  <button
                                    type="button"
                                    className="cart-plus"
                                    onClick={() => handleAddToCart(item, item.totalCard)}
                                  >
                                    <i className="far fa-plus"></i>
                                  </button>
                                </form>
                              </div>
                            </div>
                          </td>
                          <td className="product-subtotal">
                            <span className="amount">
                              ${price}
                            </span>
                          </td>
                          <td
                            className="product-remove"
                            onClick={() => handleDelteProduct(item)}
                          >
                            <i className="fa fa-times"></i>
                          </td>
    </>
  )
}

export default CartSection;
