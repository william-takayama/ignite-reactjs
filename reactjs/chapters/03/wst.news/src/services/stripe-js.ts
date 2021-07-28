import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_API_KEY == null) {
  throw new Error("NEXT_PUBLIC_STRIPE_API_KEY is missing");
}

export async function getStripeJs() {
  const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY!);

  return stripeJs;
}
