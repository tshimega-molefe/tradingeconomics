"use server";

import { FinancialData } from "@/types/financial-data";

export const getCompanyData = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api`, {
      method: "GET",
    });
    const result = await response.json();
    const companyData: FinancialData[] = result.data;
    return companyData;
  } catch (error) {
    return null;
  }
};
