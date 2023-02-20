import type { FetcherWithComponents } from "@remix-run/react";
import React, { createElement } from "react";
import Input from "~/components/Input";
import BaseForm from "../components/BaseForm";
import type { FieldType } from "./BaseForm";
import { pathOr, map, prop, compose, flatten, uniq, path } from "ramda";
import { AuthenticityTokenInput } from "remix-utils";
import { isNotNilOrEmpty } from "ramda-adjunct";
import SelectInput from "~/components/SelectInput";

type Props = {
  fields: FieldType[];
  children?: React.ReactElement;
  fetcher: FetcherWithComponents<any>;
  resetOnSubmit?: boolean;
  data?: any;
  options: Record<string, any>;
  method?: "post" | "get";
  action?: string;
};

const getDefaultValue =
  (field: FieldType, data: any) => (fetcher: FetcherWithComponents<any>) => {
    if (isNotNilOrEmpty(data)) {
      return prop(field.name, data);
    }

    return path(["data", "data", field.name], fetcher);
  };

export const FormRender: React.FC<Props> = ({
  fields,
  children,
  fetcher,
  resetOnSubmit,
  data,
  options,
  method,
  action,
}) => {
  // @ts-ignore
  const errors: string[] = compose(
    uniq,
    flatten,
    map(prop("path")),
    pathOr([], ["data", "error", "issues"])
  )(fetcher);

  return (
    <BaseForm
      fetcher={fetcher}
      resetOnSubmit={resetOnSubmit}
      method={method}
      action={action}
    >
      <AuthenticityTokenInput />
      {fields.map((field) => {
        const disabled = fetcher.state === "submitting";
        const invalid = errors.includes(field.name);
        if (field.type === "select") {
          return (
            <SelectInput
              key={field.label}
              required={field.required}
              label={field.label}
              placeholder={field.placeholder}
              options={pathOr([], [field.name], options)}
              defaultValue={getDefaultValue(field, data)(fetcher)}
              name={field.name}
              disabled={disabled}
              invalid={invalid}
            />
          );
        }
        if (field.type === "custom") {
          if (!field.custom) {
            throw new Error("Custom field must have a component");
          }
          return createElement(field.custom, {
            key: field.label,
            required: field.required,
            label: field.label,
            placeholder: field.placeholder,
            defaultValue: getDefaultValue(field, data)(fetcher),
            name: field.name,
            disabled,
            invalid,
          });
        }
        return (
          <Input
            key={field.label}
            required={field.required}
            label={field.label}
            placeholder={field.placeholder}
            defaultValue={getDefaultValue(field, data)(fetcher)}
            name={field.name}
            type={field.type}
            disabled={disabled}
            invalid={invalid}
          />
        );
      })}
      {children}
    </BaseForm>
  );
};

FormRender.defaultProps = {};

export default FormRender;
