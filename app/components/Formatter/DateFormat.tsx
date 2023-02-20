import { DateTime } from "luxon";
import React from "react";

type Props = {
  value: string | Date;
};

export const DateFormat: React.FC<Props> = ({ value }) => {
  return (
    <>{DateTime.fromISO(value.toString()).toLocaleString(DateTime.DATE_MED)}</>
  );
};

DateFormat.defaultProps = {};

export default DateFormat;
