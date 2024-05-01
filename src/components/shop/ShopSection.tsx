"use client";
import React, { useState, useEffect } from "react";
import ShopSidebarCategories from "./ShopSidebarCategories";
import axios from "axios";
import GridViewProduct from "./GridViewProduct";
import useGlobalContext from "@/hooks/use-context";
import ShopPreloader from "@/preloaders/ShopPreloader";
import CarsJSONData from '../../../cars.json';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { mockSearch } from "@/utils/utils";

const ShopSection = () => {
  const {
    prodcutLoadding,
    setCars,
    cars
  } = useGlobalContext();
  const [searchValue, setSearchValue] = useState("");

  const getCars = useSelector((state: RootState) => state.cart.cars);

  const handleSearchInputChange = (e:any) => {
    setSearchValue(e.target.value);
  }

  useEffect(() => {
    localStorage.setItem("cars", JSON.stringify(CarsJSONData));
    setCars(CarsJSONData.cars);
  }, []);

  useEffect(() => {
    setCars(getCars);
  }, [getCars]);

  const handleInputKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleInputChange(e);
    }
  }

  const handleInputChange = (e: any) => {
    const result = mockSearch(getCars, searchValue);
    setCars(result);
  };
  return (
    <>
      <section className="bd-shop__area pt-55 pb-85">
        <div className="container">
          <div className="row">
            <div className="col-xxl-3 col-xl-4 col-lg-4">
              <div className="bd-sidebar__widget-warpper mb-60">
                <div className="bd-product__filters">
                  <ShopSidebarCategories />
                </div>
              </div>
            </div>
            <div className="col-xxl-9 col-xl-8 col-lg-8">
              <div className="row">
                  <div className="bd-top__filter-search p-relative mb-30">
                    <form className="bd-top__filter-input" action="#">
                      <input
                        type="text"
                        placeholder="Search keyword..."
                        value={searchValue}
                        onKeyDown={handleInputKeyDown}
                        onChange={handleSearchInputChange}
                      />
                      <button>
                        <i className="fa-regular fa-magnifying-glass" onClick={handleInputChange}></i>
                      </button>
                    </form>
                  </div>
              </div>
              {!prodcutLoadding ?  <div className="row">
                <div className="col-xl-12">
                  <div className="bd-shop__wrapper">
                    <div className="tab-content" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        <div className="bd-trending__item-wrapper">
                          <div className="row">
                            <GridViewProduct
                              cars={cars}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> : <ShopPreloader end={7} />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopSection;
