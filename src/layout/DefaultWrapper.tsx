//@refresh
"use client";
import React, { useEffect } from "react";
import { animationCreate } from "@/utils/utils";
// import Footer from './footer/Footer';
import HeaderOne from "../layout/headers/header";
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}
import { usePathname } from "next/navigation";
import { childrenType } from "@/interFace/interFace";
import BacktoTop from "@/components/common/backToTop/BacktoTop";

// import HeaderTwo from './header/HeaderTwo';

const Wrapper = ({ children }: childrenType) => {
  useEffect(() => {
    setTimeout(() => {
      animationCreate();
    }, 200);
  }, []);

  return (
    <>
      <BacktoTop />
      {(() => {
        return <HeaderOne />;
      })()}
      {children}
    </>
  );
};

export default Wrapper;
