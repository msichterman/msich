import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { MailPlus } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./Button";
import ResultBadge from "./ResultBadge";

export default function Newsletter({ className }: { className?: string }) {
  const FormSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
  });

  type FormSchemaType = z.infer<typeof FormSchema>;

  const defaultValues = {
    email: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
    reset,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const utils = trpc.useContext();

  const getSubscribers = trpc.newsletter.getSubscribers.useQuery();

  const subscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess() {
      reset();
      utils.newsletter.getSubscribers.invalidate();
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async ({ email }) => {
    clearErrors();
    subscribe.mutate({ email });
  };

  return null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        "rounded-2xl border border-neutral-100 p-6 dark:border-neutral-700/40",
        className
      )}
      onBlur={() => clearErrors()}
    >
      <h2 className="flex items-center text-sm font-semibold text-neutral-900 dark:text-neutral-100">
        <MailPlus className="h-5 w-5 flex-none fill-neutral-100 stroke-neutral-400 dark:fill-neutral-100/10 dark:stroke-neutral-500" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 max-w-md text-sm text-neutral-600 dark:text-neutral-400 sm:tracking-wide">
        {!getSubscribers.isError && getSubscribers?.data?.count ? (
          <>
            <span className="font-bold text-sky-600 motion-safe:animate-pulse dark:text-sky-500">
              {`Join ${getSubscribers?.data.count} others `}
            </span>
            who get notified when I publish something new, and unsubscribe at
            any time.
          </>
        ) : (
          <>
            Get notified when I publish something new, and unsubscribe at any
            time.
          </>
        )}
      </p>
      <div className="mt-6 flex">
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          id="email"
          {...register("email")}
          autoComplete="email"
          className={clsx(
            "min-w-0 flex-auto appearance-none rounded-md border bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-neutral-800/5 placeholder:text-neutral-400 focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-500/10 dark:bg-neutral-700/[0.15] dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus:border-sky-400 dark:focus:ring-sky-400/10 sm:text-sm",
            errors.email || subscribe.error
              ? "border-red-600"
              : "border-neutral-900/10 dark:border-neutral-700"
          )}
          disabled={isSubmitting || subscribe.isLoading}
        />
        <Button
          type="submit"
          className={clsx(
            "ml-4 flex-none",
            subscribe.isLoading && "animate-pulse"
          )}
          disabled={isSubmitting || subscribe.isLoading}
        >
          Join
        </Button>
      </div>
      <ResultBadge
        isError={!!errors.email || subscribe.isError}
        errorMessage={errors.email?.message || subscribe.error?.message}
        isSuccess={subscribe.isSuccess}
        successMessage={
          subscribe?.data?.email
            ? `Thanks ${subscribe.data.email}! Please verify your email.`
            : undefined
        }
        className="mt-2"
      />
    </form>
  );
}
