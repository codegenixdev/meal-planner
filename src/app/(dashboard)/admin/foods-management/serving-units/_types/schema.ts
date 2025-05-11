import { z } from "zod";

const servingUnitSchema = z.intersection(
  z.object({
    name: z.string().min(1).max(255),
  }),
  z.discriminatedUnion("action", [
    z.object({ action: z.literal("create") }),
    z.object({ action: z.literal("update"), id: z.number().min(1) }),
  ]),
);

type ServingUnitSchema = z.infer<typeof servingUnitSchema>;

const servingUnitDefaultValues: ServingUnitSchema = {
  action: "create",
  name: "",
};

export { servingUnitSchema, servingUnitDefaultValues, type ServingUnitSchema };
