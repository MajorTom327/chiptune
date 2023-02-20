import type { FieldType } from "~/forms/BaseForm";
import BaseForm from "~/forms/BaseForm";
import zod from "zod";

const schema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});

type LoginFormResult = zod.infer<typeof schema>;

export class LoginForm extends BaseForm<LoginFormResult> {
  protected schema = schema;

  protected fields: FieldType[] = [
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
  ];
}

export const loginForm = new LoginForm();

export default loginForm;
