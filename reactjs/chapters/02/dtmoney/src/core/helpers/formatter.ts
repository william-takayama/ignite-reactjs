type Formatter = {
  price: (args: PriceProps) => string;
  date: (args: DateProps) => string;
  timeZone: () => string;
};

interface PriceProps {
  value: number;
  locales?: string;
  currency?: string;
}

interface DateProps {
  value: Date;
  locales?: string;
}

export const formatter: Formatter = {
  price({ value, locales = "en-US", currency = "USD" }: PriceProps) {
    return Intl.NumberFormat(locales, {
      style: "currency",
      currency,
    }).format(value);
  },
  date({ value, locales = "en-US" }: DateProps) {
    return Intl.DateTimeFormat(locales).format(value);
  },
  timeZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  },
};
