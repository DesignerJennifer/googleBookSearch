import React from "react";

export function BookButton(props) {
    return (
        <button {...props} style={{ float: "right", marginBottom: 10 }}
            className="btn btn-success">
            {props.children}
        </button>

    );
}

export default BookButton;