import { LoginForm } from "../../components/login-form.component/login-form.component";
import { AuthLayout } from "../../layouts/auth.layout/auth.layout";

function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}

export default LoginPage;
