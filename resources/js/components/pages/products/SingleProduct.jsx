import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation, Redirect } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

import { useContacts } from "../../context/UsersDetails";
import { useProductsContext } from "./ProductContext";
import axios from "axios";
import moment from "moment";

export default function SingleProduct() {
    const modalDelete = useRef({});
    const { addProductsToCart, cartData } = useProductsContext();
    const { filterSingleUserDetails, user } = useContacts();
    let userInfo = [];
   

    const Location = useLocation();

    const { data } = Location.state;

    userInfo = filterSingleUserDetails(data.Product_owner);
    

    const [showCommentInput, setShowCommentInput] = useState(false);
    const [inCart, setinCart] = useState(false);
    const [showCommentBtn, setshowCommentBtn] = useState(false);

    const [rate, setRate] = useState();
    const [Comment, setComment] = useState("");
    const [fetchComments, setfetchComments] = useState([]);

    const getComments = async () => {
        await axios.get(`/api/comments/${data.id}`).then((res) => {
            try {
                setfetchComments(res.data);
            } catch (error) {
                console.log(error);
            }
        });
    };

    const filterDuplicateItemsInCart = () => {
        cartData.filter((items) => {
            if (items.id === data.id) {
                setinCart(true);
            }
        });
    };

    // function to prevent the user from commenting on a single product twice
    const flipshowCommentsButton = () => {
        fetchComments.forEach((item) => {
            if (item.Product_id === data.id && item.userId === user.id) {
                return setshowCommentBtn(true);
            }
        });
    };

    useEffect(() => {
        flipshowCommentsButton();
        
        return () => {};
    }, [fetchComments]);

    useEffect(() => {
        filterDuplicateItemsInCart();

        getComments();
        return () => {};
    }, []);

    const MainImg = useRef();
    const toggleImages = (e) => {
        let newSrc = e.target.getAttribute("src");
        return (MainImg.current.src = newSrc);
    };

    const ratingChanged = (newRating) => {
        setRate(newRating);
    };

    const handleShowCommentInput = () => {
        setShowCommentInput(!showCommentInput);
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        const fd = new FormData();
        fd.append("comment", Comment);
        fd.append("Product_id", data.id);
        fd.append("rating", rate);

        try {
            axios.post("/api/comments/store", fd).then((res) => {
                getComments();
                setComment("");
                setShowCommentInput(!showCommentInput);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleStoreinCart = (data) => {
        setinCart(true);
        addProductsToCart(data);
    };

    return (
        <>
            <div className="modal fade" id="modal-default" ref={modalDelete}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Delete Staff</h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <center>
                                <h5>
                                    do you relay want to Delete this Product ?
                                </h5>
                            </center>
                        </div>

                        <div className="modal-footer justify-content-between">
                            <button
                                type="button"
                                className="btn btn-success"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={async () => {
                                    try {
                                        await axios
                                            .delete(`/api/product/${data.id}`)
                                            .then((response) => {
                                                $(modalDelete.current).modal(
                                                    "hide"
                                                );
                                                data = [];
                                                props.history.push("/products");
                                            });
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                    {/* <!-- /.modal-content --> */}
                </div>
                {/* <!-- /.modal-dialog --> */}
            </div>

            <div className="singleProductWrapper container">
                <div className="row ">
                    <div className="col-md-6 ImagesSection">
                        <div className="Img-container">
                            <img
                                ref={MainImg}
                                src="./img/avatar.png"
                                alt=""
                                width="400px"
                                height="400px"
                                className="img-fluid"
                            />
                        </div>
                        <div className="img-small-block">
                            <img
                                src="./img/img_avatar6.png"
                                alt=""
                                width="100px"
                                height="100px"
                                className="img-fluid my-1 SmallImg"
                                onClick={toggleImages}
                            />
                            <img
                                src="./img/img_avatar1.png"
                                alt=""
                                width="100px"
                                height="100px"
                                className="img-fluid SmallImg"
                                onClick={toggleImages}
                            />
                            <img
                                src="./img/img_avatar2.png"
                                alt=""
                                width="100px"
                                height="100px"
                                className="img-fluid SmallImg"
                                onClick={toggleImages}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h2 className="singleProHeader">
                            {data.Product_name} ::{" "}
                            {userInfo.map((item) => item.name)}
                        </h2>
                        <p>
                            <strong>Kes {data.Price}</strong>
                        </p>
                        {inCart ? (
                            <div>
                                <strong>{"Product In Cart "}</strong>
                            </div>
                        ) : (
                            <div className="d-flex">
                                <Link
                                    to={{
                                        pathname: "/cart",
                                        state: { data, userInfo },
                                    }}
                                >
                                    <button
                                        className="btn btn-success px-3"
                                        onClick={() => handleStoreinCart(data)}
                                    >
                                        Add To Cart
                                    </button>
                                </Link>
                                <Link
                                    to="/products"
                                    className="btn btn-warning ml-2"
                                    onClick={() => handleStoreinCart(data)}
                                >
                                    Add To Cart & Continue Shopping
                                </Link>
                            </div>
                        )}
                        <div className="">
                            <h3 className="my-2">
                                <strong>Product Details</strong>
                            </h3>
                            <p>{data.ProductDesc}</p>
                            <p>
                                <strong>Location: {data.Location}</strong>
                            </p>
                            <p>
                                <strong>Quantity: {data.Quantity}</strong>
                            </p>
                        </div>
                        {/* review section */}
                        <div className="my-2">
                            <strong>Posted On</strong> :
                            {moment(data.created_at).fromNow()}
                        </div>
                        <div
                            className={
                                user.id === data.Product_owner
                                    ? "d-flex"
                                    : "d-none"
                            }
                        >
                            <Link
                                className="btn btn-success my-2"
                                to={{
                                    pathname: "/createProduct",
                                    state: { data, updateRequest: true },
                                }}
                            >
                                <i className="fa fa-edit"></i>
                            </Link>
                            <button
                                className="btn btn-danger my-2 ml-1"
                                onClick={() =>
                                    $(modalDelete.current).modal("show")
                                }
                            >
                                <i className="fa fa-trash"></i>
                            </button>
                        </div>
                        <div className="d-flex">
                            {showCommentBtn ? (
                                ""
                            ) : (
                                <button
                                    className="btn btn-outline-success mr-1 px-2"
                                    onClick={() => handleShowCommentInput()}
                                >
                                    Comment
                                </button>
                            )}
                            <Link
                                to="/contactUs"
                                className="btn btn-warning  px-2 "
                            >
                                ! Report Abuse
                            </Link>
                        </div>
                        {/* comment input */}

                        {showCommentInput ? (
                            <form
                                style={{ width: "350px" }}
                                className="my-3 comment-form"
                                onSubmit={handleSubmit}
                            >
                                <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    size={24}
                                    activeColor="#ffd700"
                                />
                                <p>
                                    <strong>Your Have Rated</strong>:: {rate}
                                </p>

                                <div className="input-group mb-3">
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        placeholder="write comment here"
                                        value={Comment}
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="w-100 ">
                                    <button
                                        className="btn btn-success"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        ) : (
                            ""
                        )}
                        {/* end of comment input section */}
                    </div>
                </div>

                <div className="commentsSection my-3">
                    <h2 className="text-center ">
                        <strong>This Product Comments</strong>
                    </h2>
                    <div className="productComments ">
                        {fetchComments.map((items, index) => {
                            return (
                                <>
                                    <div className="" key={items.id}>
                                        <div className="CommentContainer mx-2">
                                            <p>{items.comment}</p>
                                            <div className="rate my-2">
                                                <ReactStars
                                                    count={5}
                                                    size={26}
                                                    edit={false}
                                                    value={items.rating}
                                                    activeColor="#ffd700"
                                                />
                                            </div>
                                            <div className="sender text-dark ">
                                                <strong>
                                                    by:{" "}
                                                    {filterSingleUserDetails(
                                                        items.User_id
                                                    ).map((item) => item.name)}
                                                </strong>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
