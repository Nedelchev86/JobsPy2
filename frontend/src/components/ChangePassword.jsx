import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/Contexts";
import {useForm} from "react-hook-form";

export default function ChangePasswordForm() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [error, setError] = useState(null);
    const {auth, isAuthenticated} = useAuth();
    const navigate = useNavigate();

    const {
        register,
        watch,
        handleSubmit,
        formState: {errors},
    } = useForm({mode: "onBlur"});

    const submitForm = async (e) => {
        e.preventDefault();

        if (newPassword1 !== newPassword2) {
            setError("New passwords do not match");
            return;
        }

        const response = await fetch("http://127.0.0.1:8000/api/user/change-password/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth}`,
            },
            body: JSON.stringify({
                old_password: oldPassword,
                new_password: newPassword1,
            }),
        });

        if (response.ok) {
            navigate("/dashboard"); // Redirect to dashboard or any other page
        } else {
            const data = await response.json();
            console.log(Object.values(data));
            setError(Object.values(data)[0] || "Error changing password");
        }
    };
    return (
        <div className="change-password section">
            <div className="container">
                <div className="alerts-inner">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="password-content">
                                <h3>Change your password</h3>
                                <p>Here you can change your Password.</p>

                                <form onSubmit={handleSubmit(submitForm)}>
                                    <div className="row">
                                        <div className="form-group">
                                            <label htmlFor="id_old_password">Old password:</label>
                                            {/* <input type="password" name="old_password" autoComplete="current-password" required id="id_old_password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                                             */}
                                            <input type="password" className="form-control" placeholder="Enter your password" {...register("oldPassword", {required: true, minLength: 4})} value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                                            {errors?.oldPassword?.type === "required" && <div className="alert alert-danger">This field is required</div>}
                                            {errors?.oldPassword?.type === "minLength" && <div className="alert alert-danger">Your password is too short. Min length is 4</div>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_new_password1">New password:</label>

                                            {/* <input type="password" name="new_password1" autoComplete="new-password" required id="id_new_password1" value={newPassword1} onChange={(e) => setNewPassword1(e.target.value)} /> */}
                                            <input type="password" className="form-control" placeholder="Enter your password" {...register("new_password1", {required: true, minLength: 4})} value={newPassword1} onChange={(e) => setNewPassword1(e.target.value)} />
                                            {errors?.new_password1?.type === "required" && <div className="alert alert-danger">This field is required</div>}
                                            {errors?.new_password1?.type === "minLength" && <div className="alert alert-danger">Your password is too short. Min length is 4</div>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_new_password2">New password confirmation:</label>
                                            {/* <input type="password" name="new_password2" autoComplete="new-password" required id="id_new_password2" value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)} /> */}
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Repeat your password"
                                                {...register("new_password2", {
                                                    required: true,
                                                    validate: (value) => {
                                                        return value === watch("new_password1") || "Password does not match";
                                                    },
                                                })}
                                                value={newPassword2}
                                                onChange={(e) => setNewPassword2(e.target.value)}
                                            />
                                            {errors?.new_password2?.type === "required" && <div className="alert alert-danger">This field is required</div>}
                                            {errors?.new_password2?.type === "minLength" && <div className="alert alert-danger">Your password is too short. Min length is 4</div>}
                                            {errors.new_password2?.type == "validate" && <div className="alert alert-danger">{errors.new_password2.message}</div>}
                                        </div>

                                        {error && <div className="alert alert-danger">{error}</div>}

                                        <div className="col-lg-12 button">
                                            <button className="btn" type="submit">
                                                Change
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
