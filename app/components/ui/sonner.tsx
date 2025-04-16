import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

interface ToasterProps {
  theme?: "light" | "dark" | "system"
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center"
  hotkey?: string[]
  richColors?: boolean
  expand?: boolean
  duration?: number
  className?: string
  style?: React.CSSProperties
  closeButton?: boolean
  offset?: string | number
  [key: string]: any
}

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
