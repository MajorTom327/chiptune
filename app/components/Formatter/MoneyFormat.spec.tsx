import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import MoneyFormat, { formatMoney } from "./MoneyFormat";

describe("MoneyFormat", () => {
  it("Should format money", () => {
    expect(formatMoney(1000)).to.equal("1\u202f000,00\xa0€");
  });

  it("Should render a formatted money", () => {
    const { container } = render(<MoneyFormat value={1000} />);
    expect(container).toBeTruthy();
    expect(container.textContent).to.equal("1\u202f000,00\xa0€");
  });
});
