import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

import { api } from '../lib/api'

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
const TR_PHONE_REGEX = /^(\+?90)?\s*5\d{2}\s*\d{3}\s*\d{2}\s*\d{2}$/
const TAX_NO_REGEX = /^T\d{4}V\d{6}$/
const IBAN_REGEX = /^TR\d{2}[0-9A-Z]{5,}$/i

function FieldError({ message }) {
  if (!message) return null
  return <p className="mt-1 text-sm font-medium text-red-600">{message}</p>
}

export default function SignupPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [roles, setRoles] = useState([])
  const [rolesLoading, setRolesLoading] = useState(true)
  const [rolesError, setRolesError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultRoleId = useMemo(() => {
    const customer = roles.find(
      (r) => (r.code || '').toLowerCase() === 'customer'
    )
    return customer?.id ?? roles[0]?.id ?? ''
  }, [roles])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      role_id: '',
      store_name: '',
      store_phone: '',
      store_tax_no: '',
      store_bank_account: '',
    },
    mode: 'onTouched',
  })

  const roleId = watch('role_id')
  const password = watch('password')

  const selectedRole = useMemo(
    () => roles.find((r) => String(r.id) === String(roleId)),
    [roles, roleId]
  )
  const isStoreRole = (selectedRole?.code || '').toLowerCase() === 'store'

  useEffect(() => {
    let alive = true
    async function loadRoles() {
      try {
        setRolesLoading(true)
        setRolesError('')
        const res = await api.get('/roles')
        const list = Array.isArray(res.data) ? res.data : res.data?.roles
        if (!alive) return
        setRoles(Array.isArray(list) ? list : [])
      } catch (err) {
        if (!alive) return
        setRolesError('Failed to load roles. Please try again.')
      } finally {
        if (!alive) return
        setRolesLoading(false)
      }
    }
    loadRoles()
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    if (!rolesLoading && defaultRoleId) {
      setValue('role_id', String(defaultRoleId), { shouldValidate: true })
    }
  }, [defaultRoleId, rolesLoading, setValue])

  useEffect(() => {
    if (!isStoreRole) {
      resetField('store_name')
      resetField('store_phone')
      resetField('store_tax_no')
      resetField('store_bank_account')
    }
  }, [isStoreRole, resetField])

  async function onSubmit(values) {
    setSubmitError('')
    setIsSubmitting(true)

    const payload = isStoreRole
      ? {
          name: values.name,
          email: values.email,
          password: values.password,
          role_id: Number(values.role_id),
          store: {
            name: values.store_name,
            phone: values.store_phone,
            tax_no: values.store_tax_no,
            bank_account: values.store_bank_account,
          },
        }
      : {
          name: values.name,
          email: values.email,
          password: values.password,
          role_id: Number(values.role_id),
        }

    try {
      await api.post('/signup', payload)
      const backTo = location.state?.from ?? -1
      navigate(backTo, {
        state: {
          warning: 'You need to click link in email to activate your account!',
        },
      })
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Signup failed. Please check your info and try again.'
      setSubmitError(String(msg))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full bg-white">
      <section className="mx-auto w-full max-w-[1440px] px-3 py-10 md:px-8 lg:px-[clamp(1rem,13.54vw,195px)] lg:py-14">
        <div className="mx-auto w-full max-w-xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <h1 className="text-3xl font-bold text-brand-dark">Create account</h1>
          <p className="mt-2 text-sm font-medium text-muted">
            Sign up to get started.
          </p>

          {rolesError ? (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {rolesError}
            </div>
          ) : null}

          {submitError ? (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {submitError}
            </div>
          ) : null}

          <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="text-sm font-semibold text-brand-dark" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition-colors focus:border-brand"
                placeholder="Your name"
                {...register('name', {
                  required: 'Name is required.',
                  minLength: { value: 3, message: 'Name must be at least 3 characters.' },
                })}
              />
              <FieldError message={errors.name?.message} />
            </div>

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
              <label className="text-sm font-semibold text-brand-dark" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition-colors focus:border-brand"
                placeholder="********"
                {...register('password', {
                  required: 'Password is required.',
                  validate: (v) =>
                    PASSWORD_REGEX.test(v) ||
                    'Password must be at least 8 chars and include upper, lower, number, and special character.',
                })}
              />
              <FieldError message={errors.password?.message} />
            </div>

            <div>
              <label
                className="text-sm font-semibold text-brand-dark"
                htmlFor="passwordConfirm"
              >
                Confirm password
              </label>
              <input
                id="passwordConfirm"
                type="password"
                autoComplete="new-password"
                className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition-colors focus:border-brand"
                placeholder="********"
                {...register('passwordConfirm', {
                  required: 'Please confirm your password.',
                  validate: (v) => v === password || 'Passwords do not match.',
                })}
              />
              <FieldError message={errors.passwordConfirm?.message} />
            </div>

            <div>
              <label className="text-sm font-semibold text-brand-dark" htmlFor="role_id">
                Role
              </label>
              <select
                id="role_id"
                disabled={rolesLoading}
                className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition-colors focus:border-brand disabled:cursor-not-allowed disabled:bg-neutral-50"
                {...register('role_id', { required: 'Role is required.' })}
              >
                {rolesLoading ? (
                  <option value="">Loading roles...</option>
                ) : (
                  <>
                    <option value="" disabled>
                      Select a role
                    </option>
                    {roles.map((r) => (
                      <option key={r.id} value={String(r.id)}>
                        {r.name}
                      </option>
                    ))}
                  </>
                )}
              </select>
              <FieldError message={errors.role_id?.message} />
            </div>

            {isStoreRole ? (
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                <h2 className="text-sm font-bold text-brand-dark">Store details</h2>

                <div className="mt-4 space-y-4">
                  <div>
                    <label
                      className="text-sm font-semibold text-brand-dark"
                      htmlFor="store_name"
                    >
                      Store Name
                    </label>
                    <input
                      id="store_name"
                      type="text"
                      className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition-colors focus:border-brand"
                      placeholder="Your store name"
                      {...register('store_name', {
                        required: 'Store name is required.',
                        minLength: {
                          value: 3,
                          message: 'Store name must be at least 3 characters.',
                        },
                      })}
                    />
                    <FieldError message={errors.store_name?.message} />
                  </div>

                  <div>
                    <label
                      className="text-sm font-semibold text-brand-dark"
                      htmlFor="store_phone"
                    >
                      Store Phone
                    </label>
                    <input
                      id="store_phone"
                      type="tel"
                      className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition-colors focus:border-brand"
                      placeholder="+90 5xx xxx xx xx"
                      {...register('store_phone', {
                        required: 'Store phone is required.',
                        validate: (v) =>
                          TR_PHONE_REGEX.test(v) ||
                          'Please enter a valid Türkiye phone number.',
                      })}
                    />
                    <FieldError message={errors.store_phone?.message} />
                  </div>

                  <div>
                    <label
                      className="text-sm font-semibold text-brand-dark"
                      htmlFor="store_tax_no"
                    >
                      Store Tax ID
                    </label>
                    <input
                      id="store_tax_no"
                      type="text"
                      className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition-colors focus:border-brand"
                      placeholder="T1234V123456"
                      {...register('store_tax_no', {
                        required: 'Tax ID is required.',
                        validate: (v) =>
                          TAX_NO_REGEX.test(v) ||
                          'Tax ID must match pattern TXXXXVXXXXXX.',
                      })}
                    />
                    <FieldError message={errors.store_tax_no?.message} />
                  </div>

                  <div>
                    <label
                      className="text-sm font-semibold text-brand-dark"
                      htmlFor="store_bank_account"
                    >
                      Store Bank Account (IBAN)
                    </label>
                    <input
                      id="store_bank_account"
                      type="text"
                      className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition-colors focus:border-brand"
                      placeholder="TR00 0000 0000 0000 0000 0000 00"
                      {...register('store_bank_account', {
                        required: 'Bank account is required.',
                        validate: (v) =>
                          IBAN_REGEX.test(String(v).replace(/\s+/g, '')) ||
                          'Please enter a valid IBAN.',
                      })}
                    />
                    <FieldError message={errors.store_bank_account?.message} />
                  </div>
                </div>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting || rolesLoading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Creating account...
                </>
              ) : (
                'Sign up'
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

