import React from "react";
import styles from "./DeleteConfirmationModal.module.css";

export default function DeleteConfirmationModal({show, handleClose, handleConfirm, message}) {
    if (!show) {
        return null;
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h4>Confirm Deletion</h4>
                <p>{message}</p>
                <div className={styles.modalActions}>
                    <button onClick={handleClose} className={styles.btn}>
                        Cancel
                    </button>
                    <button onClick={handleConfirm} className={`${styles.btn} ${styles.btnDanger}`}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
