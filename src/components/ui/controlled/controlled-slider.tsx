"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import {
  Controller,
  FieldValues,
  Path,
  PathValue,
  useFormContext,
} from "react-hook-form";
import { Button } from "@/components/ui/button"; // Import your button component

interface SliderProps<T extends FieldValues>
  extends React.ComponentProps<typeof SliderPrimitive.Root> {
  name: Path<T>;
  label?: string;
  minStepsBetweenThumbs?: number;
  showResetButton?: boolean;
}

function ControlledSlider<T extends FieldValues>({
  className,
  name,
  label = "Price Range",
  defaultValue,
  min = 0,
  max = 100,
  minStepsBetweenThumbs = 1,
  showResetButton = true,
  ...props
}: SliderProps<T>) {
  const { control, setValue } = useFormContext<T>();

  const handleReset = () => {
    setValue(name, ["", ""] as PathValue<T, Path<T>>);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const values = Array.isArray(field.value)
          ? field.value
          : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max];

        const handleValueChange = (newValues: number[]) => {
          if (minStepsBetweenThumbs > 1 && newValues.length > 1) {
            for (let i = 0; i < newValues.length - 1; i++) {
              if (newValues[i + 1] - newValues[i] < minStepsBetweenThumbs) {
                return;
              }
            }
          }
          field.onChange(newValues);
        };

        return (
          <div className="grid gap-4 p-4 w-full border border-[#14424C]/20 rounded-md">
            <div className="flex justify-between items-center">
              {label && (
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {label}
                </label>
              )}
              {showResetButton && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="text-xs h-6 px-2"
                >
                  Reset
                </Button>
              )}
            </div>

            <SliderPrimitive.Root
              data-slot="slider"
              value={field.value ?? values}
              min={min}
              max={max}
              onValueChange={handleValueChange}
              className={cn(
                "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
                className
              )}
              {...props}
            >
              <SliderPrimitive.Track
                data-slot="slider-track"
                className={cn(
                  "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
                )}
              >
                <SliderPrimitive.Range
                  data-slot="slider-range"
                  className={cn(
                    "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                  )}
                />
              </SliderPrimitive.Track>
              {values.map((_, index) => (
                <SliderPrimitive.Thumb
                  data-slot="slider-thumb"
                  key={index}
                  className="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
                />
              ))}
            </SliderPrimitive.Root>

            <div className="flex gap-2 flex-wrap">
              <ol className="flex items-center w-full gap-3">
                {values.map((singleValue, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between w-full border px-3 h-10 rounded-md"
                  >
                    <span>{index === 0 ? "Min" : "Max"}</span>
                    <span>{singleValue.toLocaleString()}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        );
      }}
    />
  );
}

export { ControlledSlider };
