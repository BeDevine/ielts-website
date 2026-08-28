import type { Metadata } from "next";
import LoginClient from "./login-client";

export const metadata: Metadata = {
  title: "Teacher Login | TRIELTS",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginClient />;
}
