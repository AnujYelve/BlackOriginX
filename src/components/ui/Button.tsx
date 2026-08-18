import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef, ReactElement, cloneElement } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

// Omit conflicting props from framer-motion to combine with our ButtonProps
type MotionButtonProps = Omit<HTMLMotionProps<"button">, keyof ButtonProps> & ButtonProps;

export const buttonVariants = ({ variant = "primary", size = "md", className }: { variant?: "primary" | "secondary" | "outline" | "ghost", size?: "sm" | "md" | "lg", className?: string }) => cn(
  "inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:scale-[1.02] active:scale-[0.98]",
  {
    "bg-brand-white text-brand-black hover:bg-gray-200": variant === "primary",
    "bg-brand-dark-grey text-brand-white hover:bg-gray-800": variant === "secondary",
    "border border-brand-white text-brand-white hover:bg-brand-white hover:!text-brand-black": variant === "outline",
    "hover:bg-brand-dark-grey text-brand-white": variant === "ghost",
    "h-9 px-4 text-sm": size === "sm",
    "h-11 px-6 text-base": size === "md",
    "h-14 px-8 text-lg": size === "lg",
  },
  className
);

const Button = forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, variant = "primary", size = "md", asChild, children, ...props }, ref) => {
    const classes = buttonVariants({ variant, size, className });

    // When asChild is true, render the child element directly with button styles
    if (asChild && children) {
      const child = children as ReactElement<any>;
      return cloneElement(child, {
        className: cn(classes, child.props?.className),
      });
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={classes}
        {...(props as any)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };

