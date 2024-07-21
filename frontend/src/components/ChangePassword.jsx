import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/Contexts";

export default function ChangePasswordForm() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [error, setError] = useState(null);
    const {auth, isAuthenticated} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
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

                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="form-group">
                                            <label htmlFor="id_old_password">Old password:</label>
                                            <input type="password" name="old_password" autoComplete="current-password" required id="id_old_password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_new_password1">New password:</label>
                                            <input type="password" name="new_password1" autoComplete="new-password" required id="id_new_password1" value={newPassword1} onChange={(e) => setNewPassword1(e.target.value)} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_new_password2">New password confirmation:</label>
                                            <input type="password" name="new_password2" autoComplete="new-password" required id="id_new_password2" value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)} />
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
