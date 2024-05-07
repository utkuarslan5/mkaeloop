import React from "react";
import { Link } from "react-router-dom";
import { LoginForm } from "wasp/client/auth";

export default function LoginPopUp({ setShowLoginPopUp }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setShowLoginPopUp(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
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
