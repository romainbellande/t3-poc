import { ProductListContainer } from '~/features/product/components/product-list';
import { ProductFormContainer } from '~/features/product/components/product-form';
import { auth } from '~/server/auth';
import { api, HydrateClient } from '~/trpc/server';

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.product.findMany.prefetch();
  }

  return (
    <HydrateClient>
      <div className="flex flex-col gap-4">
        <ProductListContainer />
        <ProductFormContainer />
      </div>
    </HydrateClient>
  );
}
