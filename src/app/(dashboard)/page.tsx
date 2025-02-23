import { ProductListContainer } from '~/features/product/components/product-list';
import { auth } from '~/server/auth';
import { api, HydrateClient } from '~/trpc/server';

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.product.findMany.prefetch();
  }

  return (
    <HydrateClient>
      <div>
        <h1>Hello</h1>
        <ProductListContainer />
      </div>
    </HydrateClient>
  );
}
