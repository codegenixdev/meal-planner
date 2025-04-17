import { z } from "zod";

const regexSchema = (pattern: RegExp) => z.coerce.string().regex(pattern);
const requiredStringSchema = z.string().min(1).max(255).trim();

export { regexSchema, requiredStringSchema };
