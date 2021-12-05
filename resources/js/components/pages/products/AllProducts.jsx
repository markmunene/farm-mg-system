import React, { useRef, useState, useEffect } from "react";

import { Link } from "react-router-dom";
import ProductCart from "./ProductCart";
import "./products.css";
import SingleProduct from "./SingleProduct";
import CreateProduct from "./CreateProduct";
import { useContacts } from "../../context/UsersDetails";
import axios from "axios";

export default function AllProducts() {
    const { value, user } = useContacts();

    const [showCreateInput, setshowCreateInput] = useState(false);
    const [ProductCategory, setProductCategory] = useState([]);
    const [productSearch, setproductSearch] = useState([]);


    useEffect(() => {
        if (value.User_Role === 1) {
            setshowCreateInput(!showCreateInput);
        }
    }, [value.length]);
    useEffect(() => {
        // .then(response => {
        //         let images = response.data.map(image => {
        //             return {
        //                 src : '/storage/' + image.uri,
        //                 width : image.width,
        //                 height : image.height,
        //                 id :  image.id
        //             }
        //         });
        return () => {};
    }, []);
    const [fetchedProducts, setfetchedProducts] = useState([]);
    useEffect(() => {
        getProducts();

        return () => {};
    }, []);
    const getProducts = async () => {
        try {
            await axios.get("/api/product").then((res) => {
                setfetchedProducts(res.data);
            
            });
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <>
            <div className="header my-3">
                <div className="line"></div>
                <h2 className="text-center px-5 mx-5">
                    <strong>Market Place</strong>
                </h2>
            </div>

            <div className="row ">
                <div className="col-md-9 ">
                    <div className="row">
                        {fetchedProducts
                            .filter((filteredPost) => {
                                if (ProductCategory == "") {
                                    return filteredPost;
                                } else if (
                                    filteredPost.Product_category === ProductCategory
                                ) {
                                    return filteredPost;
                                }
                            })
                            .filter((filteredPost) => {
                                if (productSearch == "") {
                                    return filteredPost;
                                } else if (
                                    filteredPost.Product_name.toLowerCase().includes(    
                                        productSearch.toLowerCase()
                                    )
                                ) {
                                    return filteredPost;
                                }
                            })
                            .map((items, index) => {
                                return (
                                    <>
                                        <div
                                            className="productCard container col-md-3 mx-3 my-2 "
                                            key={index}
                                        >
                                            <div className="row">
                                                <div className="col-md-3 px-2">
                                                    <div
                                                        className="card "
                                                        style={{
                                                            backgroundImage: `url("./UProductImages/${items.Image_name}")`,

                                                            width: "20rem",
                                                        }}
                                                    >
                                                        {/* <img
                                                        src={`/UProductImages/${items.Image_name}`}
                                                        className="card-img-top img-fluid"
                                                    /> */}
                                                        <div className="Productbody">
                                                            <div className="d-flex justify-content-between  ">
                                                                <h5>
                                                                    <strong>
                                                                        {
                                                                            items.Product_name
                                                                        }
                                                                    </strong>
                                                                </h5>
                                                                <h5>
                                                                    <strong>
                                                                        Kes
                                                                        {
                                                                            items.Price
                                                                        }
                                                                    </strong>
                                                                </h5>
                                                            </div>
                                                            <h5>
                                                                <strong>
                                                                    {
                                                                        items.Location
                                                                    }
                                                                    , Kenya
                                                                </strong>
                                                            </h5>
                                                            <div className="">
                                                                <Link
                                                                    to={{
                                                                        pathname:
                                                                            "/singleProduct",
                                                                        state: {
                                                                            data: items,
                                                                        },
                                                                    }}
                                                                >
                                                                    <button className="btn btn-success">
                                                                        <strong>
                                                                            More
                                                                            Details
                                                                        </strong>
                                                                    </button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="searchInput">
                        <div className="serahcTitle d-flex justify-content-center">
                            <h4>Search for Products</h4>
                        </div>
                        <div className="inputForm">
                            <select
                                placeholder="product category"
                                style={{
                                    width: "200px",
                                }}
                                name="ProductCategories"
                                className={`form-control ${
                                    ""
                                    // hasErrorFor("Product_category") ? "is-invalid" : ""
                                }`}
                                onChange={(e) =>
                                    setProductCategory(e.target.value)
                                }
                            >
                                <option value="1">Aquaculture</option>
                                <option value="2">Horticulture</option>
                                <option value="3">LiveStock</option>
                            </select>
                            <div
                                className="input-group input-group-sm my-2"
                                style={{
                                    width: "200px",
                                }}
                            >
                                <input
                                    type="text"
                                    name="table_search"
                                    className="form-control float-right"
                                    placeholder="product Title"
                                    value={productSearch}
                                    onChange={(e) =>
                                        setproductSearch(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    {showCreateInput ? (
                        <div className="createProductInput my-2">
                            <Link
                                to="/createProduct"
                                className="btn btn-info m-2"
                            >
                                Create Product
                            </Link>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </>
    );
}
