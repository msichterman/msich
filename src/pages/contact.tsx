import Head from "next/head";

import { Container } from "@/components/Container";
import Newsletter from "@/components/Newsletter";
import { Button } from "@/components/Button";
import SocialLinks from "@/components/SocialLinks";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { pickBy } from "@/lib/objectUtils";
import clsx from "clsx";
import { trpc } from "@/utils/trpc";
import ResultBadge from "@/components/ResultBadge";
import { Send } from "lucide-react";

export default function Contact() {
  const FormSchema = z.object({
    firstName: z.string().min(2).max(32),
    lastName: z.string().min(2).max(32),
    email: z.string().email(),
    phone: z.string().min(10).max(20).optional().or(z.literal("")),
    subject: z.string().min(2).max(120),
    message: z.string().min(2).max(500),
  });

  type FormSchemaType = z.infer<typeof FormSchema>;

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  };

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const contact = trpc.message.contactForm.useMutation({
    onSuccess() {
      reset();
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    clearErrors();
    const sanitizedData = pickBy<FormSchemaType>(
      data,
      (value) => typeof value === "string" && value.length > 0
    );
    contact.mutate(sanitizedData);
  };

  const inputStyles =
    "m-0 block w-full min-w-0 flex-auto appearance-none rounded-md border border-neutral-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-neutral-800/5 placeholder:text-neutral-400 focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-500/10 dark:border-neutral-700 dark:bg-neutral-700/[0.15] dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus:border-sky-400 dark:focus:ring-sky-400/10 sm:text-sm";
  const errorInputStyles =
    "m-0 block w-full min-w-0 flex-auto appearance-none rounded-md border bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-neutral-800/5 placeholder:text-neutral-400 focus:outline-none focus:ring-4 focus:ring-sky-500/10 dark:bg-neutral-700/[0.15] dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus:ring-sky-400/10 sm:text-sm border-red-500";
  const labelStyles =
    "block text-sm font-medium text-neutral-600 dark:text-neutral-400";
  const errorLabelStyles = "block text-sm font-medium text-red-500";

  return (
    <>
      <Head>
        <title>Contact - Matt Sichterman</title>
        <meta
          name="description"
          content="I’m Matt Sichterman. I live in Cincinnati, OH, where I develop thriving digital experiences."
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="rounded-2xl border border-neutral-100 p-6 dark:border-neutral-700/40 lg:order-first lg:row-span-2">
            <h2 className="text-md flex font-semibold text-neutral-900 dark:text-neutral-100">
              <Send className="h-6 w-6 flex-none fill-neutral-100 stroke-neutral-400 dark:fill-neutral-100/10 dark:stroke-neutral-500" />
              <span className="ml-3 font-semibold">Send me a message</span>
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
              onBlur={() => clearErrors()}
            >
              <div>
                <label
                  htmlFor="firstName"
                  className={clsx(
                    errors.firstName ? errorLabelStyles : labelStyles
                  )}
                >
                  First name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="firstName"
                    autoComplete="given-name"
                    {...register("firstName")}
                    className={clsx(
                      errors.firstName ? errorInputStyles : inputStyles
                    )}
                    disabled={isSubmitting}
                  />
                  {errors.firstName && (
                    <p
                      className={clsx(
                        errorLabelStyles,
                        "mt-1 text-xxs leading-4"
                      )}
                    >
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className={clsx(
                    errors.lastName ? errorLabelStyles : labelStyles
                  )}
                >
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName")}
                    autoComplete="family-name"
                    className={clsx(
                      errors.lastName ? errorInputStyles : inputStyles
                    )}
                    disabled={isSubmitting}
                  />
                  {errors.lastName && (
                    <p
                      className={clsx(
                        errorLabelStyles,
                        "mt-1 text-xxs leading-4"
                      )}
                    >
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className={clsx(
                    errors.email ? errorLabelStyles : labelStyles
                  )}
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register("email")}
                    className={clsx(
                      errors.email ? errorInputStyles : inputStyles
                    )}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p
                      className={clsx(
                        errorLabelStyles,
                        "mt-1 text-xxs leading-4"
                      )}
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <label
                    htmlFor="phone"
                    className={clsx(
                      errors.phone ? errorLabelStyles : labelStyles
                    )}
                  >
                    Phone
                  </label>
                  <span
                    id="phone-optional"
                    className="text-sm text-neutral-500"
                  >
                    Optional
                  </span>
                </div>
                <div className="mt-1">
                  <input
                    type="text"
                    id="phone"
                    autoComplete="tel"
                    {...register("phone")}
                    className={clsx(
                      errors.phone ? errorInputStyles : inputStyles
                    )}
                    disabled={isSubmitting}
                    aria-describedby="phone-optional"
                  />
                  {errors.phone && (
                    <p
                      className={clsx(
                        errorLabelStyles,
                        "mt-1 text-xxs leading-4"
                      )}
                    >
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="subject"
                  className={clsx(
                    errors.subject ? errorLabelStyles : labelStyles
                  )}
                >
                  Subject
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="subject"
                    {...register("subject")}
                    className={clsx(
                      errors.subject ? errorInputStyles : inputStyles
                    )}
                    disabled={isSubmitting}
                  />
                  {errors.subject && (
                    <p
                      className={clsx(
                        errorLabelStyles,
                        "mt-1 text-xxs leading-4"
                      )}
                    >
                      {errors.subject.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="flex justify-between">
                  <label
                    htmlFor="message"
                    className={clsx(
                      errors.message ? errorLabelStyles : labelStyles
                    )}
                  >
                    Message
                  </label>
                  <span id="message-max" className="text-sm text-neutral-500">
                    Max. 500 characters
                  </span>
                </div>
                <div className="mt-1">
                  <textarea
                    id="message"
                    rows={4}
                    {...register("message")}
                    className={clsx(
                      errors.message ? errorInputStyles : inputStyles
                    )}
                    aria-describedby="message-max"
                    defaultValue={""}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p
                      className={clsx(
                        errorLabelStyles,
                        "mt-1 text-xxs leading-4"
                      )}
                    >
                      {errors.message.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-end sm:col-span-2">
                <ResultBadge
                  isError={contact.isError}
                  errorMessage={contact.error?.message}
                  isSuccess={contact.isSuccess}
                  successMessage={
                    contact.data?.firstName &&
                    `Thanks ${contact.data.firstName}! I will get back to you soon.`
                  }
                  className="mr-2"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={clsx(contact.isLoading && "animate-pulse")}
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
          <div className="space-y-10 lg:pl-20">
            <SocialLinks />
            <Newsletter />
          </div>
        </div>
      </Container>
    </>
  );
}
