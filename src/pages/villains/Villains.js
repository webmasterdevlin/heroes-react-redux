import React, { Component } from "react";
import NewItemForm from "../../common-components/NewItemForm";
import {
  deleteVillain,
  loadVillains,
  postVillain
} from "../../store/villain/villain-actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Villains extends Component {
  state = {
    villain: {
      id: "",
      firstName: "",
      lastName: "",
      house: "",
      knownAs: ""
    },
    isShowNewItemForm: false
  };

  async componentDidMount() {
    await this.props.onLoadData();
  }

  removeItem = async (id, name) => {
    const isConfirmed = window.confirm(`Delete ${name}?`);
    if (!isConfirmed) return;

    await this.props.onRemoveVillain(id);
  };

  onChange = ({ currentTarget: input }) => {
    const newVillain = { ...this.state.villain };
    const { name, value } = input;
    newVillain[name] = value;
    this.setState({ villain: newVillain });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props
      .onAddVillain(this.state.villain)
      .then(() => this.props.onLoadData());
    // .then(() => this.props.onLoadData());
    // is not necessary if you don't care about the id of the new created item
    // An id is required when deleting or getting an item

    const { isShowNewItemForm } = this.state;
    this.setState({ isShowNewItemForm: !isShowNewItemForm });
  };

  showNewItemForm = () => {
    const { isShowNewItemForm } = this.state;
    this.setState({ isShowNewItemForm: !isShowNewItemForm });
  };

  render() {
    const { error } = this.props;
    return (
      <>
        <NewItemForm
          isShowNewItemForm={this.state.isShowNewItemForm}
          handleOnChange={this.onChange}
          handleOnSubmit={this.onSubmit}
          handleShowNewItemForm={this.showNewItemForm}
        />
        {error && (
          <div
            className="col-3 col-md-3 offset-9 alert alert-info"
            role="alert"
          >
            Something wrong happened: {error}
          </div>
        )}
        {this.props.villains.map(item => (
          <div key={item.id} className="card mt-3" style={{ width: "auto" }}>
            <div className="card-header">
              <h3 className="card-title">
                {item.firstName} {item.lastName}
              </h3>
              <h5 className="card-subtitle mb-2 text-muted">{item.house}</h5>
              <p className="card-text">{item.knownAs}</p>
            </div>
            <section className="card-body">
              <div className="row">
                <button
                  onClick={() => this.removeItem(item.id, item.firstName)}
                  className="btn btn-outline-danger card-link col text-center"
                >
                  <span className="fas fa-eraser  mr-2" />
                  Delete
                </button>
                <Link
                  to={`/edit-villain/${item.id}`}
                  className="btn btn-outline-primary card-link col text-center"
                >
                  <span className="fas fa-edit  mr-2" />
                  Edit
                </Link>
              </div>
            </section>
          </div>
        ))}
      </>
    );
  }
}

const mapStateToProps = state => {
  return state.villainState;
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadData: () => dispatch(loadVillains()),
    onRemoveVillain: id => dispatch(deleteVillain(id)),
    onAddVillain: villain => dispatch(postVillain(villain))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Villains);
