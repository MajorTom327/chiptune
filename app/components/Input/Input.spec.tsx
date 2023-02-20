import { render, cleanup } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Input from "./Input";

describe("Input", () => {
  afterEach(() => {
    cleanup();
  });

  it("Should render an input", () => {
    const wrapper = render(<Input name="field" />);
    expect(wrapper).toBeTruthy();

    const input = wrapper.container.querySelector("input");
    expect(input).toBeTruthy();
  });

  it("Should render an input with type number", () => {
    const wrapper = render(<Input name="field" type="number" />);
    expect(wrapper).toBeTruthy();

    const input = wrapper.container.querySelector("input");
    expect(input).toBeTruthy();
    expect(input?.type).toBe("number");
  });

  it("Should render an input with placeholder", () => {
    const wrapper = render(
      <Input name="field" placeholder="Some placeholder" />
    );
    expect(wrapper).toBeTruthy();

    const input = wrapper.container.querySelector("input");
    expect(input).toBeTruthy();
    if (input) {
      expect(input.placeholder).toBe("Some placeholder");
    }
  });

  it("Should render an input with label as default placeholder", () => {
    const wrapper = render(<Input name="field" label="Some placeholder" />);

    expect(wrapper).toBeTruthy();

    const input = wrapper.container.querySelector("input");

    expect(input).toBeTruthy();
    if (input) {
      expect(input.placeholder).toBe("Some placeholder");
    }
  });

  it("Should render an input with label", () => {
    const wrapper = render(
      <Input name="field" label="What a field" placeholder="Some input" />
    );

    expect(wrapper).toBeTruthy();

    const label = wrapper.container.querySelector("label");

    expect(label).toBeTruthy();
    if (label) {
      expect(label.textContent).toBe("What a field");
    }

    const input = wrapper.container.querySelector("input");
    expect(input).toBeTruthy();
    if (input) {
      expect(input.placeholder).toBe("Some input");
    }
  });

  it("Should render a required input", () => {
    const wrapper = render(
      <Input name="field" label="What a field" required />
    );

    expect(wrapper).toBeTruthy();

    const label = wrapper.container.querySelector("label");
    const input = wrapper.container.querySelector("input");

    expect(label).toBeTruthy();
    expect(input).toBeTruthy();
    if (label && input) {
      expect(label.htmlFor).toBe(input.id);
      expect(label.textContent).toBe("What a field");
      expect(input).toBeRequired();
    }

    const asterisk = wrapper.container.querySelector("svg");
    expect(asterisk).toBeTruthy();

    if (asterisk) {
      expect(asterisk.classList.contains("text-error")).toBe(true);
    }
  });

  it("Should render a disabled input", () => {
    const wrapper = render(
      <Input name="field" label="What a field" disabled />
    );

    expect(wrapper).toBeTruthy();

    const input = wrapper.container.querySelector("input");
    expect(input).toBeTruthy();
    if (input) {
      expect(input).toBeDisabled();
    }
  });

  it("Should render input with default value", () => {
    const wrapper = render(
      <Input name="field" label="What a field" defaultValue="Some value" />
    );

    expect(wrapper).toBeTruthy();

    const input = wrapper.container.querySelector("input");
    expect(input).toBeTruthy();
    if (input) {
      expect(input).toHaveValue("Some value");
    }
  });
});
