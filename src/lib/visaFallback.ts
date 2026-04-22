// Shared fallback visa countries, used when DB is empty or a country slug
// isn't in the DB. Each entry has enough fields for both the picker grid
// and the visa detail page to render.

export interface FallbackVisaCountry {
  name: string;
  flag: string;          // ISO alpha-2 (uppercase)
  country_code: string;  // lowercase alpha-2
  price: string;
  processing_time: string;
  visa_type: string;
  validity: string;
  stay_duration: string;
  entry_type: string;
  description: string;
}

const base = (
  name: string,
  code: string,
  price: string,
  processing_time: string,
  extras: Partial<FallbackVisaCountry> = {}
): FallbackVisaCountry => ({
  name,
  flag: code.toUpperCase(),
  country_code: code.toLowerCase(),
  price,
  processing_time,
  visa_type: "Tourist",
  validity: "90 days",
  stay_duration: "30 days",
  entry_type: "Single",
  description: `Apply for your ${name} visa with Eco Trippers — Bangladesh's trusted travel partner. Our experts handle complete documentation, embassy bookings and follow-up to maximise your approval chances.`,
  ...extras,
});

export const fallbackVisaCountries: FallbackVisaCountry[] = [
  base("Malaysia", "my", "5,500", "5-7 days"),
  base("Thailand", "th", "6,500", "5-7 days"),
  base("Japan", "jp", "9,500", "7-10 days", { validity: "90 days", stay_duration: "30 days" }),
  base("South Korea", "kr", "10,000", "10-15 days"),
  base("China", "cn", "12,500", "10-15 days"),
  base("Singapore", "sg", "5,500", "3-5 days"),
  base("Indonesia", "id", "4,500", "3-5 days"),
  base("Turkey", "tr", "8,000", "10-15 days"),
  base("United Kingdom", "gb", "18,000", "15-21 days", { validity: "6 months", stay_duration: "180 days" }),
  base("Canada", "ca", "20,000", "20-30 days", { validity: "10 years", stay_duration: "180 days", entry_type: "Multiple" }),
  base("USA", "us", "22,000", "Interview based", { validity: "10 years", stay_duration: "180 days", entry_type: "Multiple" }),
  base("Germany", "de", "15,000", "15-21 days", { validity: "Schengen 90 days" }),
  base("Spain", "es", "14,000", "15-21 days", { validity: "Schengen 90 days" }),
  base("Netherlands", "nl", "15,000", "15-21 days", { validity: "Schengen 90 days" }),
  base("Hong Kong", "hk", "6,000", "5-7 days"),
  base("Nepal", "np", "3,500", "3-5 days", { visa_type: "On arrival" }),
  base("Sri Lanka", "lk", "4,000", "3-5 days", { visa_type: "ETA" }),
  base("Maldives", "mv", "0", "On arrival", { visa_type: "On arrival", validity: "30 days" }),
  base("UAE", "ae", "8,000", "5-7 days"),
  base("Saudi Arabia", "sa", "12,000", "7-10 days"),
  base("Australia", "au", "25,000", "20-30 days", { validity: "1 year", entry_type: "Multiple" }),
];