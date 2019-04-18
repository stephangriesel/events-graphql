import React from 'react';
import './css/Modal.css';

const modal = props => (
    <div className="modal">
        <header className="modal__header">{props.title}</header>
        <section className="modal__content">
            {props.children} {/*  allow to pass from outside */}
        </section>
        <section className="modal__actions">
            {props.canCancel && <button className="btn">Cancel</button>}
            {props.canConfirm && <button className="btn">Confirm</button>}
        </section>
    </div>
); // modal receive props and return modal content

export default modal;