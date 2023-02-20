import React from "react";

type Props = {
  value: number;
};

export const formatMoney = (value: number) => {
  return value.toLocaleString("FR-fr", {
    style: "currency",
    currency: "EUR",
  });
};

export const MoneyFormat: React.FC<Props> = ({ value }) => {
  return <>{formatMoney(value)}</>;
};

MoneyFormat.defaultProps = {};

export default MoneyFormat;
