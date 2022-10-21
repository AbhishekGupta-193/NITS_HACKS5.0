import { useState, useEffect } from "react";
import "./User.css";

function App() {
  const initialValues = {
    weight: "",
    location: "",
    image: ""
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [nature, setNature] = useState("Select");
  const [duration, setDuration] = useState("Select");

  const handleChangeNature = (event) => {
    setNature(event.target.value)
  }

  const handleChangeDuration = (event) => {
    setDuration(event.target.value)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  },
    [formErrors]);
  const validate = (values) => {
    const errors = {};
    if (nature === "Select") {
      errors.nature = "Nature is required!";
    }
    if (!values.weight) {
      errors.weight = "Weight is required!";
    } else if (values.weight < 0) {
      errors.weight = "Weight cannot be negative";
    }
    if (duration === "Select") {
      errors.duration = "Please Select how old your data looks like !";
    }
    if (!values.location) {
      errors.location = "Please Enter the location where you found Waste !";
    }
    if (!values.image) {
      errors.image = "Please Upload an image of Waste !";
    }
    return errors;
  };

  return (
    <div className="container">

      <form onSubmit={handleSubmit}>
        <div className="divider"> <h1> Waste Description </h1></div>{" "}
        <hr />
        <div className="ui form">

          <div className="form-row">
            <div className="form-group col-md-6">
              <label > Nature of Waste</label>{" "}
              <select value={nature} onChange={handleChangeNature} className="form-control">
                <option >Select</option>
                <option value="Organic">Organic</option>
                <option value="Plastics">Plastics</option>
                <option value="Stationary">Stationary</option>
                <option value="Metal">Metal</option>
              </select>
            </div>{" "}
            <p> {formErrors.nature} </p>{" "}
            <div className="form-group col-md-6">
              <label> Estimated Weight </label>{" "}
              <input
                type="number"
                name="weight"
                placeholder="In Kg"
                value={formValues.weight}
                onChange={handleChange}
                className="form-control"
              />{" "}
            </div>{" "}
            <p> {formErrors.weight} </p>{" "}
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label> How old is it ? </label>{" "}
              <select value={duration} onChange={handleChangeDuration} className="form-control">
                <option >Select</option>
                <option value="week">Less then a week</option>
                <option value="month">Less then a month</option>
                <option value="more">Very old</option>
              </select>
            </div>{" "}
            <p> {formErrors.duration} </p>{" "}
            <div className="form-group col-md-6">
              <label> Location </label>{" "}
              <input
                className="form-control"
                type="text"
                name="location"
                placeholder="Found Waste location"
                value={formValues.location}
                onChange={handleChange}
              />{" "}
            </div>{" "}
            <p> {formErrors.location} </p>{" "}
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label> Image of Waste </label>{" "}
              <input
                className="form-control"
                type="file"
                multiple accept="image/*"
                name="image"
                value={formValues.image}
                onChange={handleChange}
              />{" "}
            </div>{" "}
            <p> {formErrors.image} </p>{" "}
            <div className="form-group col-md-6">
              <label> Description About Waste </label>{" "}
              <br />
              <textarea
                rows={1}
                cols={40}
                className="form-control"
                name="description"
                placeholder="Want to describe some more about Waste, Write here"
                value={formValues.desciption}
                onChange={handleChange}
              />{" "}
            </div>{" "}
          </div>
          <div className="text-center">
            <button className="btn btn-primary"> Submit </button>{" "}
          </div>
        </div>{" "}
      </form>{" "}
    </div>
  );
}

export default App;
