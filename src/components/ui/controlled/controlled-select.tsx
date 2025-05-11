"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ValueLabel } from "@/lib/types/valueLabel";
import { X } from "lucide-react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type SelectProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  options?: ValueLabel[];
  placeholder?: string;
  clearable?: boolean;
};
const ControlledSelect = <T extends FieldValues>({
  label,
  name,
  options = [],
  placeholder,
  clearable,
}: SelectProps<T>) => {
  const { control } = useFormContext<T>();
  return (
    <div className="w-full">
      {!!label && (
        <Label className="mb-2" htmlFor={name}>
          {label}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, ...restField },
          fieldState: { error },
        }) => (
          <>
            <Select onValueChange={onChange} {...restField}>
              <div className="relative flex">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                {clearable && !!restField.value && (
                  <Button
                    variant="ghost"
                    className="text-foreground/40 hover:bg-accent/0 absolute top-1/2 right-8 size-4 -translate-y-1/2"
                    size="icon"
                    onClick={() => {
                      onChange("");
                    }}
                  >
                    <X />
                  </Button>
                )}
              </div>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{label}</SelectLabel>
                  {options.map((item) => (
                    <SelectItem value={item.value.toString()} key={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {!!error && (
              <p className="text-destructive text-sm">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export { ControlledSelect };
