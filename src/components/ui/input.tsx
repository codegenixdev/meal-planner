import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
} & ComponentProps<"input">;

const Input = <T extends FieldValues>({
  className,
  type,
  name,
  label,
  ...props
}: InputProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <div className="space-y-2">
      {!!label && <Label htmlFor={name}>{label}</Label>}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <input
              type={type}
              id={name}
              data-slot="input"
              aria-invalid={!!error}
              className={cn(
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                className
              )}
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

export { Input };
