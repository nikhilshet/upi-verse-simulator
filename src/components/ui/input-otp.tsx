
import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Dot } from "lucide-react"

import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  
  // Add a safety check to ensure context and slots exist before accessing them
  const slot = inputOTPContext?.slots?.[index] || { char: "", hasFakeCaret: false, isActive: false }
  const { char, hasFakeCaret, isActive } = slot

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-16 w-14 items-center justify-center rounded-xl border-2 bg-white/5 backdrop-blur-sm shadow-sm transition-all dark:bg-gray-800/30",
        isActive ? "border-upi-blue ring-2 ring-upi-blue/30 scale-110" : "border-gray-200 dark:border-gray-700",
        className
      )}
      {...props}
    >
      {char && (
        <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 animate-fade-in">
          {char}
        </div>
      )}
      {!char && isActive && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-7 w-0.5 animate-caret-blink bg-upi-blue duration-700" />
        </div>
      )}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-7 w-0.5 animate-caret-blink bg-foreground duration-700" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot className="text-gray-400" />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
