
import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    
    const variantStyles = {
        default: "bg-brand-purple text-white hover:bg-brand-purple/90 shadow-lg shadow-brand-purple/20 border border-transparent",
        destructive: "bg-red-900 text-white hover:bg-red-900/90",
        outline: "border border-white/20 bg-transparent hover:bg-white/10 text-white",
        secondary: "bg-white text-black hover:bg-gray-100 border border-white",
        ghost: "hover:bg-white/10 text-white",
        link: "text-brand-purple underline-offset-4 hover:underline",
    }
    
    const sizeStyles = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
    }

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant] || variantStyles.default,
          sizeStyles[size] || sizeStyles.default,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
