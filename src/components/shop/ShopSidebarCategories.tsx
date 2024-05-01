import useGlobalContext from "@/hooks/use-context";
import { CategoryType } from "@/interFace/api-interFace";
import ShopSidebarPreloader from "@/preloaders/ShopSidebarPreloader";
import { mockSearch } from "@/utils/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CarsJSONData from '../../../cars.json';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const categoryList = [
  { _id: "2", categoryName: "SUV"},
  { _id: "3",categoryName: "Minivan"},
  { _id: "4",categoryName: "Wagon"},
  { _id: "5",categoryName: "Sedan"},
  { _id: "6",categoryName: "Hatchback"},
  { _id: "7",categoryName: "UTE"}
]

const brandList = [
  { _id: "2", categoryName: "Toyota"},
  { _id: "3",categoryName: "Kia"},
  { _id: "4",categoryName: "Hyundai"},
  { _id: "5",categoryName: "Subaru"},
  { _id: "6",categoryName: "Ford"},
  { _id: "7",categoryName: "Audi"},
  { _id: "8",categoryName: "BMW"},
  { _id: "9",categoryName: "Volkswagen"},
  { _id: "10",categoryName: "Mercedes-Benz"},
  { _id: "11",categoryName: "Jeep"},
]

const ShopSidebarCategories = () => {
  const [searchValue, setSearchValue] = useState("");
  const [key, setKey] = useState("");
  
  const { cars, setCars } =
    useGlobalContext();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);

    const toggleMenu = () => {
      setIsCategoryOpen(!isCategoryOpen);
    };

    const toggleBrand = () => {
      setIsBrandOpen(!isBrandOpen);
    }
  
    const handleViewAll = () => {
      setCars(CarsJSONData.cars);
      setIsCategoryOpen(!isCategoryOpen);
    }
    const getCars = useSelector((state: RootState) => state.cart.cars);

    useEffect(() => {
      setCars(getCars);
    }, [getCars]);
    
    useEffect(() => {
      if (searchValue) {
        const result = mockSearch(getCars, searchValue, key);
        setCars(result);
      }

    }, [searchValue, setCars]);

  return (
    <>
      <div className="bd-filter__widget child-content-hidden">
        <h4 className="bd-filter__widget-title drop-btn" onClick={toggleMenu}>Categories</h4>
        <div className={`bd-filter__content menu ${isCategoryOpen ? 'open' : ''}`}>
            <div onClick={handleViewAll} className="bd-singel__rating">
              <input
                className="radio-box"
                type="radio"
                id="view-all-1"
                name="rating"
              />
              <label className="radio-star" htmlFor="view-all-1">
                <div className="bd-product__icon custome-cursor text-capitalize">
                  view all
                </div>
            </label>
            </div>
          <ul>
          {
            categoryList.map((item, index) => (
              <li
                onClick={() => {
                  setSearchValue(item.categoryName);
                  setKey("category");
                  setIsCategoryOpen(!isCategoryOpen);
                }}
                key={index}
                className="bd-singel__rating"
              >
                <input
                  className="radio-box"
                  type="radio"
                  id={item._id}
                  name="rating"
                />
                <label className="radio-item" htmlFor={item._id}>
                  <div className="bd-product__icon custome-cursor text-capitalize">
                    {item.categoryName}
                  </div>
                </label>
              </li>
            ))
          }
          </ul>
        </div>
        <h4 className="bd-filter__widget-title drop-btn" onClick={toggleBrand}>Brands</h4>
        <div className={`bd-filter__content menu ${isBrandOpen ? 'open' : ''}`}>
          <ul>
          {
            brandList.map((item, index) => (
              <li
                onClick={() => {
                  setSearchValue(item.categoryName);
                  setKey("brand");
                  setIsBrandOpen(!isBrandOpen);
                }}
                key={index}
                className="bd-singel__rating"
              >
                <input
                  className="radio-box"
                  type="radio"
                  id={item._id}
                  name="rating"
                />
                <label className="radio-item" htmlFor={item._id}>
                  <div className="bd-product__icon custome-cursor text-capitalize">
                    {item.categoryName}
                  </div>
                </label>
              </li>
            ))
          }
          </ul>
        </div>
      </div>
    </>
  );
};

export default ShopSidebarCategories;
