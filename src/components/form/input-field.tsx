import { useMemo, type ComponentProps } from 'react';
import {
  type FieldPath,
  type FieldValues,
  type PathValue,
  useController,
  useFormContext,
} from 'react-hook-form';
import { Input } from '~/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { cn } from '~/lib/utils';

export interface InputFieldProps<T extends FieldValues, TName extends FieldPath<T> = FieldPath<T>> {
  label: string;
  name: TName;
  defaultValue?: PathValue<T, TName> & (string | undefined);
}

export function InputField<
  T extends FieldValues = FieldValues,
  TName extends FieldPath<T> = FieldPath<T>,
>({
  name,
  label,
  color,
  defaultValue,
  ...rest
}: InputFieldProps<T, TName> & ComponentProps<typeof Input>) {
  const { control } = useFormContext<T>();
  const { field, fieldState } = useController({ name, control, defaultValue });

  const errorMessage = useMemo(() => fieldState.error?.message, [fieldState]);

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <div className="form-control w-full max-w-xs space-y-2">
            {label && (
              <FormLabel className={cn('flex space-x-1', { required: rest.required })}>
                <div className="inline-block first-letter:uppercase">{label}</div>
              </FormLabel>
            )}
            <FormControl>
              <Input {...rest} {...field} color={errorMessage ? 'error' : color} />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
