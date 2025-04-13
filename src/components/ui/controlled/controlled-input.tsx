import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComponentProps } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
} & ComponentProps<"input">;

const ControlledInput = <T extends FieldValues>({
  className,
  type,
  name,
  label,
  ...props
}: InputProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <div className="space-y-2 w-full">
      {!!label && <Label htmlFor={name}>{label}</Label>}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input
              type={type}
              id={name}
              data-slot="input"
              aria-invalid={!!error}
              className={className}
              {...field}
              {...props}
            />
            {!!error && (
              <p className="text-sm text-destructive">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export { ControlledInput };
