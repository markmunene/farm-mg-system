import axios from "axios";
import moment from "moment";

import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router";
import { useParams, Link, } from "react-router-dom";


export default function SinglePost(props) {
    const [single, setsinglePost] = useState([]);

    const location = useLocation();
    const { post } = location.state;

    useEffect(() => {
        setsinglePost(post);
    }, []);
  

    const deleteBlog = async () =>
    {
        try {
           await axios.delete(`/api/blog/${post.id}`).then((response) => {
               props.history.push('/blogHome');
            });
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="singlewrapper container">
                <div className="row">
                    <div className="col-md-9">
                        <div className="">
                            <div className="imagewrapper">
                                <img
                                    src={
                                        "../uploadedImages/" + single.Image_name
                                    }
                                    alt=""
                                    className=" img-fluid
                                                    singleImage"
                                />
                            </div>
                            <div className="singleTitle ">
                                <div className="float-center ">
                                    {single.Title}
                                </div>
                                <div className="float-right">
                                    <p
                                        className="icofont-ui-delete ml-4 text-danger updatebtn"
                                        onClick={deleteBlog}
                                    ></p>
                                    <Link
                                    
                                        to={{
                                            pathname: "/create",
                                            state: {
                                                updateRequest: true,
                                                data: post,
                                            },
                                        }}
                                    >
                                        <i className="icofont-ui-edit ml-4 text-success updatebtn"></i>
                                    </Link>

                                    <Link
                                        className="linkToCreateBlog"
                                        to= '/create'
                                    >
                                        Post
                                        <i className=" ml-4 text-info updatebtn"></i>
                                    </Link>
                                </div>
                            </div>
                            <div className="authorSection">
                                <p>Author::{single.User_name}</p>
                                <span>
                                    {moment(single.created_at).fromNow()}
                                </span>
                            </div>
                            <div className="description">
                                {single.description}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="aboutAuthor">
                            <div className="title">
                                <p>About::{single.User_name}</p>
                            </div>
                            <div className="authoorImageWrapper">
                                <img
                                    src={
                                        "../uploadedImages/" + single.Image_name
                                    }
                                    alt=""
                                    className=" img-fluid
                                                    AuthorImage"
                                />
                            </div>
                            <div className="authorDesc">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Beatae earum nesciunt dicta
                                maiores quia consequuntur architecto explicabo
                                perferendis esse magnam repellat quaerat ut
                                corporis accusamus, soluta nemo laudantium, quis
                                rem?
                            </div>
                            <Link
                                to={{
                                    pathname: "/homechat",
                                    state: { user: single.User_id },
                                }}
                                className="btn btn-success"
                            >
                                Send Message
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
