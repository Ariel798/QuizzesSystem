import { useState } from "react";
import Popup from "./popUp";
export function DetailsModal(props) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div style={{ display: "inline-block" }}>
      <button className="btn btn-success fa fa-info-circle" onClick={togglePopup}>
        Details
      </button>
      {isOpen && (
        <Popup
          content={
            <>
              <b>Question: {props.item.body}</b>
              <div>
                <p>ID: {props.item._id}</p>
                <p>Subject: {props.item.subject}</p>
              </div>
              <div>
                <p>Avalable Answers:</p>
                {props.item.answers?.map((ans, key) => {
                  return (
                    <li key={key}>
                      Number {key}: {ans}
                    </li>
                  );
                })}
              </div>
              <div>
                Correct Answer:
                {props.item?.answers[props.item?.correctAnswer]}
              </div>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
}
