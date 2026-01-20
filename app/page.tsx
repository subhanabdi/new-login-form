'use client';

import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      {/* Skip link for keyboard users */}
      <a
        href="#login-form"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
      >
        Skip to login form
      </a>

      <div className="w-full max-w-md space-y-8">
        {/* Logo and header */}
        <header className="text-center space-y-2">
          {/* Logo mark */}
          <div
            className="w-12 h-12 mx-auto mb-6 rounded-xl bg-foreground flex items-center justify-center"
            aria-hidden="true"
          >
            <svg
              className="w-6 h-6 text-background"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance">
            Welcome back
          </h1>
          <p className="text-muted-foreground text-balance">
            Sign in to your account to continue
          </p>
        </header>

        {/* Login form card */}
        <section
          id="login-form"
          aria-labelledby="form-heading"
          className="bg-card rounded-2xl border border-border p-8 shadow-sm"
        >
          <h2 id="form-heading" className="sr-only">
            Sign in form
          </h2>
          <LoginForm />
        </section>

        {/* Footer */}
        <footer className="text-center">
          <p className="text-sm text-muted-foreground">
            {"Don't have an account? "}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="font-medium text-foreground hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
            >
              Create one
            </a>
          </p>
        </footer>
      </div>
    </main>
  )
}
