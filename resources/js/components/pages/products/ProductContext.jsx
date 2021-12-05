import axios from "axios";
import React, { useContext, useState, useEffect, useCallback } from "react";

const AllproductsContext = React.createContext();

export function useProductsContext() {
    return useContext(AllproductsContext);
}

export function ProductsProvider({ children }) {
    const [productCount, setproductCount] = useState(-1);

    const [cartData, setcartData] = useState([]);

    const addProductsToCart = (data) => {
        setcartData((prev) => [...prev, data]);
    };
    const removeProduct = (data) => {
        setcartData(data);
    };
    useEffect(() => {
        setproductCount(productCount + 1);

        return () => {};
    }, [cartData.length]);

    // const calculateSingleTotal = (id) => {
    //     let tempCartData = cartData;

    //     tempCartData.forEach((elements, i) => {
    //         if (elements.id === id) {
    //             // if (cartData[i].productCount == null) {
    //             cartData[i].subTotal =
    //                 cartData[i].productCount * cartData[i].Price;
    //         }
    //     });
    //     return setcartData(tempCartData);
    // };

    const handlequantityDecrement = (id) => {
        cartData.forEach((elements, i) => {
            if (elements.id === id) {
                cartData[i].productCount -= 1;
            }
        });
    };
    const handlequantityIncrement = (id) => {
        cartData.forEach((elements, i) => {
            if (elements.id === id) {
                cartData[i].productCount += 1;
            }
        });
    };

    return (
        <AllproductsContext.Provider
            value={{
                addProductsToCart,
                cartData,
                removeProduct,
                handlequantityDecrement,
                handlequantityIncrement,

                productCount,
            }}
        >
            {children}
        </AllproductsContext.Provider>
    );
}
