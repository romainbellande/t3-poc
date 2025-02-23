'use client';
import { useForm } from 'react-hook-form';
import { Form } from '~/components/ui/form';
import { InputField } from '~/components/form/input-field';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProductSchema } from '../product.zod';
import type { z } from 'zod';
import { Button } from '~/components/ui/button';
import { api } from '~/trpc/react';
import { useEffect } from 'react';
interface ProductFormProps {
  onSubmit: (data: z.infer<typeof createProductSchema>) => void;
  isSuccess?: boolean;
}

export function ProductForm({ onSubmit, isSuccess }: ProductFormProps) {
  const form = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      form.reset();
    }
  }, [isSuccess, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <InputField name="name" label="Name" />
        <InputField name="description" label="Description" />
        <InputField type="number" name="price" label="Price" />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}

export function ProductFormContainer() {
  const utils = api.useUtils();

  const { mutate: createProduct, isSuccess } = api.product.create.useMutation({
    async onSuccess() {
      await utils.product.findMany.invalidate();
    },
  });

  return <ProductForm onSubmit={createProduct} isSuccess={isSuccess} />;
}
