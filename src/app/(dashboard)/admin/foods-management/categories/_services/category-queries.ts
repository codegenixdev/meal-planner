"use server";
import db from "@/lib/db";

const getCategories = async () => {
  return await db.category.findMany();
};

export { getCategories };
