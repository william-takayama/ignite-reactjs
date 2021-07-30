import Image from "next/image";
import { PageComponent } from "..";
import { Product } from "../../../pages";
import { SubscribeButton } from "../../SubscribeButton";
import styles from "./styles.module.scss";

interface HomePageComponentProps {
  product: Product;
}

export function HomePageComponent({ product }: HomePageComponentProps) {
  return (
    <PageComponent
      mainClassName={styles.contentContainer}
      seo={{
        title: "Home | wst.news",
        description: "homepage",
      }}
    >
      <>
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
      </>
    </PageComponent>
  );
}
