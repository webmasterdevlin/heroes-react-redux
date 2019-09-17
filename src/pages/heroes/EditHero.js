import React, { Component } from "react";
import { putHero } from "../../store/hero/hero-actions";
import { getHero } from "../../store/hero/hero-service";
import { connect } from "react-redux";

class EditHero extends Component {
  state = {
    isSuccess: false,
    hero: {
      id: "",
      firstName: "",
      lastName: "",
      house: "",
      knownAs: ""
    }
  };

  async componentDidMount() {
    const { data } = await getHero(this.props.match.params.id);
    this.setState({ hero: data });
  }

  handleInputChange = ({ currentTarget: input }) => {
    const updatedHero = { ...this.state.hero };
    const { name, value } = input;
    updatedHero[name] = value;
    this.setState({
      hero: updatedHero
    });
    // OR
    // const { name, value } = input;
    // this.setState({
    //   hero: {
    //     ...this.state.hero,
    //     [name]: value
    //   }
    // });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { hero } = this.state;
    this.props.dispatch(putHero(hero));

    this.setState({ isSuccess: !this.state.isSuccess });
  };

  handleBackButton = () => {
    this.props.history.goBack();
  };

  render() {
    const { firstName, lastName, house, knownAs } = this.state.hero;
    const { isSuccess } = this.state;

    return (
      <>
        <h2>Edit Hero</h2>
        <div className="card my-3" style={{ width: "auto" }}>
          <form className="card-header" onSubmit={this.handleSubmit}>
            <section className="d-flex flex-row">
              <div className="mt-3 mr-3 input-width">
                <label htmlFor="firstName">First Name</label>
                <input
                  name="firstName"
                  value={firstName}
                  onChange={this.handleInputChange}
                  type="text"
                  id="firstName"
                  className="form-control"
                />
              </div>
              <div className="mt-3 ml-3 input-width">
                <label>Last Name</label>
                <input
                  name="lastName"
                  value={lastName}
                  onChange={this.handleInputChange}
                  type="text"
                  id="lastName"
                  className="form-control"
                />
              </div>
            </section>
            <label className="mt-3">House</label>
            <input
              name="house"
              value={house}
              onChange={this.handleInputChange}
              type="text"
              id="house"
              className="form-control"
            />
            <label className="mt-3">Known as</label>
            <input
              name="knownAs"
              value={knownAs}
              onChange={this.handleInputChange}
              type="text"
              id="knownAs"
              className="form-control"
            />
            <button
              type="submit"
              disabled={isSuccess}
              className="btn btn-info mt-3"
            >
              Update
            </button>
            <button
              onClick={this.handleBackButton}
              type="button"
              className="btn btn-default mt-3"
            >
              Back
            </button>
          </form>
        </div>
        {isSuccess && (
          <div className="alert alert-success col-md-3" role="alert">
            This hero has been updated!
          </div>
        )}
      </>
    );
  }
}

export default connect()(EditHero);
