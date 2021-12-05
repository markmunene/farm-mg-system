import React,{useState, useEffect, useRef} from "react";

import "./expense.css";
export default function MainExpense()
{
    const modalRef = useRef({});
    const modalEdit = useRef({});
    const modalDelete = useRef({});
 const [image, setImage] = useState("");

 const [feedback, setFeedback] = useState(false);
 const [Description, setDescription] = useState("");

 const [HeadedBy, setHeadedBy] = useState("");
 const [EduCationLevel, setEduCationLevel] = useState("");
 const [Header, setHeader] = useState("");

 const [errors, setErrors] = useState([]);
 const [editerrors, setEditerrors] = useState([]);
 const [fetchedStaff, setfetchedStaff] = useState([]);
 const [succ, setSucc] = useState("");
 const [editMOde, setEditMode] = useState(false);

 const [imageDeleteId, setDeleteId] = useState(0);
 const [searchState, setSearch] = useState("");

       const getStaff = async () => {
           try {
               await axios.get("api/staffD").then((res) => {
                   setfetchedStaff(res.data);
               });
           } catch (err) {}
       };
       useEffect(() => {
           getStaff();
           return () => {};
       }, []);
       // delete a post
       const removeTour = (id) => {
           const newImg = fetchedStaff.filter((item) => item.id !== id);

           setfetchedStaff(newImg);
       };
       // handling the image
       const handlefile = (file) => {
           setImage(file[0]);
       };
       const renderErrorFor = (field) => {
           if (hasErrorFor(field)) {
               return (
                   <span className="invalid-feedback">
                       <strong>{errors[field][0]}</strong>
                   </span>
               );
           }
       };

       const hasErrorFor = (field) => {
           return !!errors[field];
       };
    
       const editDataHandling = (items) => {
           $(modalEdit.current)?.modal("show");
           // .style.display = "block";
           setEditMode(true);

           setDescription(items.Description);
           setHeadedBy(items.HeadedBy);

           setHeader(items.Header);
           setEduCationLevel(items.EduCationLevel);
           return setEditImg(items);
       };

       const handleSubmit = (e) => {
           e.preventDefault();
           const fd = new FormData();
           fd.append("image", image);

           fd.append("Header", Header);
           fd.append("HeadedBy", HeadedBy);
           fd.append("EduCationLevel", EduCationLevel);

           fd.append("Description", Description);

           axios
               .post("/api/staffD/store", fd, {
                   headers: {
                       "content-type": "multipart/form-data",
                   },
               })
               .then((result) => {
                   setImage("");
                   setHeadedBy("");
                   setDescription("");
                   setHeadedBy("");

                   setHeader("");
                   setEduCationLevel("");
                   setFeedback(true);
                   setTimeout(() => {
                       setFeedback(false);
                   }, 2500);
                   setSucc("Staff added Succcessively");
                   $(modalRef.current).modal("hide");

                   getStaff();
               })
               .catch((err) => {
                   // setErrors(err.response.data.errors);
                   setErrors(err.response.data.errors);

                   // console.log(err.response.errors);
               });
       };

       const handleEdit = (e, staffId) => {
           e.preventDefault();
           const fd = new FormData();
           fd.append("image", image);

           fd.append("Header", Header);
           fd.append("HeadedBy", HeadedBy);
           fd.append("EduCationLevel", EduCationLevel);

           fd.append("Description", Description);
           fd.append("staffId", staffId);

           axios
               .post(`/api/staffD/update/${staffId}`, fd, {
                   headers: {
                       "content-type": "multipart/form-data",
                   },
               })
               .then((result) => {
                   setImage("");
                   setHeadedBy("");
                   setDescription("");
                   setHeadedBy("");
                   setHeader("");
                   setEduCationLevel("");
                   setFeedback(true);
                   setTimeout(() => {
                       setFeedback(false);
                   }, 2500);
                   setSucc("Staff Updated Succcessively");
                   $(modalEdit.current).modal("hide");

                   getStaff();
               })
               .catch((err) => {
                   // setErrors(err.response.data.errors);
                   setErrors(err.response.data.errors);

                   // console.log(err.response.errors);
               });
       };
       const handleDelete = (id) => {
           console.log(id);
           $(modalDelete.current)?.modal("show");
           return setDeleteId(id);
       };
       const handleAddModal = () => {
           $(modalRef.current).modal("show");
       };

    return (
        <>
            <div className="modal fade" id="modal-default" ref={modalRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title"> Add Staff</h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                        >
                            <div className="modal-body">
                                {/*  */}
                                <div className="form-group">
                                    <label>Header:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            hasErrorFor("Header")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id="Header"
                                        placeholder="Header"
                                        name="Header"
                                        value={Header}
                                        onChange={(e) => {
                                            setHeader(e.target.value);
                                        }}
                                        required
                                    />
                                    {renderErrorFor("Header")}
                                </div>
                                {/*  */}

                                <div className="form-group">
                                    <label>Description:</label>
                                    <textarea
                                        className={`form-control ${
                                            hasErrorFor("Description")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id="Description"
                                        placeholder="Description"
                                        name="Description"
                                        value={Description}
                                        onChange={(e) => {
                                            setDescription(e.target.value);
                                        }}
                                        required
                                    />
                                    {renderErrorFor("Description")}
                                </div>
                                {/*  */}
                                <div className="form-group">
                                    <label>HeadedBy:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            hasErrorFor("HeadedBy")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id="HeadedBy"
                                        placeholder="HeadedBy"
                                        name="HeadedBy"
                                        value={HeadedBy}
                                        onChange={(e) => {
                                            setHeadedBy(e.target.value);
                                        }}
                                        required
                                    />
                                    {renderErrorFor("HeadedBy")}
                                </div>
                                {/*  */}
                                <div className="form-group">
                                    <label>EduCationLevel:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            hasErrorFor("EduCationLevel")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id="EduCationLevel"
                                        placeholder="EduCationLevel"
                                        name="EduCationLevel"
                                        value={EduCationLevel}
                                        onChange={(e) => {
                                            setEduCationLevel(e.target.value);
                                        }}
                                        required
                                    />
                                    {renderErrorFor("EduCationLevel")}
                                </div>

                                {/*  */}
                                <div className="custom-file pb-3">
                                    <input
                                        type="file"
                                        className={`form-control custom-file-input ${
                                            hasErrorFor("image")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id=""
                                        onChange={(e) =>
                                            handlefile(e.target.files)
                                        }
                                    />
                                    <label className="custom-file-label">
                                        choose an image
                                    </label>

                                    {renderErrorFor("image")}
                                </div>
                            </div>

                            <div className="modal-footer justify-content-between">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                                <input
                                    type="submit"
                                    className="btn btn-success"
                                    value=" Save"
                                />
                            </div>
                        </form>
                    </div>
                    {/* <!-- /.modal-content --> */}
                </div>
                {/* <!-- /.modal-dialog --> */}
            </div>

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
                                    do you relay want to Delete this Staff ?
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
                                            .delete(
                                                `/api/staffD/${imageDeleteId}`
                                            )
                                            .then((response) => {
                                                removeTour(imageDeleteId);
                                                $(modalDelete.current).modal(
                                                    "hide"
                                                );

                                                setFeedback(true);
                                                setTimeout(() => {
                                                    setFeedback(false);
                                                }, 2500);
                                                setSucc(
                                                    "Staff Deleted Succcessively"
                                                );
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

            <div
                className="modal fade"
                id="#editing-modal{{items.id}}"
                ref={modalEdit}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Staff</h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form
                            // onSubmit={(e) => handleEdit(e, eItems.id)}
                            encType="multipart/form-data"
                        >
                            <div className="modal-body">
                                {/*  */}
                                <div className="form-group">
                                    <label>Header:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            hasErrorFor("Header")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id="Header"
                                        placeholder="Header"
                                        name="Header"
                                        value={Header}
                                        onChange={(e) => {
                                            setHeader(e.target.value);
                                        }}
                                        required
                                    />
                                    {renderErrorFor("Header")}
                                </div>
                                {/*  */}

                                <div className="form-group">
                                    <label>Description:</label>
                                    <textarea
                                        className={`form-control ${
                                            hasErrorFor("Description")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id="Description"
                                        placeholder="Description"
                                        name="Description"
                                        value={Description}
                                        onChange={(e) => {
                                            setDescription(e.target.value);
                                        }}
                                        required
                                    />
                                    {renderErrorFor("Description")}
                                </div>
                                {/*  */}
                                <div className="form-group">
                                    <label>HeadedBy:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            hasErrorFor("HeadedBy")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id="HeadedBy"
                                        placeholder="HeadedBy"
                                        name="HeadedBy"
                                        value={HeadedBy}
                                        onChange={(e) => {
                                            setHeadedBy(e.target.value);
                                        }}
                                        required
                                    />
                                    {renderErrorFor("HeadedBy")}
                                </div>
                                {/*  */}
                                <div className="form-group">
                                    <label>EduCationLevel:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            hasErrorFor("EduCationLevel")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id="EduCationLevel"
                                        placeholder="EduCationLevel"
                                        name="EduCationLevel"
                                        value={EduCationLevel}
                                        onChange={(e) => {
                                            setEduCationLevel(e.target.value);
                                        }}
                                        required
                                    />
                                    {renderErrorFor("EduCationLevel")}
                                </div>
                                {/*  */}

                                <div className="mb-3">
                                    <img
                                        // src={
                                        //     "./uploadedImages/" +
                                        //     // eItems.ImageName
                                        // }
                                        alt=""
                                        className=" img-fluid
                                                                                                 "
                                        height={"100px"}
                                        width={"100px"}
                                    />
                                </div>
                                <div className="custom-file pb-3">
                                    <input
                                        type="file"
                                        className={`form-control custom-file-input ${
                                            hasErrorFor("image")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id=""
                                        onChange={(e) =>
                                            handlefile(e.target.files)
                                        }
                                    />
                                    <label className="custom-file-label">
                                        choose an image
                                    </label>
                                    {renderErrorFor("image")}
                                </div>
                            </div>
                            <div className="modal-footer justify-content-between">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                                <input
                                    type="submit"
                                    className="btn btn-success"
                                    value=" Save"
                                />
                            </div>
                        </form>
                    </div>
                    {/* <!-- /.modal-content --> */}
                </div>
                {/* <!-- /.modal-dialog --> */}
            </div>

            <div className="mainExpense row ">
                <div className="expenseWrapper col-md-10 row">
                    <div className="expenseCard col-md-3 m-2 shadow-sm">
                        <div className="header d-flex justify-content-between">
                            <p className="p-2 ">
                                <strong>Expense OverView</strong>
                            </p>
                            <select
                                name=""
                                id=""
                                className="form-control my-2"
                                style={{
                                    width: "130px",
                                }}
                            >
                                <option value="last-week">last-week</option>
                                <option value="last-month">last-Month</option>
                                <option value="last-year">last-year</option>
                            </select>
                        </div>
                        <div className="expenseTotals">
                            <h4>
                                <strong>$2134</strong> <br />
                                Last 30 Days
                            </h4>
                        </div>
                        <div className="LatestExpenses">
                            <div className="icon"></div>
                        </div>
                    </div>
                    <div className="expenseCard col-md-3 m-2 shadow-sm">
                        <div className="header d-flex justify-content-between">
                            <p className="p-2 ">
                                <strong>Balance OverView</strong>
                            </p>
                            <select
                                name=""
                                id=""
                                className="form-control my-2"
                                style={{
                                    width: "130px",
                                }}
                            >
                                <option value="last-week">last-week</option>
                                <option value="last-month">last-Month</option>
                                <option value="last-year">last-year</option>
                            </select>
                        </div>
                        <div className="expenseTotals">
                            <h5>
                                <strong>$2134</strong>
                                <br />
                                Last 30 Days
                            </h5>
                        </div>
                        <div className="progressBar my-2">
                            <div className="Values mr-2">
                                <p>
                                    $2190
                                    <br />
                                    Income
                                </p>
                                <div className="INcomeProgress">so</div>
                            </div>
                            <div className="Values mr-2">
                                <p>
                                    $2190
                                    <br />
                                    Expenses
                                </p>
                                <div className="INcomeProgress">so</div>
                            </div>
                        </div>
                    </div>
                    <div className="expenseCard col-md-4 m-2 shadow-sm"></div>
                    <div className="expenseCard col-md-3 m-2 shadow-sm"></div>
                </div>
                <div className="incomewrapper col-md-2 ">
                    <div className="inputFields">
                        <h2>ait what mani</h2>
                        <button className="btn btn-info" onClick={() =>
                        {
                            handleAddModal();
                        }}>Income</button>
                       
                    </div>
                </div>
            </div>
        </>
    );
}
