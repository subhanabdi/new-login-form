"use client"

import React from "react"

import { useState, useRef, useEffect, useId } from "react"

// Custom SVG icons (no library)
function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
      <path d="m2 2 20 20" />
    </svg>
  )
}

function LoaderIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  )
}

// Types
interface FormErrors {
  email?: string
  password?: string
  form?: string
}

type FormStatus = "idle" | "loading" | "success" | "error"

// Mock fetch function
async function mockLogin(email: string, password: string): Promise<{ success: boolean; message: string }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock validation - accept specific test credentials
  if (email === "test@example.com" && password === "password123") {
    return { success: true, message: "Login successful! Redirecting..." }
  }

  // Simulate various error scenarios
  if (!email.includes("@")) {
    return { success: false, message: "Invalid email format" }
  }

  if (password.length < 8) {
    return { success: false, message: "Password must be at least 8 characters" }
  }

  // Generic failure for demo
  return { success: false, message: "Invalid email or password. Try test@example.com / password123" }
}

// Email validation
function validateEmail(email: string): string | undefined {
  if (!email) return "Email is required"
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address"
  return undefined
}

// Password validation
function validatePassword(password: string): string | undefined {
  if (!password) return "Password is required"
  if (password.length < 8) return "Password must be at least 8 characters"
  return undefined
}

