import React, { Component } from "react";
import { getVillain } from "../../store/villain/villain-service";
import { putVillain } from "../../store/villain/villain-actions";
import { connect } from "react-redux";
class EditVillain extends Component {
  state = {
    isSuccess: false,
    villain: {
      id: "",
      firstName: "",
      lastName: "",
      house: "",
      knownAs: ""
    }
  };

  async componentDidMount() {
    const { data } = await getVillain(this.props.match.params.id);
    this.setState({ villain: data });
  }

  handleInputChange = ({ currentTarget: input }) => {
    const updatedVillain = { ...this.state.villain };
    const { name, value } = input;
    updatedVillain[name] = value;
    this.setState({
      villain: updatedVillain
    });

    // OR
    // const { name, value } = input;
    // this.setState({
    //   villain: {
    //     ...this.state.villain,
    //     [name]: value
    //   }
    // });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { villain } = this.state;
    this.props.dispatch(putVillain(villain));

    this.setState({ isSuccess: !this.state.isSuccess });
  };

  handleBackButton = () => {
    this.props.history.goBack();
  };

  render() {
    const { firstName, lastName, house, knownAs } = this.state.villain;
    const { isSuccess } = this.state;

    return (
      <>
        <h2>Edit Villain</h2>
        <div className="card my-3" style={{ width: "auto" }}>
          <form className="card-header" onSubmit={this.handleSubmit}>
            <section className="d-flex flex-row">
              <div className="mt-3 mr-3 input-width">
                <label>First Name</label>
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
            This villain has been updated!
          </div>
        )}
      </>
    );
  }
}
export default connect()(EditVillain);
