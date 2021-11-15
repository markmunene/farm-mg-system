import React, {useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import { useContacts } from '../context/UsersDetails';

const Register = (props) =>
{
    const [name, setName] = useState('');
  const [Location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [IdNumber, setIdNumber] = useState(0);
  const [email, setEmail] =useState("");
    const [password, setpassword] = useState('');
  const [password_confirmation, setconpassword] = useState('')
  const [role, setRole] = useState();
  const [errors, setErrors] = useState([]);
  
    const { setNewUser } = useContacts();
    
    const handleSubmit = (e) =>
    {
        e.preventDefault();

        const regData = new FormData();

      regData.append('name', name);
      regData.append("Location", Location);
      regData.append("phoneNumber", phoneNumber);
        regData.append('IdNumber', IdNumber);
         regData.append("email", email);
        regData.append('password', password);
      regData.append('password_confirmation', password_confirmation);
       regData.append("role", role);

        axios.defaults.withCredentials = true;
        axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post('/register',regData).then(response => {
            props.history.push("/");
          
          setNewUser();
          
        }).catch((err) =>
      {
          setErrors(err.response.data.errors)
        
        })
});

  }
      const hasErrorFor = (field) =>
    {
        return !!errors[field];     
  }

  const   renderErrorFor = (field)=> {
    if (hasErrorFor(field)) {
      return (
        <span className='invalid-feedback'>
          <strong>{errors[field][0] }</strong>
        </span>
      )
    }
  }

 
  return (
      <div className="container">
          <div className="row justify-content-center">
              <div className="col-md-6">
                  <div className="card">
                      <div className="card-header">
                          <h2 className="text-center text-info">Register</h2>
                      </div>

                      <div className="card-body">
                          <div className="text-center">
                              <img
                                  src="./img/avatar.png"
                                  alt=""
                                  className="img-fluid mx-auto"
                                  style={{
                                      borderRadius: "50%",
                                      width: "100px",
                                      height: "100px",
                                  }}
                              />
                          </div>

                          <form onSubmit={handleSubmit}>
                              <div className="form-group">
                                  <input
                                      id="name"
                                      type="text"
                                      placeholder="Name"
                                      className={`form-control ${
                                          hasErrorFor("name")
                                              ? "is-invalid"
                                              : ""
                                      }`}
                                      required
                                      value={name}
                                      onChange={(e) => {
                                          setName(e.target.value);
                                      }}
                                  />
                                  {renderErrorFor("name")}
                              </div>
                              <div className="form-group">
                                  <input
                                      id="email"
                                      type="email"
                                      name="email"
                                      placeholder="E-mail"
                                      className={`form-control ${
                                          hasErrorFor("email")
                                              ? "is-invalid"
                                              : ""
                                      }`}
                                      required
                                      value={email}
                                      onChange={(e) => {
                                          setEmail(e.target.value);
                                      }}
                                  />
                                  {renderErrorFor("email")}
                              </div>
                              <div className="form-group">
                                  <input
                                      id="Location"
                                      type="text"
                                      placeholder="Location"
                                      className={`form-control ${
                                          hasErrorFor("Location")
                                              ? "is-invalid"
                                              : ""
                                      }`}
                                      required
                                      value={Location}
                                      onChange={(e) => {
                                          setLocation(e.target.value);
                                      }}
                                  />
                                  {renderErrorFor("Location")}
                              </div>
                              <div className="form-group">
                                  <input
                                      id="phoneNumber"
                                      type="text"
                                      placeholder="Phone Number"
                                      className={`form-control ${
                                          hasErrorFor("Phone_Number")
                                              ? "is-invalid"
                                              : ""
                                      }`}
                                      required
                                      value={phoneNumber}
                                      onChange={(e) => {
                                          setPhoneNumber(e.target.value);
                                      }}
                                  />
                                  {renderErrorFor("Phone_Number")}
                              </div>
                              <div className="form-group">
                                  <input
                                      id="IdNumber"
                                      type="text"
                                      placeholder="Id Number"
                                      className={`form-control ${
                                          hasErrorFor("ID_Number")
                                              ? "is-invalid"
                                              : ""
                                      }`}
                                      required
                                      value={IdNumber}
                                      onChange={(e) => {
                                          setIdNumber(e.target.value);
                                      }}
                                  />
                                  {renderErrorFor("ID_Number")}
                              </div>
                              <div className="form-group">
                                  <input
                                      id="password"
                                      type="password"
                                      name="password"
                                      placeholder="Password"
                                      className={`form-control ${
                                          hasErrorFor("password")
                                              ? "is-invalid"
                                              : ""
                                      }`}
                                      required
                                      value={password}
                                      onChange={(e) => {
                                          setpassword(e.target.value);
                                      }}
                                  />
                                  {renderErrorFor("password")}
                              </div>
                              <div className="form-group">
                                  <input
                                      id="password_confirmation"
                                      type="password"
                                      name="password_confirmation"
                                      placeholder="Confirm Password"
                                      className={`form-control ${
                                          hasErrorFor("password_confirmation")
                                              ? "is-invalid"
                                              : ""
                                      }`}
                                      required
                                      value={password_confirmation}
                                      onChange={(e) => {
                                          setconpassword(e.target.value);
                                      }}
                                  />
                                  {renderErrorFor("password_confirmation")}
                              </div>

                              <div className="d-flex mb-3">
                                  <div className="custom-control custom-radio custom-control-inline">
                                      <input
                                          type="radio"
                                          className="custom-control-input"
                                          id="farmer"
                                          name="role"
                                          value="1"
                                         
                                          onChange={(e) => {
                                              setRole(e.target.value);
                                          }}
                                      />
                                      <label
                                          className="custom-control-label"
                                          htmlFor="farmer"
                                      >
                                          Farmer
                                      </label>
                                  </div>

                                  <div className="custom-control custom-radio custom-control-inline">
                                      <input
                                          type="radio"
                                          className="custom-control-input"
                                          id="expert"
                                          name="role"
                                          value="2"
                                          onChange={(e) => {
                                              setRole(e.target.value);
                                          }}
                                      />
                                      <label
                                          className="custom-control-label"
                                          htmlFor="expert"
                                      >
                                          Expert
                                      </label>
                                  </div>
                                  <div className="custom-control custom-radio custom-control-inline">
                                      <input
                                          type="radio"
                                          className="custom-control-input"
                                          id="buyer"
                                          name="role"
                                          value="3"
                                          onChange={(e) => {
                                              setRole(e.target.value);
                                          }}
                                      />
                                      <label
                                          className="custom-control-label"
                                          htmlFor="buyer"
                                      >
                                          Buyer
                                      </label>
                                  </div>
                                  <div className="custom-control custom-radio custom-control-inline">
                                      <input
                                          type="radio"
                                          className="custom-control-input"
                                          id="buyerandfarmer"
                                          name="role"
                                          value="4"
                                          onChange={(e) => {
                                              setRole(e.target.value);
                                          }}
                                      />
                                      <label
                                          className="custom-control-label"
                                          htmlFor="buyerandFarmer"
                                      >
                                          Buyer and Farmer
                                      </label>
                                  </div>
                              </div>
                              <div className="text-center">
                                  <button
                                      type="submit"
                                      className="btn btn-outline-success"
                                  >
                                      register
                                  </button>
                              </div>
                          </form>
                          <p className="text-dark">
                              Already have an account?
                              <Link to="/login" className="text-yellow">
                               
                                  LogIn
                              </Link>
                              |
                              <span className="pull-right">
                                  <Link to="/homechat" className="text-success">
                                      Back to Home
                                  </Link>
                              </span>
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
  }


export default Register;