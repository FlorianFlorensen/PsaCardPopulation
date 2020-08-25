import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

/**
 * @param {Array dropDownValues, callback(event)} param0 
 * @param {name} The name of the parameter as reprented in the queryParameter object
 */
function GradeDropDown({ dropDownValues, handleDropDownSelection }) {
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {dropDownValues.map((value) => {
            return (
              <Dropdown.Item
                as="button"
                key={value}
                value={value}
                onClick={(e) => handleDropDownSelection(e)}
              >
                {integer}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default GradeDropDown;
