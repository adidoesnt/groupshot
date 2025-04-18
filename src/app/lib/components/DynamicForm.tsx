"use client";

import { z, ZodTypeAny, ZodObject, ZodRawShape } from "zod";
import { useForm, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { camelCaseToWords } from "@/app/lib/utils/string";
import { useCallback, useMemo, useState } from "react";
import { HidePasswordIcon } from "@/app/lib/icons/HidePassword";
import { ShowPasswordIcon } from "@/app/lib/icons/ShowPassword";
import BackIcon from "@/app/lib/icons/BackArrow";

enum InputType {
  TEXT = "text",
  EMAIL = "email",
  NUMBER = "number",
  CHECKBOX = "checkbox",
  DATE = "date",
  PASSWORD = "password",
}

type DynamicFormProps<T extends ZodRawShape> = {
  title: string;
  schema: ZodObject<T>;
  primaryAction: {
    text: string;
    onClick: (data: z.infer<ZodObject<T>>) => Promise<void>;
  };
  secondaryAction?: {
    text: string;
    onClick: () => void;
  };
  backFunction?: () => void;
};

export default function DynamicForm<T extends ZodRawShape>({
  title,
  schema,
  primaryAction,
  secondaryAction,
  backFunction,
}: DynamicFormProps<T>) {
  type FormData = z.infer<ZodObject<T>>;
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(async (data: FormData) => {
    try {
      await primaryAction.onClick(data);
    } catch (e) {
      const error = e as Error;
      setError("root", { message: error.message });
    }
  }, [primaryAction, setError]);

  const isPasswordField = useCallback((fieldKey: string) => {
    return fieldKey.toLowerCase().includes("password");
  }, []);

  const fields = Object.entries(schema.shape) as [keyof FormData, ZodTypeAny][];

  const isSubmitDisabled = useMemo(() => {
    return Object.values(errors).some((error) => error !== undefined);
  }, [errors]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        {backFunction && (
          <button type="button" onClick={backFunction}>
            <BackIcon className="w-4 h-4" />
          </button>
        )}
        <h1 className="text-2xl font-bold font-mono">{title}</h1>
      </div>
      <hr className="w-full border-2" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {fields.map(([key, value]) => {
          const fieldType = value._type;
          const fieldKey = key as string;

          let inputType = InputType.TEXT;
          switch (fieldType) {
            case "string":
              inputType = InputType.TEXT;
              break;
            case "number":
              inputType = InputType.NUMBER;
              break;
            default:
              inputType = InputType.TEXT;
          }

          if (isPasswordField(fieldKey)) {
            inputType = InputType.PASSWORD;
          }

          return (
            <div className="flex flex-col gap-2 font-sans" key={fieldKey}>
              <div className="flex items-end gap-4 border-b-[1px] border-gray-300 focus-within:border-black transition-all duration-200">
                <label
                  className="text-md font-medium font-mono"
                  htmlFor={fieldKey}
                >
                  {camelCaseToWords(fieldKey)}
                </label>
                <div className="flex-1 flex items-end">
                  <input
                    className="outline-none bg-transparent border-0 w-full"
                    type={
                      inputType === InputType.PASSWORD && !showPassword
                        ? "password"
                        : "text"
                    }
                    {...register(key as Path<FormData>)}
                  />
                  {inputType === InputType.PASSWORD && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-500 hover:text-black transition-colors flex items-center justify-center h-full"
                    >
                      {showPassword ? (
                        <HidePasswordIcon className="w-6 h-6" />
                      ) : (
                        <ShowPasswordIcon className="w-6 h-6" />
                      )}
                    </button>
                  )}
                </div>
              </div>
              {errors[key] && (
                <span className="text-error text-sm font-mono">
                  {errors[key]?.message as string}
                </span>
              )}
            </div>
          );
        })}
        {errors.root && (
          <span className="text-error text-sm font-mono">
            {errors.root?.message as string}
          </span>
        )}
        <div className="flex gap-2">
          {secondaryAction && (
            <button
              type="button"
              onClick={secondaryAction.onClick}
              className="hover:border-b-[1px] hover:opacity-70 border-foreground text-foreground p-2 w-full transition-all duration-200 text-nowrap"
            >
              {secondaryAction.text}
            </button>
          )}
          <button
            type="submit"
            className="hover:border-b-[1px] hover:opacity-70 border-primary-action text-primary-action p-2 w-full transition-all duration-200 disabled:opacity-50 disabled:border-none disabled:cursor-not-allowed disabled:text-gray-400 text-nowrap"
            disabled={isSubmitDisabled}
          >
            {primaryAction.text}
          </button>
        </div>
      </form>
    </div>
  );
}
