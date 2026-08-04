import { forwardRef, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

const inputBase =
  'w-full h-12 px-4 rounded-xl border border-hairline bg-canvas text-[16px] text-ink placeholder:text-ink-48 transition-colors duration-200 focus:outline-none focus:border-action-focus focus:ring-[3px] focus:ring-action/15'

const errorBase = 'border-error focus:border-error focus:ring-error/15'

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  required?: boolean
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, error, required, className, id, ...props },
  ref,
) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label htmlFor={id} className="block text-caption-strong text-ink-80">
          {label}
          {required && <span className="ml-0.5 text-error">*</span>}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        {...props}
        className={cn(inputBase, error && errorBase)}
      />
      {error && <p className="text-caption text-error">{error}</p>}
    </div>
  )
})

export interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  required?: boolean
}

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  function TextAreaField({ label, error, required, className, id, ...props }, ref) {
    return (
      <div className={cn('space-y-1.5', className)}>
        {label && (
          <label htmlFor={id} className="block text-caption-strong text-ink-80">
            {label}
            {required && <span className="ml-0.5 text-error">*</span>}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          {...props}
          className={cn(inputBase, 'h-auto min-h-[88px] resize-none py-3', error && errorBase)}
        />
        {error && <p className="text-caption text-error">{error}</p>}
      </div>
    )
  },
)

export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  required?: boolean
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(function SelectField(
  { label, error, required, className, id, children, ...props },
  ref,
) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label htmlFor={id} className="block text-caption-strong text-ink-80">
          {label}
          {required && <span className="ml-0.5 text-error">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          ref={ref}
          {...props}
          className={cn(inputBase, 'appearance-none pr-10 cursor-pointer', error && errorBase)}
        >
          {children}
        </select>
        <svg
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {error && <p className="text-caption text-error">{error}</p>}
    </div>
  )
})

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <div className={cn('relative', className)}>
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-[14px] w-[14px] -translate-y-1/2 text-ink-48"
        aria-hidden
      />
      <input
        type="search"
        {...props}
        className="h-12 w-full rounded-full border border-hairline bg-canvas pl-11 pr-5 text-[16px] text-ink placeholder:text-ink-48 transition-colors duration-200 focus:outline-none focus:border-action-focus focus:ring-[3px] focus:ring-action/15 [&::-webkit-search-cancel-button]:hidden"
      />
    </div>
  )
}

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  className?: string
}

export function Toggle({ checked, onChange, label, className }: ToggleProps) {
  return (
    <label className={cn('inline-flex cursor-pointer items-center gap-2.5', className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative h-8 w-[52px] rounded-full transition-colors duration-300',
          checked ? 'bg-success' : 'bg-hairline',
        )}
      >
        <span
          className={cn(
            'absolute top-[3px] h-[26px] w-[26px] rounded-full bg-white transition-transform duration-300',
            checked ? 'translate-x-[23px]' : 'translate-x-[3px]',
          )}
        />
      </button>
      {label && <span className="text-caption text-ink-80">{label}</span>}
    </label>
  )
}
