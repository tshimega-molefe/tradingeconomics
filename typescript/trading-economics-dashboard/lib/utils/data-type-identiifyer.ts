// utils/dataTypeIdentifier.ts
import {
  PERMITTED_COUNTRIES,
  PERMITTED_SYMBOLS,
} from "@/config/permitted-trading-economics-api-datapoints";

// Assuming the data is already fetched and you want to determine its type
function determineDataType(data: any): "financial" | "country" | "unknown" {
  if (!data || Object.keys(data).length === 0) {
    return "unknown";
  }

  // Assuming 'Country' or 'Symbol' as distinguishing properties
  if ("Country" in data) {
    return "country";
  } else if ("Symbol" in data) {
    return "financial";
  } else {
    return "unknown";
  }
}

export default determineDataType;
