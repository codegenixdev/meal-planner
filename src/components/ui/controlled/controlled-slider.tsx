"use client";

import { cn } from "@/lib/utils";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

interface SliderProps<T extends FieldValues>
  extends React.ComponentProps<typeof SliderPrimitive.Root> {
  name: Path<T>;
  label?: string;
  minStepsBetweenThumbs?: number;
}

function ControlledSlider<T extends FieldValues>({
  className,
  name,
  label = "Price Range",
  defaultValue,
  min = 0,
  max = 100,
  minStepsBetweenThumbs = 1,
  ...props
}: SliderProps<T>) {
  const { control } = useFormContext<T>();

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
          <div className="grid w-full gap-4 rounded-md border border-[#14424C]/20 p-4">
            <div className="flex items-center justify-between">
              {label && (
                <label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {label}
                </label>
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
                className,
              )}
              {...props}
            >
              <SliderPrimitive.Track
                data-slot="slider-track"
                className={cn(
                  "bg-muted relative grow cursor-pointer overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
                )}
              >
                <SliderPrimitive.Range
                  data-slot="slider-range"
                  className={cn(
                    "bg-primary absolute cursor-pointer data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
                  )}
                />
              </SliderPrimitive.Track>
              {values.map((_, index) => (
                <SliderPrimitive.Thumb
                  data-slot="slider-thumb"
                  key={index}
                  className="border-primary bg-background ring-ring/50 block size-4 shrink-0 cursor-pointer rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
                />
              ))}
            </SliderPrimitive.Root>

            <div className="flex flex-wrap gap-2">
              <ol className="flex w-full items-center gap-3">
                {values.map((singleValue, index) => (
                  <li
                    key={index}
                    className="flex h-10 w-full items-center justify-between rounded-md border px-3"
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
