"use client";

import { useSearchStore } from "@/store/use-search-store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { FinancialData } from "@/types/financial-data";
import { CountryData } from "@/types/country-data";
import { findAndEncodeQueryPart } from "@/lib/utils/utils";

export const useSearchResult = () => {
  const { searchQuery } = useSearchStore();

  return useQuery({
    queryKey: [searchQuery],
    queryFn: async () => {
      if (!searchQuery) {
        return null;
      }

      const { encodedQuery, type, error } = findAndEncodeQueryPart(searchQuery);
      if (error) {
        throw new Error(error);
      }

      let url = "";
      if (type === "country") {
        url = `http://localhost:3000/api/country?q=${encodedQuery}`;
      } else if (type === "symbol") {
        url = `http://localhost:3000/api/financial?q=${encodedQuery}`;
      }

      const { data } = await axios.get(url);
      return data as FinancialData[] | CountryData[];
    },
    staleTime: 1000 * 60 * 4, // 4 minutes
    enabled: !!searchQuery, // Only run the query if searchQuery is not empty
  });
};
