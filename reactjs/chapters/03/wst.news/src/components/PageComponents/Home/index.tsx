import Head from "next/head";
import Image from "next/image";
import { Product } from "../../../pages";

import { SubscribeButton } from "../../SubscribeButton";

import styles from "./styles.module.scss";

interface HomePageComponentProps {
  product: Product;
}

export function HomePageComponent({ product }: HomePageComponentProps) {
  return (
    <>
      <Head>
        <title>Home | wst.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, Welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.priceAmount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <Image
          src="/images/avatar.svg"
          alt="girl coding"
          width={450}
          height={450}
        />
      </main>
    </>
  );
}
