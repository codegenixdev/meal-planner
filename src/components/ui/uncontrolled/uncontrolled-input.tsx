import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComponentProps } from "react";

type UncontrolledInputProps = {
  label?: string;
  onChange?(value: string | number): void;
} & Omit<ComponentProps<"input">, "onChange">;

const UncontrolledInput = ({
  className,
  type,
  name,
  label,
  onChange,
  ...props
}: UncontrolledInputProps) => {
  return (
    <div className="space-y-2">
      {!!label && <Label htmlFor={name}>{label}</Label>}
      <Input
        type={type}
        id={name}
        data-slot="input"
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.value);
          }
        }}
        className={className}
        {...props}
      />
    </div>
  );
};

export { UncontrolledInput };
