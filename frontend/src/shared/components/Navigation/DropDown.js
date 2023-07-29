import React, {useState, useRef} from "react";

import './DropDown.css';

const DropDown = () => {
    const optionsArray = [
        "India",
        "United States",
        "United Kingdom",
        "japan",
        "Canada",
        "Germany"
      ];
      const [openselect, setOpenSelect] = useState(false);
    
      const leagueInput = useRef();
    
      function selectvalue(e) {
        leagueInput.current.value = e.target.outerText;
        setOpenSelect(false);
      }
    
      function openOption() {
        setOpenSelect(true);
      }
      
      return (
        <div className="proba">
          <div className="selectOption">
            <input
              onClick={openOption}
              onBlur={() => {
                setOpenSelect(false);
              }}
              ref={leagueInput}
              id="league"
              type="text"
              placeholder="Select Your Country"
              readOnly
            />
    
            <div className={openselect ? "options active" : "options"}>
              {optionsArray.map((item, index) => (
                <li onClick={selectvalue} key={index}>
                  {item}
                </li>
              ))}
            </div>
          </div>
        </div>
      );
}

export default DropDown;