import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { loginUser } from '../store/client/client.thunks'

function FieldError({ message }) {
  if (!message) return null
  return <p className="mt-1 text-sm font-medium text-red-600">{message}</p>
}

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onTouched',
  })

  async function onSubmit(values) {
    setIsSubmitting(true)
    try {
      await dispatch(
        loginUser({
          email: values.email,
          password: values.password,
          rememberMe: values.rememberMe,
        })
      )
      const backTo = location.state?.from
      if (typeof backTo === 'string') navigate(backTo)
      else navigate('/')
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Login failed. Please check your credentials.'
      toast.error(String(msg), { autoClose: 5000 })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full bg-white">
      <section className="mx-auto w-full max-w-[1440px] px-3 py-10 md:px-8 lg:px-[clamp(1rem,13.54vw,195px)] lg:py-14">
        <div className="mx-auto w-full max-w-xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <h1 className="text-3xl font-bold text-brand-dark">Welcome back</h1>
          <p className="mt-2 text-sm font-medium text-muted">
            Log in to your account.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="text-sm font-semibold text-brand-dark" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition-colors focus:border-brand"
                placeholder="you@example.com"
                {...register('email', {
                  required: 'Email is required.',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email.',
                  },
                })}
              />
              <FieldError message={errors.email?.message} />
            </div>

            <div>
              <label
                className="text-sm font-semibold text-brand-dark"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition-colors focus:border-brand"
                placeholder="********"
                {...register('password', { required: 'Password is required.' })}
              />
              <FieldError message={errors.password?.message} />
            </div>

            <label className="flex items-center gap-2 text-sm font-medium text-muted">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-neutral-300 accent-brand"
                {...register('rememberMe')}
              />
              Remember me
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm font-medium text-muted">
            Don&apos;t have an account?{' '}
            <Link className="font-semibold text-brand hover:opacity-80" to="/signup">
              Register
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}

