"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useGlobalContext from "@/hooks/use-context";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import moment from "moment";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clear_cart_after_payment, decrease_quantity_after_order } from "@/redux/slices/cartSlice";
import {v4 as uuidv4 } from 'uuid';
import dayjs from "dayjs";
interface FormData {
  Fname: string;
  Lname: string;
  EmailAddress: string;
  Phone: string;
  DriverLiscense: string;
}

const CheckOutMain = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [transactionId, ] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const { user, header, setPaymentSuccess } = useGlobalContext();
  const now = moment();
  const date = now.format("MM/DD/YY hh:mm a");
  const cartProducts = useSelector(
    (state: RootState) => state.cart.cartProducts
  );

  const totalPrice = cartProducts.reduce(
    (total, product) => { 
      const {dateStart, dateReturn} = product;
      return total + (product.price_per_day ?? 0) * (product.totalCard ?? 0) * Math.abs(dateStart && dateReturn ?  dayjs(dateReturn).diff(dateStart, 'day') : 1) ?? 1},
    0
  );

  const handleGoToShopPage = () => {
    router.push("/shop");
  };

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const Fname = data.Fname;
    const EmailAddress = data.EmailAddress;
    const Phone = data.Phone;
    const DriverLiscense = data.DriverLiscense;
    setProcessing(true);
      const sellProductInfo = {
        buyerEmail: EmailAddress,
        name: Fname,
        EmailAddress,
        date,
        Phone,
        totalPrice,
        orderProducts: cartProducts,
        DriverLiscense,
        paymentId:"12312321",
        shipmentStatus: "pending",
        shipmentStatusArray: [],
        orderId: uuidv4()
      };
      router.push("/shop");
      dispatch(decrease_quantity_after_order({}));
      dispatch(clear_cart_after_payment());
      setPaymentSuccess(true);
      toast.success(`Payment Success, an email has sent to ${EmailAddress}`, {
        position: "top-left",
      });
      // axios
      //   .post(
      //     `/api/orders`,
      //     sellProductInfo,
      //     header
      //   )
      //   .then((res) => {
      //       
            
      //   })
      //   .catch((error) => {
      //     console.log(error.message)
      //     toast.error(`Input error: ${error.message}`);
      //     setPaymentSuccess(false);
      //   }).finally(() => {
      //     setProcessing(false);
      //   })
  };

  const emailWatch = watch("EmailAddress");
  const driverLiscenseWatch = watch("DriverLiscense");
  const mobileWatch = watch("Phone");
  const nameWatch = watch("Fname");
  useEffect(() => {
    if (emailWatch) {
      trigger("EmailAddress");
    }
    if (driverLiscenseWatch) {
      trigger("DriverLiscense");
    }
    if (mobileWatch) {
      trigger("Phone");
    } 
    if (nameWatch) {
      trigger("Fname");
    }

  }, [emailWatch, mobileWatch, driverLiscenseWatch, nameWatch, trigger]);

  return (
    <>
      <section className="checkout-area pt-115 pb-100">
        <div className="container small-container">
          <div className="coupon-accordion">
            <h3>
              {" "}
              Hi, {user?.name} <span id="showlogin"> Wellcome To Xiaoyang Rental Car Center </span>
            </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-lg-6">
                <div className="checkbox-form">
                  <h3>Billing To</h3>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="checkout-form-list">
                        <label>
                          Name <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          defaultValue={user?.email && user.name}
                          placeholder="Enter Your Name"
                          {...register("Fname", {
                            required: "Name is required",
                          })}
                        />
                        {errors.Fname && (
                          <span className="error-message">
                            {errors.Fname.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="checkout-form-list">
                        <label>
                          Driver Liscense Num <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          defaultValue={user?.driverLiscense}
                          placeholder=""
                          {...register("DriverLiscense", {
                            required: "Driver Liscense is required",
                            validate: (value) => { 
                              return /^\d{1,10}$/.test(value) ? true : "It is not a valid Driver Liscense" }
                          })}
                        />
                        {errors.DriverLiscense && (
                          <span className="error-message">
                            {errors.DriverLiscense.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkout-form-list">
                        <label>
                          Email Address <span className="required">*</span>
                        </label>
                        <input
                          type="email"
                          defaultValue={user?.email && user.email}
                          placeholder=""
                          {...register("EmailAddress", {
                            required: "Email is required",
                            validate: (value) => { 
                              return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? true : "It is not a valid Email" }
                          })}
                        />
                        {errors.EmailAddress && (
                          <span className="error-message">
                            {errors.EmailAddress.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkout-form-list">
                        <label>
                          Phone <span className="required" color="red">*</span>
                        </label>
                        <input
                          type="text"
                          defaultValue={user?.email && user.phone}
                          placeholder="Phone Number"
                          {...register("Phone", {
                            required: "Phone is required",
                            validate: (value) => { 
                              return /^\d{9}$/.test(value) ? true : "This is not a valid phone number"}
                          })}
                        />
                        {errors.Phone && (
                          <span className="error-message">
                            {errors.Phone.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* order info */}
              <div className="col-lg-6">
                <div className="your-order mb-30 ">
                  <h3>Your order</h3>
                  <div className="your-order-table table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th className="product-name">Product</th>
                          <th className="product-total" onClick={() => {
                          }}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartProducts.map((item, index) => (
                          <tr className="cart_item" key={index}>
                            <td className="product-name">
                              {item.productName}{" "}
                              <strong className="product-quantity">
                                {" "}
                                × {item?.totalCard}
                              </strong>
                            </td>
                            <td className="product-total">
                              <span className="amount">
                                ${(item.price_per_day ?? 0) * (item.totalCard ?? 0) * Math.abs(item.dateStart && item.dateReturn ?  dayjs(item.dateReturn).diff(item.dateStart, 'day') : 1) ?? 1}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="cart-subtotal">
                          <th>Cart Subtotal</th>
                          <td>
                            <span className="amount">${totalPrice}</span>
                          </td>
                        </tr>
                        <tr className="order-total">
                          <th>Order Total</th>
                          <td>
                            <strong>
                              <span className="amount">${totalPrice}</span>
                            </strong>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="order-button-payment mt-20">
                      
                          <button
                            onClick={() => {
                              handleGoToShopPage();
                              dispatch(clear_cart_after_payment());
                            }}
                            className={"bd-fill__btn"}
                          >
                             Cancel
                          </button>
                    </div>

                  <div className="order-button-payment mt-20">
                      {cartProducts.length ? (
                        <>
                          <button
                            type="submit"
                            className={
                              ( processing ||
                              !cartProducts) ? "custome_disable" : "bd-fill__btn"
                            }
                            disabled={
                              processing ||
                              !cartProducts
                            }
                          >
                            {transactionId ? "Payment Success" : "Place Order"}
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={handleGoToShopPage}
                            className={
                              user?.email ? "bd-fill__btn" : "custome_disable"
                            }
                          >
                             Checkout
                          </button>
                        </>
                      )}
                    </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default CheckOutMain;
