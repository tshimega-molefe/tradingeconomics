"use client";
import { FC, useEffect, useState } from "react";
import { useSearchStore } from "@/store/use-search-store";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PERMITTED_COUNTRIES,
  PERMITTED_SYMBOLS,
} from "@/config/permitted-trading-economics-api-datapoints";
import { useSearchResult } from "@/hooks/use-search-result";
import { Spinner } from "@phosphor-icons/react";

interface SearchInputProps {}

const SearchInput: FC<SearchInputProps> = () => {
  const { searchQuery, setSearchQuery } = useSearchStore();
  const { isLoading } = useSearchResult();
  const [localSearchQuery, setLocalSearchQuery] = useState<string | undefined>(
    searchQuery
  );

  // Sync local state with global state
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const onSearch = (selectedValue: string) => {
    setSearchQuery(selectedValue);
  };

  return (
    <div className="flex flex-col gap-5 w-full md:w-2/3 lg:w-1/3">
      <Select onValueChange={onSearch} value={localSearchQuery}>
        <SelectTrigger className="pl-8 bg-background">
          {isLoading ? (
            <div className="items-center flex flex-row">
              <p className="text-sm">Fetching your results...</p>
              <Spinner className="w-4 h-4 animate-spin ml-2" />
            </div>
          ) : (
            <SelectValue placeholder="Select a country or symbol" />
          )}
        </SelectTrigger>
        <SelectContent>
          {PERMITTED_COUNTRIES.map((country) => (
            <SelectItem key={country} value={country}>
              {country}
            </SelectItem>
          ))}
          {PERMITTED_SYMBOLS.map((symbol) => (
            <SelectItem key={symbol} value={symbol}>
              {symbol}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchInput;
