import axios from "axios";
import react , { useState, useEffect } from "react";
import {
    Link,
    withRouter,
    Router,
    Route,
    useRouteMatch,
} from "react-router-dom";

import "./blog.css";
import SinglePost from "./SinglePost.jsx";


export default function BlogHome(props)
{
    const { url } = useRouteMatch();
    
    const [post, setPost] = useState([]);
    const [blogSearch, setBlogSearch] = useState([]);
    useEffect(() => {
        const getBlog = async () => {
            try {
                const res = await axios.get("/api/blog").then((response) => {
                    setPost(response.data);
                });
            } catch (error) {
                console.log(error);
            }
        };
        getBlog();
    }, []);
    const handleBlogSearch = (blogSearchTitle) =>
    {
        post.filter((items) => items.id !== blogSearchTitle);
    };
    

    return (
        <>
            <div className="blogwrap">
                <div className="header">
                    <div className="line"></div>
                    <h2 className="text-center">Blog</h2>
                </div>
                <div className="blogbody ">
                    <div className="row ">
                        <div className="col-md-9 ">
                            <div className="row ">
                                {post.filter(filteredPost =>
                                {
                                    if (blogSearch =="") {
                                        return filteredPost;
                                    }
                                    else if (filteredPost.Title.toLowerCase().includes(blogSearch.toLowerCase())) {
                                        return filteredPost
                                    }
                                }).map((items, index) => {
                                    return (
                                        <>
                                            {items == null ? (
                                                <center>
                                                    <h2>no post available</h2>
                                                </center>
                                            ) : (
                                                <Link
                                                    to={{
                                                        pathname: `/singlePost`,
                                                        state: {
                                                            post: items,
                                                        },
                                                        }}
                                                        style={{ textDecoration: 'none',color : 'black'}}
                                                >
                                                    <div
                                                        className="blogContainer  "
                                                        key={items.id}
                                                    >
                                                        <div className="col-lg-4  ">
                                                            <div className="mainContent">
                                                                <div className="imageContainer">
                                                                    <img
                                                                        src={
                                                                            "./uploadedImages/" +
                                                                            items.Image_name
                                                                        }
                                                                        alt=""
                                                                        className=" img-fluid
                                                                 blogimage"
                                                                    />
                                                                </div>
                                                                <div className="clear-fix titleWrap">
                                                                    <div className="float-left blogTitle text-info">
                                                                        {items.Title}
                                                                    </div>
                                                                    <div className="float-right ">
                                                                        Author::
                                                                        {
                                                                            items.User_name
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <br />
                                                                <div className="blogDesc">
                                                                    {
                                                                        items.description
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )}
                                        </>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="blog-search">
                                <form >
                                    <div className="input-group mb-3">
                                        <input
                                            className={`form-control `}
                                            type="text"
                                            name="search"
                                            placeholder="search post"
                                            value={blogSearch}
                                            onChange = {(e) =>
                                                setBlogSearch(e.target.value)
                                            }
                                            required
                                        />
                                        
                                    </div>
                                </form>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
