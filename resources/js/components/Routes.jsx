import { useContext, useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import HomeChat from "./pages/homeChat.jsx";
import CreateProduct from "./pages/products/CreateProduct.jsx";

import Login from "./auth/login.jsx";
import Register from "./auth/register.jsx";
import Create from "./blog/Create.jsx";
import BlogHome from "./blog/BlogHome.jsx";
import SinglePost from "./blog/SinglePost.jsx";
import SingleProduct from "./pages/products/SingleProduct.jsx";
import ProductCart from "./pages/products/ProductCart.jsx";
import Testing from "./Testing.jsx";
import NotFound from "./NotFound.jsx";
import Navbar from "./navigation/Navbar.jsx";
import AllProducts from "./pages/products/AllProducts.jsx";
import AdminDashBord from "./AdimnBackEnd/adminDashBord.jsx";
import MainExpense from "./pages/ExpenseSection/MainExpense.jsx";

import Contact from "./Contact.jsx";

import { useContacts } from "./context/UsersDetails.js";
import {
    Route,
    Switch,
    BrowserRouter as Router,
    useRouteMatch,
    useHistory,
    Redirect,
} from "react-router-dom";

const Routes = (props) => {
    const { value } = useContacts();
   
    return (
        <>
            <Navbar />

            <Route path="/login" component={Login} />
            {Object.keys(value).length === 0 ? (
                //    props.history.push('/login')
                <Redirect to="/login" />
            ) : (
                <>
                    <Route
                        path="/singleProduct"
                        component={SingleProduct}
                    ></Route>
                    <Route path="/admin" component={AdminDashBord}></Route>

                    <Route
                        path="/products"
                        exact
                        component={AllProducts}
                    ></Route>

                    <Route path="/cart" exact component={ProductCart}></Route>

                    <Route path="/" exact component={Testing} />
                    <Route path="/createProduct" exact component={CreateProduct} />

                    <Route path="/homechat" exact component={HomeChat}></Route>
                    <Route
                        path="/expense"
                        exact
                        component={MainExpense}
                    ></Route>

                    <Route path="/create" component={Create} />
                    <Route path="/contactUs" component={Contact} />

                    <Route path={`/singlePost`} component={SinglePost} />

                    <Route path="/register" component={Register} />
                    <Route path="/bloghome" component={BlogHome} />

                    {/* <Route component={NotFound} /> */}
                </>
            )}
        </>
    );
};

export default Routes;
