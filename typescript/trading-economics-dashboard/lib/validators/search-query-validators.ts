import { z } from "zod";

export const SearchQuerySchema = z.object({
  searchQuery: z.string(),
});

export type TSearchQueryValidator = z.infer<typeof SearchQuerySchema>;
