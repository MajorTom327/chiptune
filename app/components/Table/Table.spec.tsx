import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { faker } from "@faker-js/faker";

import type { ColumnDefinition } from "./Table";
import Table from "./Table";

import { path } from "ramda";

describe("Table", () => {
  it("renders", () => {
    const wrapper = render(<Table data={[]} columns={[]} />);

    expect(wrapper).toBeTruthy();
    // expect(getByText("Table")).toBeInTheDocument();
  });

  it("renders a table", () => {
    const columns: ColumnDefinition[] = [
      { key: "id", label: "User's ID" },
      { key: "name", label: "User's name" },
      { key: "email", label: "User's email" },
    ];

    const name = {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
    };

    const data = [
      {
        id: 1,
        name: `${name.firstname} ${name.lastname}`,
        email: faker.internet.email(name.firstname, name.lastname),
      },
    ];

    const wrapper = render(<Table data={data} columns={columns} />);

    expect(wrapper).toBeTruthy();

    const table = wrapper.container.querySelector("table");
    expect(table).toBeTruthy();
    if (!table) return;

    const thead = table.querySelector("thead");
    expect(thead).toBeTruthy();

    if (thead) {
      const tr = thead?.querySelectorAll("tr");
      expect(tr).toBeTruthy();

      if (tr) {
        expect(tr.length).toBe(1);

        const th = tr[0].querySelectorAll("th");
        expect(th).toBeTruthy();
        if (!th) return;
        expect(th.length).toBe(columns.length);

        th.forEach((cell, index) => {
          expect(cell).toBeTruthy();
          expect(cell.textContent).toBe(columns[index].label);
        });
      }
    }

    const tbody = table.querySelector("tbody");
    expect(tbody).toBeTruthy();

    const tr = tbody?.querySelectorAll("tr");
    expect(tr).toBeTruthy();
    if (!tr) return;

    tr.forEach((row, rowIndex) => {
      const td = row.querySelectorAll("td");
      expect(td).toBeTruthy();
      if (!td) return;

      td.forEach((cell, i) => {
        expect(cell).toBeTruthy();
        expect(cell.textContent).toBeTruthy();
        expect(cell.textContent).not.toBe("undefined");
        expect(cell.textContent).not.toBe("null");

        // @ts-ignore
        const value = path([rowIndex, columns[i].key], data);
        // @ts-ignore
        expect(cell.textContent).toBe(value.toString());
      });
    });
  });

  it("Render a table with a custom component", () => {
    const columns: ColumnDefinition[] = [
      {
        key: "id",
        label: "User's ID",
        component: ({ value }) => <button>{value}</button>,
      },
    ];

    const data = [{ id: "123" }];

    const wrapper = render(<Table data={data} columns={columns} />);
    expect(wrapper).toBeTruthy();

    const table = wrapper.container.querySelector("table");
    expect(table).toBeTruthy();

    const tbody = table?.querySelector("tbody");
    expect(tbody).toBeTruthy();

    const tr = tbody?.querySelector("tr");
    expect(tr).toBeTruthy();

    const td = tr?.querySelector("td");
    expect(td).toBeTruthy();

    const button = td?.querySelector("button");
    expect(button).toBeTruthy();
  });
});
