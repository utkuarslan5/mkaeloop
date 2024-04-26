import React from "react";
import { Link } from "react-router-dom";
import { LoginForm } from "wasp/client/auth";

export default function LoginPopUp() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <div>
          <LoginForm
            appearance={{
              colors: {
                brand: "var(--auth-form-brand)",
                brandAccent: "var(--auth-form-brand-accent)",
                submitButtonText: "var(--auth-form-submit-button-text-color)",
              },
            }}
          />
          <div className="mt-4 text-center">
            If you don't have an account go to{" "}
            <Link
              to="/signup"
              className="text-primary-500 hover:text-primary-800 underline"
            >
              sign up
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
