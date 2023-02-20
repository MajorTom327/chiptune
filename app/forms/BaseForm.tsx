import React from "react";
import type zod from "zod";
import type { InputType } from "~/components/Input/Input";
import FormRender from "./FormRender";
import type { ZodError } from "zod";
import type { FetcherWithComponents } from "@remix-run/react";
import { verifyAuthenticityToken } from "remix-utils";
import { sessionStorage } from "~/services/session.server";
import { prop } from "ramda";
import logger from "~/lib/logger.server";

export type FieldTypeList = InputType | "select" | "custom";

export type CustomInputProp = {
  name: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  options?: any[];
  defaultValue?: string;
};

export type FieldType = {
  label: string;
  name: string;
  placeholder?: string;
  type: FieldTypeList;
  required?: boolean;
  options?: string;
  custom?: React.FunctionComponent<CustomInputProp>;
};

export type FormActionData<T> = {
  error?: ZodError;
  data: T | any;
};

export type RenderOptions = {
  fetcher: FetcherWithComponents<any>;
  data?: any;
  children?: React.ReactElement;
  options?: Record<string, any>;
  method?: "post" | "get";
  action?: string;
};

export abstract class BaseForm<T> {
  protected abstract schema: zod.ZodSchema<T>;
  protected abstract fields: FieldType[];
  protected resetOnSubmit = false;

  render(props: RenderOptions): JSX.Element {
    const fetcher = prop("fetcher", props);
    const children = prop("children", props);
    const data = prop("data", props);
    const options = prop("options", props);
    const method = prop("method", props);
    const action = prop("action", props);

    return (
      <>
        <FormRender
          fetcher={fetcher}
          fields={this.fields}
          data={data}
          resetOnSubmit={this.resetOnSubmit}
          options={options || {}}
          method={method}
          action={action}
        >
          {children}
        </FormRender>
      </>
    );
  }

  isValid(data: any): boolean {
    return this.schema.safeParse(data).success;
  }

  protected getValues(data: any): T {
    return this.schema.parse(data);
  }

  async verifyToken(request: Request): Promise<boolean> {
    const localRequest = request.clone();
    const session = await sessionStorage.getSession(
      localRequest.headers.get("Cookie")
    );

    logger.debug("Verify token", { session });

    await verifyAuthenticityToken(localRequest, session);
    return true;
  }

  parse(formData: FormData): FormActionData<T> {
    const clone = formData;
    const data = Object.fromEntries(clone.entries());

    try {
      return {
        data: this.getValues(data),
      };
    } catch (error: any) {
      return { error, data };
    }
  }
}

export default BaseForm;
