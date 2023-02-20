import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Title } from "./Title";

describe("Title", () => {
  it("Should render a title", () => {
    const wrapper = render(<Title>Hello Friend</Title>);
    expect(wrapper).toBeTruthy();

    const title = wrapper.container.querySelector("h1");
    expect(title).toBeTruthy();
    if (title) {
      expect(title.textContent).toBe("Hello Friend");
    }
  });

  it("Should render a title centered", () => {
    const wrapper = render(<Title center>Hello Friend</Title>);
    expect(wrapper).toBeTruthy();

    const title = wrapper.container.querySelector("h1");
    expect(title).toBeTruthy();
    if (title) {
      expect(title.textContent).toBe("Hello Friend");
      expect(title.classList.contains("text-center")).toBe(true);
    }
  });
});
