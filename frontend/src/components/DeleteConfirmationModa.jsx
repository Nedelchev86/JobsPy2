import React from "react";
import style from "./CreatedJobs.module.css";

export default function DeleteConfirmationModal({show, handleClose, handleConfirm}) {
    if (!show) {
        return null;
    }

    return (
        <div className={style.modal}>
            <div className={style.modalContent}>
                <h4>Confirm Deletion</h4>
                <p>Are you sure you want to delete this job?</p>
                <div className={style.modalActions}>
                    <button onClick={handleClose} className={style.btn}>
                        Cancel
                    </button>
                    <button onClick={handleConfirm} className={`${style.btn} ${style.btnDanger}`}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
