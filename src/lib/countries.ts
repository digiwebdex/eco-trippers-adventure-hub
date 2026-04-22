// Centralised country → ISO-3166 alpha-2 map and helpers.
// Used by visa cards, the visa detail page, and any flag rendering.

export const countryCodeMap: Record<string, string> = {
  "Malaysia": "my", "Thailand": "th", "Japan": "jp", "South Korea": "kr",
  "China": "cn", "Singapore": "sg", "Indonesia": "id", "Turkey": "tr",
  "United Kingdom": "gb", "Canada": "ca", "USA": "us", "Germany": "de",
  "Spain": "es", "Netherlands": "nl", "Hong Kong": "hk", "Nepal": "np",
  "India": "in", "Australia": "au", "France": "fr", "Italy": "it",
  "Maldives": "mv", "Vietnam": "vn", "Philippines": "ph", "UAE": "ae",
  "Saudi Arabia": "sa", "Qatar": "qa", "Oman": "om", "Bahrain": "bh",
  "Egypt": "eg", "Sri Lanka": "lk", "Myanmar": "mm", "Cambodia": "kh",
  "Bhutan": "bt", "Switzerland": "ch", "Sweden": "se", "Norway": "no",
};

export function getCountryCode(name: string): string {
  return countryCodeMap[name] || name.toLowerCase().slice(0, 2);
}

export function getFlagUrl(name: string, size = 80): string {
  return `https://flagcdn.com/w${size}/${getCountryCode(name)}.png`;
}

export function findCountryByCode(rows: any[], code: string) {
  if (!code) return undefined;
  const lc = code.toLowerCase();
  return rows.find(
    (r) =>
      (r.country_code || "").toLowerCase() === lc ||
      getCountryCode(r.name).toLowerCase() === lc
  );
}