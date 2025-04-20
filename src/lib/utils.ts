import { clsx, type ClassValue } from "clsx";
import bcrypt from "bcryptjs";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const toStringSafe = (value: string | number | null | undefined): string => {
  return value == null ? "" : String(value);
};

const toNumberSafe = (value: string | number | null | undefined): number => {
  if (value == null) return 0;
  if (typeof value === "number") return value;

  const parsed = Number(value);
  return isNaN(parsed) ? 0 : parsed;
};

const SALT_ROUNDS = 10;
const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

const comparePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export { cn, toStringSafe, toNumberSafe, hashPassword, comparePassword };
