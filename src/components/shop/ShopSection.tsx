"use client";
import React, { useState, useEffect, ReactNode } from "react";
import ShopSidebarCategories from "./ShopSidebarCategories";
import GridViewProduct from "./GridViewProduct";
import useGlobalContext from "@/hooks/use-context";
import ShopPreloader from "@/preloaders/ShopPreloader";
import CarsJSONData from '../../../cars.json';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { mockSearch } from "@/utils/utils";
import { AutoComplete, Input } from "antd";
import {v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import { hisotry_search } from "@/redux/slices/cartSlice";
const ShopSection = () => {
  const {
    prodcutLoadding,
    setCars,
    cars
  } = useGlobalContext();
  const [searchValue, setSearchValue] = useState("");
  const [options, setOptions] = useState<{label: JSX.Element, options: { value: string, label: JSX.Element}[]}[]>([]);
  
  const getCars = useSelector((state: RootState) => state.cart.cars);
  const dispatch = useDispatch();
  const historySearches = useSelector((state: RootState) => {
    return state.cart.historySearches
  })

  const handleSearchInputChange = (e:any) => {
    setSearchValue(e.target.value);
  }
  const renderItem = (title: string) => {
    const uuidG  = uuidv4();
    return ({
    value: title,
    label: (
      <div
        key={title+"-"+uuidG}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {title}
      </div>
    ),
  })
};

  const renderTitle = (title: string) => (
    <span key={title+"02"}>
      {title}
    </span>
  );

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
                    <AutoComplete
                      popupClassName="certain-category-search-dropdown"
                      options={options}
                      style={{ width: "100%" }}
                      size="large"
                      value={searchValue}
                      onChange={(value) => {
                        setSearchValue(value);
                        if (searchValue !== "") {
                          setOptions([
                            {
                              label: renderTitle("Category"),
                              options: CarsJSONData.cars.map(item => {
                                return  item.category
                              }).filter((item, index, self) => self.indexOf(item) === index).map(item => renderItem(item))
                            },
                            {
                              label: renderTitle("Model"),
                              options: CarsJSONData.cars.map(item => {
                                return item.model
                              }).filter((item, index, self) => self.indexOf(item) === index).map(item => renderItem(item))
                            },
                            {
                              label: renderTitle("Brand"),
                              options: CarsJSONData.cars.map(item => {
                                return item.brand
                              }).filter((item, index, self) => self.indexOf(item) === index).map(item => renderItem(item))
                            }
                          ])
                        } else {
                          setOptions([{
                            label: renderTitle('Recent Searches'),
                            options: historySearches?.map(item => renderItem(item)) || [],
                          }])
                        }
                      }}
                      onSearch={(searchText) => {
                        setSearchValue(searchText);
                      }}
                      onFocus={() => {
                        if (searchValue === "") {
                          setOptions([{
                            label: renderTitle('Recent Searches'),
                            options: historySearches?.map(item => renderItem(item)) || [],
                          }])
                        } else {
                          setOptions([
                            {
                              label: renderTitle("Category"),
                              options: CarsJSONData.cars.map(item => {
                                return  item.category
                              }).filter((item, index, self) => self.indexOf(item) === index).map(item => renderItem(item))
                            },
                            {
                              label: renderTitle("Model"),
                              options: CarsJSONData.cars.map(item => {
                                return item.model
                              }).filter((item, index, self) => self.indexOf(item) === index).map(item => renderItem(item))
                            },
                            {
                              label: renderTitle("Brand"),
                              options: CarsJSONData.cars.map(item => {
                                return item.brand
                              }).filter((item, index, self) => self.indexOf(item) === index).map(item => renderItem(item))
                            }
                          ])
                        }
                      }}
                      onSelect={(value) => {
                        const result = mockSearch(getCars, value);
                        setCars(result);
                        dispatch(hisotry_search({hisotrySearch: value}));
                      }}
                      filterOption={(inputValue, option) => {
                        return option?.value?.toUpperCase().includes(inputValue.toUpperCase());
                        // return option!.options.map(item => item.value).indexOf(inputValue.toUpperCase()) !== -1;
                      }
                      }
                    >
                      <Input.Search size="large" placeholder="Search keyword..." onSearch={() => {
                        if (searchValue !== "") {
                          const result = mockSearch(getCars, searchValue);
                          setCars(result);
                          if (result.length > 0) dispatch(hisotry_search({hisotrySearch: searchValue}));
                        }
                      }}/>

                    </AutoComplete>
                    
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
