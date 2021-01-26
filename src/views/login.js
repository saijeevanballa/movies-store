import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";

export default function Login() {
	let validationSchema = yup.object({
		email: yup.string().email().required(),
		password: yup.string().required()
	});

	const state = useFormik({
		initialValues: { email: "", password: "" },
		validationSchema,
		onSubmit: (value) => {
			console.log(value);
		}
	});

	console.log(state);
	return (
		<div className="d-flex flex-column m-5">
			<div className="card p-3 w-50 align-self-center">
				<h4 className="card-title align-self-center">Login</h4>
				<form>
					<div className="form-group">
						<label htmlFor="formGroupExampleInput">email</label>
						<input
							name="email"
							type="text"
							className="form-control"
							id="formGroupExampleInput"
							placeholder="example@email.com"
							onBlur={state.handleBlur}
							value={state.values.email}
							onChange={state.handleChange}
						/>
						{state.touched.email && state.errors.email && (
							<p className="text-danger">{state.errors.email}</p>
						)}
					</div>
					<div className="form-group">
						<label htmlFor="formGroupExampleInput2">Password</label>
						<input
							name="password"
							type="password"
							className="form-control"
							id="formGroupExampleInput2"
							placeholder="enter password"
							onBlur={state.handleBlur}
							value={state.values.password}
							onChange={state.handleChange}
							autoComplete="on"
						/>
						{state.touched.password && state.errors.password && (
							<p className="text-danger">{state.errors.password}</p>
						)}
					</div>
					<div className="d-flex flex-column">
						<button
							disabled={!(state.dirty && state.isValid)}
							className="btn btn-primary m-2"
							onClick={state.handleSubmit}>
							login
						</button>
						<p className="d-flex justify-content-center">forgt password</p>
					</div>
				</form>
			</div>
		</div>
	);
}
