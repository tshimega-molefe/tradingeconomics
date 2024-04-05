"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useCallback, useState, useTransition } from "react";

import { toast } from "sonner";
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
import { GetSearchResults } from "@/server/actions/get-search-results";
import { Spinner } from "@phosphor-icons/react";

interface SearchInputProps {}

const SearchInput: FC<SearchInputProps> = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const onSearch = async (selectedValue: string) => {
    setSearchQuery(selectedValue);
    const encodedSearchQuery = encodeURI(selectedValue);

    startTransition(() => {
      GetSearchResults(encodedSearchQuery).then((data) => {
        if (data) {
          router.push(
            pathname + "?" + createQueryString("q", encodedSearchQuery)
          );
        }
        if (!data) {
          router.refresh();
        }
      });
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full md:w-2/3 lg:w-1/3">
      <Select onValueChange={onSearch} defaultValue={searchQuery}>
        <SelectTrigger className="pl-8 bg-background">
          {isPending ? (
            <div className="flex flex-row items-center">
              <p className="font-mono text-xs">Searching...</p>
              <Spinner className="animate-spin w-4 h-4 ml-1" />
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
