import { GetStaticProps } from "next";
import { HomePageComponent } from "../components/PageComponents/Home";
import { stripe } from "../services/stripe";

export declare type Product = {
  priceId: string;
  priceAmount: number;
};
export interface HomeProps {
  product: Product;
}

export default function Home({ product }: HomeProps) {
  return <HomePageComponent product={product} />;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const price = await stripe.prices.retrieve("price_1JGnB2DTe91J19Ucatta5YkA", {
    expand: ["product"],
  });

  const product = {
    priceId: price.id,
    priceAmount: price.unit_amount
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price.unit_amount / 100)
      : 0,
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
