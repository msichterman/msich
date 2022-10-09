import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { SVGProps } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./Button";
import ResultBadge from "./ResultBadge";

function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  );
}

export default function Newsletter({ className }: { className?: string }) {
  const FormSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
  });

  type FormSchemaType = z.infer<typeof FormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const utils = trpc.useContext();

  const getSubscribers = trpc.newsletter.getSubscribers.useQuery();

  const subscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess() {
      utils.newsletter.getSubscribers.invalidate();
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async ({ email }, e) => {
    clearErrors();
    subscribe.mutate({ email });
    if (subscribe.isSuccess) {
      e?.target.reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        "rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40",
        className
      )}
      onBlur={() => clearErrors()}
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {!getSubscribers.isError && getSubscribers?.data?.count ? (
          <>
            <span className="font-bold text-sky-600 motion-safe:animate-pulse dark:text-sky-500">
              {`Join ${getSubscribers.data.count} others `}
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
            "min-w-0 flex-auto appearance-none rounded-md border bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-500/10 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-sky-400 dark:focus:ring-sky-400/10 sm:text-sm",
            errors.email || subscribe.error
              ? "border-red-600"
              : "border-zinc-900/10 dark:border-zinc-700"
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
        isError={!!errors.email || subscribe.isError || !!subscribe.data?.error}
        errorMessage={
          errors.email?.message ||
          subscribe.error?.message ||
          subscribe.data?.error
        }
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
