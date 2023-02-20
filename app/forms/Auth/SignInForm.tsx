import type { FieldType, FormActionData } from "~/forms/BaseForm";
import BaseForm from "~/forms/BaseForm";
import zod from "zod";

const schema = zod
  .object({
    email: zod.string().email(),
    password: zod.string().min(8),
    confirmPassword: zod.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  });

const fields: FieldType[] = [
  {
    label: "Email",
    name: "email",
    type: "email",
    required: true,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    required: true,
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
    required: true,
  },
];

type LoginFormResult = zod.infer<typeof schema>;

export type LoginFormActionData = FormActionData<LoginFormResult>;

export class SignInForm extends BaseForm<LoginFormResult> {
  protected schema = schema;
  protected fields = fields;
}

export const signInForm = new SignInForm();

export default signInForm;
