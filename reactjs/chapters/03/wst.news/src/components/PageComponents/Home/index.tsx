import Head from "next/head";
import { SubscribeButton } from "../../SubscribeButton";

import styles from "./styles.module.scss";

export function HomePageComponent() {
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
            <span>for $9.90 month</span>
          </p>

          <SubscribeButton />
        </section>

        <img src="/images/avatar.svg" alt="girl coding" />
      </main>
    </>
  );
}
