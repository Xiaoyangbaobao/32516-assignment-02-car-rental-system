"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import moment from "moment";
import useGlobalContext from "@/hooks/use-context";
import CarsJSONData from '../../../cars.json';

interface CartState {
  cartProducts: any[];
  cars: any[];
  historySearches: any[];
}

const initialState: CartState = {
  cartProducts: [],
  cars: CarsJSONData.cars,
  historySearches: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hisotry_search: (state, { payload }:PayloadAction<any>) => {
      state.historySearches.push(payload.hisotrySearch)
      state.historySearches.filter((item, index, self) => self.indexOf(item) !== index);
    },
    cart_product: (state, { payload }: PayloadAction<any>) => {
      const productIndex = state.cartProducts.findIndex(
        (item) => item.id === payload.id
      );

      if (productIndex >= 0) {
        payload.fromGrid ? state.cartProducts[productIndex].totalCard = 1 : state.cartProducts[productIndex].totalCard! += 1;
        if (payload.dateInterval) {
          state.cartProducts[productIndex].dateInterval = payload.dateInterval;
        }
        if (payload.dateStart) {
          state.cartProducts[productIndex].dateStart = payload.dateStart;
        }
        if (payload.dateReturn) {
          state.cartProducts[productIndex].dateReturn = payload.dateReturn;
        }
        toast.info("Increase Product Quantity");
      } else {
        const now = moment();
        const orderDate = now.format("MM/DD/YY hh:mm a"); // Format the current date as "MM/DD/YY hh:mm a"
        const tempProduct = {
          ...payload,
          totalCard: 1,
          orderDate: orderDate, // Include the formatted date as "orderDate"
        };
        state.cartProducts.push(tempProduct);
        const capitalizedproductNameName =
          payload.model.charAt(0).toUpperCase() +
          payload.model.slice(1);
        toast.success(`${capitalizedproductNameName} added to reservation.`);
      }
    },
    change_cart_product: (state, { payload }: PayloadAction<any>) => {
      const productIndex = state.cartProducts.findIndex(
        (item) => item.id === payload.id
      );
      if (productIndex >= 0) {
        if (payload.dateInterval) {
          state.cartProducts[productIndex].dateInterval = payload.dateInterval;
        }
        if (payload.dateStart) {
          state.cartProducts[productIndex].dateStart = payload.dateStart;
        }
        if (payload.dateReturn) {
          state.cartProducts[productIndex].dateReturn = payload.dateReturn;
        }
      }
    },

    remove_cart_product: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.id !== payload.id
      );
      toast.error(`remove from your cart`);
    },

    clear_cart: (state) => {
      const confirmMsg = window.confirm(
        "Are you sure deleted your all cart items ?"
      );
      if (confirmMsg) {
        state.cartProducts = [];
      }
    },
    clear_cart_after_payment: (state) => {
      state.cartProducts = [];
    },

    decrease_quantity: (state, { payload }: PayloadAction<any>) => {
      const cartIndex = state.cartProducts.findIndex(
        (item) => item.id === payload.id
      );
      if (cartIndex >= 0 && state.cartProducts[cartIndex]?.totalCard) {
        if (state.cartProducts[cartIndex].totalCard > 1) {
          state.cartProducts[cartIndex].totalCard -= 1;
        } else {
          toast.error(`Quantity cannot be less than 1`);
        }
      }
    },
    decrease_quantity_after_order: (state, { payload }: PayloadAction<any>) => {

      let cars = state.cars;
      let newCars: any[] = [];
      cars.forEach((currCar: any) => {
        const cartIndex = state.cartProducts.findIndex(
          (item) => item.id === currCar.id
        );
        if (cartIndex >= 0 
            && state.cartProducts[cartIndex]?.totalCard 
            && state.cartProducts[cartIndex].totalCard >= 1) {            
            console.log(currCar.quantity, state.cartProducts[cartIndex].totalCard, currCar.availability);
            currCar.quantity = currCar.quantity - state.cartProducts[cartIndex].totalCard;
            if (currCar.quantity <= 0) {
              currCar.availability = false;
            }
        }
        newCars.push(currCar);
      });
      localStorage.setItem('cars', JSON.stringify(newCars));
      state.cars = newCars;
    },
  },
});

export const {
  hisotry_search,
  cart_product,
  remove_cart_product,
  clear_cart,
  clear_cart_after_payment,
  decrease_quantity,
  change_cart_product,
  decrease_quantity_after_order,
} = cartSlice.actions;

export default cartSlice.reducer;
