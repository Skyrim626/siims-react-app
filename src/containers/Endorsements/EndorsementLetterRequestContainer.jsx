import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import EndorsementLetterRequestPresenter from "./EndorsementLetterRequestPresenter";

const EndorsementLetterRequestContainer = () => {
  /**
   *
   *
   * Open Location and Navigate
   *
   */
  const location = useLocation();
  const navigate = useNavigate();

  // Get location state
  const { type } = location.state;

  // console.log(type);

  /**
   *
   *
   * Redux
   *
   *
   */
  const data = useSelector((state) => state.endorsementLetterDetail);

  // console.log(data);

  return (
    <EndorsementLetterRequestPresenter
      type={type}
      name={data.name}
      student_id={data.student_id}
      letter_status_name={data.letter_status_name}
      students={data.students}
      company_address={data.company_address}
      company_name={data.company_name}
      recipient_name={data.recipient_name}
      recipient_position={data.recipient_position}
      endorse_students_count={data.endorse_students_count}
      go_back={() => navigate(-1)}
    />
  );
};

export default EndorsementLetterRequestContainer;
