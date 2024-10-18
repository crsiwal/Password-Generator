import { useState } from "react";
import caretIcon from "../assets/icons/caret-down-svgrepo-com.svg";

const AccordionCard = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="accordion-card border-bottom py-3">
      <div onClick={() => setIsOpen(!isOpen)} className={`accordion-card__header d-flex justify-content-between align-top ${isOpen ? "show" : "collapsed"}`}>
        <h5 className="d-flex ps-2 lh-base">{question}</h5>
        <img className="img-fluid drop-icon mx-2 mt-1" src={caretIcon} style={{ width: "24px", height: "24px" }} alt="Random Password Generator" />
      </div>
      <div id="collapseThree" className={`collapse ${isOpen && "show"}`}>
        <div className="px-2">{answer}</div>
      </div>
    </div>
  );
};

export default AccordionCard;
