"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { FormEventHandler, FormEvent } from "react" // Add missing import

interface CheckboxLabelProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void // Update type
}

export function CheckboxLabel({ label, checked, onChange }: CheckboxLabelProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" checked={checked} onCheckedChange={onChange} />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  )
}
