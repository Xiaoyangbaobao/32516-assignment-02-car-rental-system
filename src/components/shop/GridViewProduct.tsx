import useGlobalContext from "@/hooks/use-context";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ImageWithBasePath from "../common/image/ImageWithBasePath";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";
import { cart_product } from "@/redux/slices/cartSlice";
import dayjs from "dayjs";

const GridViewProduct = ({ cars}: any) => {
    const cartProducts = useSelector(
      (state: RootState) => state.cart.cartProducts
    );
    const dispatch = useDispatch();
    const handleAddToCart = (car?: any) => {
      if (!car) return;
      const quantity = cartProducts.find((item) => item?.id === car ?.id);
      const totalCart = quantity?.totalCard;
      if ( car && totalCart >= car.quantity) {
        toast.info("This car is out of quantity");
        return;
      }
      dispatch(cart_product({...car, fromGrid: true}));
    };
  return (
    <>
      {cars.map((item: any, index: number) => {
            return (
              <div
                    key={index}
                    className="col-xl-6 col-lg-6 col-md-6 col-12"
                  >
                    <div className="listing-item">
                      <div className="listing-img">
                        <Link href={""}>
                          <ImageWithBasePath
                            src={item.model + '.jpg'}
                            className="img-fluid"
                            alt={item.model}
                          />
                        </Link>
                        <div className="fav-item">
                          <span className="featured-text">{item.brand}</span>
                          <Link href="#" className="fav-icon">
                            <i className="feather icon-heart"></i>
                          </Link>
                        </div>
                      </div>
                      <div className="listing-content">
                        <div className="listing-features">
                          <Link href="#" className="author-img">
                            <ImageWithBasePath
                              src={item.model + '.jpg'}
                              alt="author"
                            />
                          </Link>
                          <h3 className="listing-title">
                            <Link href={""}>{item.model}</Link>
                          </h3>
                        </div>
                        <div className="listing-details-group">
                          <ul>
                            <li>
                              <span>
                                <ImageWithBasePath
                                  src="car-parts-05.svg"
                                  alt={item.category}
                                />
                              </span>
                              <p>{item.category}</p>
                            </li>
                            <li>
                              <span>
                                <ImageWithBasePath
                                  src="car-parts-02.svg"
                                  alt={item.mileage}
                                />
                              </span>
                              <p>{item.mileage}</p>
                            </li>
                            <li>
                              <span>
                                <ImageWithBasePath
                                  src="car-parts-03.svg"
                                  alt={item.fuel_type}
                                />
                              </span>
                              <p>{item.fuel_type}</p>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <span>
                                <ImageWithBasePath
                                  src="car-parts-04.svg"
                                  alt={item.power}
                                />
                              </span>
                              <p>{item.power}</p>
                            </li>
                            <li>
                              <span>
                                <ImageWithBasePath
                                  src="car-parts-05.svg"
                                  alt={item.model_year}
                                />
                              </span>
                              <p>{item.model_year}</p>
                            </li>
                            <li>
                              <span>
                                <ImageWithBasePath
                                  src="car-parts-06.svg"
                                  alt="Persons"
                                />
                              </span>
                              <p>{item.seats} Persons</p>
                            </li>
                          </ul>
                        </div>
                        <div className="listing-location-details">
                          <div className="listing-price">
                            <span>
                              <i className="feather icon-map-pin" />
                            </span>
                            {item.location}
                          </div>
                          <div className="listing-price">
                            <h6>{'$' + item.price_per_day + " per Day"}</h6>
                          </div>
                        </div>
                        <div className="order-button-payment">
                          <Link
                                className="cart-btn bd-fill__btn"
                                href="/cart"
                              >
                            <button
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Quick View"
                              className={` ${(!item.availability || item.quantity <= 0) ? "custome_disable" : "bd-fill__btn"}`}
                              onClick={() => {
                                handleAddToCart(item);
                              }}
                            >
                              <span>
                                <i className="feather icon-calendar me-2" />
                              </span>
                              {!item.availability ? "Unavailable" : "Rent Now"}
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
            )
          })} 
        </>
  );
};

export default GridViewProduct;
