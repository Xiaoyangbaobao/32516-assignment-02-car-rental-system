import React from 'react';
import Breadcrumb from '../common/breadcrumb/Breadcrumb';
import CartSection from './CartSection';

const CartMain = () => {
    return (
        <>
            <Breadcrumb breadHome='Home' breadMenu='Reservation'/>
            <CartSection/>
        </>
    );
};

export default CartMain;