import React from "react";
import GradeDropDown from "./GradeDropDown/GradeDropDown";

function ChartController({ handleGradeDropDown, grades, handleLangDropDown, languages, }) {

  return (
    <div>
      <GradeDropDown
        dropDownValues={grades}
        handleDropDownSelection={handleGradeDropDown}
      />
      <GradeDropDown
        dropDownValues={languages}
        handleDropDownSelection={handleLangDropDown}
      />
    </div>
  );
}
//test

export default ChartController;
