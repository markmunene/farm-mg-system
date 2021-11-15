import React from 'react'

import './contact.css'
import { useContacts } from './context/UsersDetails';

export default function Contact()
{
    const { user } = useContacts();
    return (
        <>
            <div className="contactWrapper">
                <div
                    className="missionHeader"
                    style={{
                        backgroundImage: ' url("./img/avatar")',
                    }}
                >
                    <div className="headText ">
                        <h2 className="">Contact us </h2>
                        <h5 className="">Home/Contact Us</h5>
                    </div>
                </div>
                {/*  */}
                <div className="contactUsBody">
                    <div className="contactBodyHeader">
                        <h1>Get In Touch</h1>
                        <div className="divider"></div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="contactForms w-100 ">
                                <form>
                                    {/* firtRow d-flex */}
                                    <div
                                        className={`${
                                            Object.keys(user).length === 0
                                                ? " firtRow d-flex"
                                                : " firtRow d-none"
                                        }`}
                                    >
                                        <div className="input-group m-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fa fa-user"></i>
                                                </span>
                                            </div>
                                            <input
                                                className="form-control "
                                                type="text"
                                                name="names"
                                                placeholder="names"
                                                // value={names}
                                                // onChange={(e) =>
                                                //     setnames(e.target.value)
                                                // }
                                                required
                                            />
                                        </div>
                                        <div className="input-group m-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fas fa-envelope"></i>
                                                </span>
                                            </div>
                                            <input
                                                className="form-control "
                                                type="Email"
                                                name="Email"
                                                placeholder="Email"
                                                // value={names}
                                                // onChange={(e) =>
                                                //     setnames(e.target.value)
                                                // }
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="input-group m-3 ">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fas fa-pencil-alt"></i>
                                                </span>
                                            </div>
                                            <input
                                                className="form-control "
                                                type="text"
                                                name="subject"
                                                placeholder="subject"
                                                // value={names}
                                                // onChange={(e) =>
                                                //     setnames(e.target.value)
                                                // }
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex ">
                                        <div className="input-group m-3 ">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fas fa-pen-square"></i>
                                                </span>
                                            </div>
                                            <textarea
                                                className="form-control messageinput"
                                                type=""
                                                name="message"
                                                placeholder="message"
                                                // value={names}
                                                // onChange={(e) =>
                                                //     setnames(e.target.value)
                                                // }
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex m-2 text-center">
                                        <div
                                            type="submit"
                                            className="contactSubmit p-1"
                                        >
                                            <i className="icofont-paper-plane m-2"></i>
                                            Send Message
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="contactDetails w-100">
                                <h2 className="pl-2 m-3">Contact Details.</h2>
                                <hr />
                                <div className="leftContent ">
                                    <div className="iconSection">
                                        <i className="fa fa-home fa-2x"></i>
                                    </div>
                                    <div className="descriptionSection">
                                        <div>Rosslyn, Lavington </div>
                                        <div>Address 232211</div>
                                    </div>
                                </div>
                                {/*  */}
                                <div className="leftContent ">
                                    <div className="iconSection">
                                        <i className="fa fa-mobile-alt fa-2x mr-3"></i>
                                    </div>
                                    <div className="descriptionSection">
                                        <div> +254 704372166 </div>
                                        <div> Mon to Fri 8.00am-6.00pm</div>
                                    </div>
                                </div>
                                {/*  */}
                                <div className="leftContent ">
                                    <div className="iconSection">
                                        <i className="fas fa-envelope fa-2x"></i>
                                    </div>
                                    <div className="descriptionSection">
                                        <div> support@phoenixacademy.edu </div>
                                        <div>Always there to help</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