export function LoginForm() {
  // Form state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>("idle")
  const [touched, setTouched] = useState({ email: false, password: false })

  // Refs for focus management
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)
  const errorAnnouncerRef = useRef<HTMLDivElement>(null)

  // Generate unique IDs for accessibility
  const emailId = useId()
  const passwordId = useId()
  const emailErrorId = useId()
  const passwordErrorId = useId()
  const formErrorId = useId()

  // Focus first input on mount
  useEffect(() => {
    emailInputRef.current?.focus()
  }, [])

  // Announce errors to screen readers
  useEffect(() => {
    if (errors.form && errorAnnouncerRef.current) {
      errorAnnouncerRef.current.textContent = errors.form
    }
  }, [errors.form])

  // Real-time validation on blur
  const handleEmailBlur = () => {
    setTouched((prev) => ({ ...prev, email: true }))
    const error = validateEmail(email)
    setErrors((prev) => ({ ...prev, email: error }))
  }

  const handlePasswordBlur = () => {
    setTouched((prev) => ({ ...prev, password: true }))
    const error = validatePassword(password)
    setErrors((prev) => ({ ...prev, password: error }))
  }

  // Clear field errors on input
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (touched.email) {
      setErrors((prev) => ({ ...prev, email: validateEmail(e.target.value) }))
    }
    if (errors.form) {
      setErrors((prev) => ({ ...prev, form: undefined }))
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (touched.password) {
      setErrors((prev) => ({ ...prev, password: validatePassword(e.target.value) }))
    }
    if (errors.form) {
      setErrors((prev) => ({ ...prev, form: undefined }))
    }
  }

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError })
      setTouched({ email: true, password: true })

      // Focus first errored field
      if (emailError) {
        emailInputRef.current?.focus()
      } else if (passwordError) {
        passwordInputRef.current?.focus()
      }
      return
    }

    // Submit
    setStatus("loading")
    setErrors({})

    try {
      const result = await mockLogin(email, password)

      if (result.success) {
        setStatus("success")
      } else {
        setStatus("error")
        setErrors({ form: result.message })
        // Focus submit button to keep user context
        submitButtonRef.current?.focus()
      }
    } catch {
      setStatus("error")
      setErrors({ form: "An unexpected error occurred. Please try again." })
      submitButtonRef.current?.focus()
    }
  }

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
    // Maintain focus on password input
    passwordInputRef.current?.focus()
  }

  const isSubmitDisabled = status === "loading" || status === "success"

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Screen reader announcer for dynamic content */}
      <div ref={errorAnnouncerRef} className="sr-only" role="status" aria-live="polite" aria-atomic="true" />

      {/* Success state */}
      {status === "success" ? (
        <div
          className="text-center animate-in fade-in-0 zoom-in-95 duration-300"
          role="status"
          aria-live="polite"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
            <CheckIcon className="w-8 h-8 text-success" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">Login successful. Redirecting you now...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Form error alert */}
          {errors.form && (
            <div
              id={formErrorId}
              role="alert"
              className="flex items-start gap-3 p-4 rounded-lg bg-destructive/5 border border-destructive/20 text-destructive animate-in fade-in-0 slide-in-from-top-1 duration-200"
            >
              <AlertIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{errors.form}</p>
            </div>
          )}

          {/* Email field */}
          <div className="space-y-2">
            <label htmlFor={emailId} className="block text-sm font-medium text-foreground">
              Email address
            </label>
            <div className="relative">
              <input
                ref={emailInputRef}
                id={emailId}
                type="email"
                name="email"
                autoComplete="email"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
                required
                aria-required="true"
                aria-invalid={touched.email && !!errors.email}
                aria-describedby={errors.email ? emailErrorId : undefined}
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                disabled={isSubmitDisabled}
                placeholder="you@example.com"
                className={`
                  w-full px-4 py-3 rounded-lg text-base font-sans
                  bg-card border-2 transition-all duration-200
                  placeholder:text-muted-foreground/50
                  focus:outline-none focus:ring-0
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${
                    touched.email && errors.email
                      ? "border-destructive focus:border-destructive"
                      : "border-border hover:border-muted-foreground/30 focus:border-foreground"
                  }
                `}
              />
            </div>
            {touched.email && errors.email && (
              <p
                id={emailErrorId}
                role="alert"
                className="flex items-center gap-1.5 text-sm text-destructive animate-in fade-in-0 slide-in-from-top-1 duration-150"
              >
                <AlertIcon className="w-4 h-4 flex-shrink-0" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor={passwordId} className="block text-sm font-medium text-foreground">
                Password
              </label>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                onClick={(e) => e.preventDefault()}
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                ref={passwordInputRef}
                id={passwordId}
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                required
                aria-required="true"
                aria-invalid={touched.password && !!errors.password}
                aria-describedby={errors.password ? passwordErrorId : undefined}
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                disabled={isSubmitDisabled}
                placeholder="Enter your password"
                className={`
                  w-full px-4 py-3 pr-12 rounded-lg text-base font-sans
                  bg-card border-2 transition-all duration-200
                  placeholder:text-muted-foreground/50
                  focus:outline-none focus:ring-0
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${
                    touched.password && errors.password
                      ? "border-destructive focus:border-destructive"
                      : "border-border hover:border-muted-foreground/30 focus:border-foreground"
                  }
                `}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                disabled={isSubmitDisabled}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  p-1.5 rounded-md
                  text-muted-foreground hover:text-foreground
                  transition-colors duration-150
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-ring
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {touched.password && errors.password && (
              <p
                id={passwordErrorId}
                role="alert"
                className="flex items-center gap-1.5 text-sm text-destructive animate-in fade-in-0 slide-in-from-top-1 duration-150"
              >
                <AlertIcon className="w-4 h-4 flex-shrink-0" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            ref={submitButtonRef}
            type="submit"
            disabled={isSubmitDisabled}
            aria-disabled={isSubmitDisabled}
            className="
              relative w-full py-3.5 px-4 rounded-lg
              bg-primary text-primary-foreground
              font-semibold text-base
              transition-all duration-200
              hover:bg-primary/90 active:scale-[0.98]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
              disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100
            "
          >
            <span className={`transition-opacity duration-200 ${status === "loading" ? "opacity-0" : "opacity-100"}`}>
              Sign in
            </span>
            {status === "loading" && (
              <span className="absolute inset-0 flex items-center justify-center">
                <LoaderIcon className="w-5 h-5 animate-spin" />
                <span className="sr-only">Signing in...</span>
              </span>
            )}
          </button>

          {/* Demo credentials hint */}
          <div className="pt-2 text-center">
            <p className="text-xs text-muted-foreground">
              Demo: <span className="font-mono text-foreground/70">test@example.com</span> /{" "}
              <span className="font-mono text-foreground/70">password123</span>
            </p>
          </div>
        </form>
      )}
    </div>
  )
}
