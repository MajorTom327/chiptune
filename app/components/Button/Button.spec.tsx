import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import Button from "./Button";
import { HashRouter } from "react-router-dom";

describe("Button", () => {
  it("Should render a button", () => {
    const wrapper = render(<Button>Click me</Button>);

    expect(wrapper).toBeTruthy();

    const btn = wrapper.container.querySelector("button");

    expect(btn?.textContent).toBe("Click me");
  });

  it("Should render a Link", () => {
    const wrapper = render(<Button to="/">Click me</Button>, {
      wrapper: HashRouter,
    });

    expect(wrapper).toBeTruthy();

    // Get by h1
    const btn = wrapper.container.querySelector("a");

    expect(btn?.textContent).toBe("Click me");
  });

  it("Should render a button with onClick", async () => {
    const onClickHandler = vi.fn();
    const wrapper = render(<Button onClick={onClickHandler}>Click me</Button>);

    expect(wrapper).toBeTruthy();

    // Get by h1
    const btn = wrapper.container.querySelector("button");

    expect(btn?.textContent).toBe("Click me");
    btn?.click();

    expect(onClickHandler).toHaveBeenCalled();
  });
});
