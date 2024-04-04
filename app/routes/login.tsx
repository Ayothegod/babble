// app/routes/login.tsx
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

// login or signup
export async function action({ request }: ActionFunctionArgs) {
    let formData = await request.formData();
  return await authenticator.authenticate("user-pass", request, {

    successRedirect: "/dashboard",
    failureRedirect: "/login",
    context: { formData }, 
  });
}

// check if user session already exists
export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });
}

export default function Screen() {
  return (
    <Form method="post">
      <input
        type="email"
        name="email"
        className="border border-blacK"
        required
      />
      <input
        className="border border-blacK"
        type="password"
        name="password"
        autoComplete="current-password"
        required
      />
      <button>Sign In</button>
    </Form>
  );
}
