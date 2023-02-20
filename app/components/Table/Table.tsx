import classNames from "classnames";
import { path, split } from "ramda";
import React from "react";

export type ColumnDefinition = {
  key: string;
  label: string;
  transform?: (value: any) => string;
  component?: React.FC<{ value: any; row: any }>;
};

type Props = {
  columns: ColumnDefinition[];
  data: any[];
};

export const Table: React.FC<Props> = ({ columns, data }) => {


  return (
    <>
      <table className="w-full table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key + column.label}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="hover">
              {columns.map((column) => {
                const value = path<string>(split(".", column.key), row);
                const transformed = column.transform
                  ? column.transform(value)
                  : value;

                if (column.component) {
                  return (
                    <td key={column.key + column.label + row.id}>
                      <column.component value={value} row={row} />
                    </td>
                  );
                }
                return <td key={column.key}>{transformed}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

Table.defaultProps = {};

export default Table;
