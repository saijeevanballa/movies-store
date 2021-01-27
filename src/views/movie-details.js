import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

export default function Movie({ match, history }) {
  const defaultMovie = {
    title: "",
    genre: {},
    numberInStock: 0,
    dailyRentalRate: 0,
  };
  let [movie, setMovie] = useState(defaultMovie);
  let [genre, setGenre] = useState([]);

  let validationSchema = yup.object({
    title: yup.string().required(),
    dailyRentalRate: yup.number().required().min(1).max(10),
    numberInStock: yup.number().required().min(1),
  });

  const state = useFormik({
    initialValues: movie,
    validationSchema,
    onSubmit: async (value) => {
      console.log(value);
      await saveMovie({
        ...value,
        name: value.title,
        genreId: (value.genre && value.genre._id) || value.genre,
      });
      history.push("/movies");
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    (async () => {
      let { data: genre } = await getGenres();
      setGenre(genre);
    })();
    if (match.params.id == "new") return;
    try {
      (async () => {
        let { data: movie } = await getMovie(match.params.id);
        console.log(movie, match.params.id);
        if (!movie && match.params.id !== "new") {
          history.replace("/notfound");
        }
        if (movie) {
          setMovie(movie);
        }
      })();
    } catch (error) {
      history.replace("/notfound");
    }
  }, []);

  return (
    <div className="d-flex flex-column m-3">
      <h1 className="align-self-center">movie details</h1>
      <form className="w-50 align-self-center">
        <div className="form-group">
          <label htmlFor="formGroupExampleInput">Title</label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="enter your title"
            onBlur={state.handleBlur}
            value={state.values.title}
            onChange={state.handleChange}
          />
          {state.touched.title && state.errors.title && (
            <p className="text-danger">{state.errors.title}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="formGroupExampleInput1">Genre</label>
          <select
            name="genre"
            id="formGroupExampleInput1"
            className="form-control"
            onBlur={state.handleBlur}
            value={state.values.genre._id}
            defaultValue={state.values.genre._id}
            onChange={state.handleChange}
          >
            {genre.map((o) => (
              <option key={o._id} value={o._id}>
                {o.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="formGroupExampleInput2">Rating</label>
          <input
            name="dailyRentalRate"
            type="number"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Enter your rating"
            onBlur={state.handleBlur}
            value={state.values.dailyRentalRate}
            onChange={state.handleChange}
          />
          {state.touched.dailyRentalRate && state.errors.dailyRentalRate && (
            <p className="text-danger">{state.errors.dailyRentalRate}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="formGroupExampleInput3">Stock</label>
          <input
            name="numberInStock"
            type="number"
            className="form-control"
            id="formGroupExampleInput3"
            placeholder="Enter your Stock"
            onBlur={state.handleBlur}
            value={state.values.numberInStock}
            onChange={state.handleChange}
          />
          {state.touched.numberInStock && state.errors.numberInStock && (
            <p className="text-danger">{state.errors.numberInStock}</p>
          )}
        </div>
        <div className="d-flex flex-column">
          <button
            disabled={!state.isValid}
            className="btn btn-primary m-2"
            onClick={state.handleSubmit}
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
}
