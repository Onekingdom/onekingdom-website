"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerProps {
  onChange?: (date: Date) => void;
  Value: Date;
}

export function DatePicker({ onChange, Value }: DatePickerProps) {
  const handleDateChange = (newDate: Date | undefined) => {
    if (onChange) {
      onChange(newDate || new Date());
    }
  };



  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className={cn("w-[240px] justify-start text-left font-normal", !Value && "text-muted-foreground")}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {Value ? format(Value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={Value} onSelect={handleDateChange} required />
      </PopoverContent>
    </Popover>
  );
}
