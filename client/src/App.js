import React, { Component } from "react";
import "./App.css";
import API from "./utils/api";

/* Once the 'Authservice' and 'withAuth' componenets are created, import them into App.js */
import AuthHelperMethods from "./components/AuthHelperMethods";

//Our higher order component
import withAuth from "./components/withAuth";

class App extends Component {
  /* Create a new instance of the 'AuthHelperMethods' compoenent*/
  Auth = new AuthHelperMethods();

  state = {
    username: "",
    password: "",
    parties: []
  };

  componentDidMount() {
    this.getParties();
  }
  /* Here will want to add a method to log the user out upon clicking 'Logout' */
  _handleLogout = () => {
    this.Auth.logout();
    this.props.history.replace("/login");
  };

  getParties = () => {
    API.getParties().then(res => {
      console.log(res.data[0]);

      this.setState({ parties: res.data });
      console.log(this.state.parties);
    });
  };
  //Render the protected component
  render() {
    let name = this.props.confirm.username;
    // let parties = this.state.parties.alcohol;
    {
      // console.log(parties);
    }
    return (
      <div className="App">
        {/* <div className="main-page"> */}
        <div className="top-section">
          <h1>Welcome, {name}</h1>
        </div>
        {this.state.parties.map(item => (
          <div className="row row-party mt-4">
            <div className="party-container col-lg-6 mt-2">
              <div className="party-item-div">
                <div className="party-div-name">
                  <p>
                    {item.title} - <a>@{item.username}</a>
                  </p>
                  <h4>{item.status}</h4>
                </div>
                <div
                  id="carouselExampleControls"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        className="slideImg img-fluid"
                        src={
                          "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                        }
                        alt={"First slide"}
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        className="slideImg img-fluid"
                        src={
                          "https://images.pexels.com/photos/261515/pexels-photo-261515.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                        }
                        alt={"Second slide"}
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        className="slideImg img-fluid"
                        src={
                          "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                        }
                        alt={"Third slide"}
                      />
                    </div>
                  </div>
                  <a
                    className="carousel-control-prev"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Next</span>
                  </a>
                </div>
                <div id="accordion">
                  <div className="card cardClass">
                    <div className="card-header" id="headingOne">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          onclick="changec()"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Description
                        </button>
                      </h5>
                    </div>

                    <div
                      id="collapseOne"
                      className="collapse"
                      aria-labelledby="headingOne"
                      data-parent="#accordion"
                    >
                      <div className="card-body">{item.description}</div>
                    </div>
                  </div>
                  <div className="card cardClass">
                    <div className="card-header" id="headingTwo">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link collapsed"
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          Alcohol
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseTwo"
                      className="collapse"
                      aria-labelledby="headingTwo"
                      data-parent="#accordion"
                    >
                      <div className="card-body">{item.alcohol}</div>
                    </div>
                  </div>
                  <div className="card cardClass">
                    <div className="card-header" id="headingThree">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link collapsed"
                          data-toggle="collapse"
                          data-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          Info
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseThree"
                      className="collapse"
                      aria-labelledby="headingThree"
                      data-parent="#accordion"
                    >
                      <div className="card-body">{item.additional_info}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* <ul>
            {this.state.parties.map(item => (
              <li>
                <div className="jumbotron" style={{ color: "blue" }}>
                  {item.username}
                </div>
              </li>
            ))}
            {/* <li>{parties}</li> */}
        {/* </ul> */}

        <div className="bottom-section mt-4">
          <button onClick={this._handleLogout}>LOGOUT</button>
        </div>
        {/* </div> */}

        {/* </div> */}
      </div>
    );
  }
}

//In order for this component to be protected, we must wrap it with what we call a 'Higher Order Component' or HOC.

export default withAuth(App);
// =======
// export default App;
