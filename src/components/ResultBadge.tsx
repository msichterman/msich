import clsx from "clsx";
import React from "react";

type ResultBadgeProps = {
  isError?: boolean;
  errorStyles?: string;
  errorMessage?: string;
  isSuccess?: boolean;
  successStyles?: string;
  successMessage?: string;
  className?: string;
};

export default function ResultBadge({
  isError = false,
  errorStyles = "flex items-center justify-center min-w-0 w-full appearance-none rounded-md border border-red-600 bg-red-200 px-2 py-1 text-center text-xxs text-red-700 shadow-md shadow-zinc-800/5 dark:bg-red-800 dark:text-red-50",
  errorMessage = "An error occurred.",
  isSuccess = false,
  successStyles = "flex items-center justify-center min-w-0 w-full appearance-none rounded-md border border-green-600 bg-green-200 px-2 py-1 text-center text-xxs text-green-700 shadow-md shadow-zinc-800/5 dark:bg-green-800 dark:text-green-50",
  successMessage = "Success!",
  className,
}: ResultBadgeProps) {
  if (!(isError || isSuccess)) return null;

  return isError ? (
    <p className={clsx(errorStyles, className)}>{errorMessage}</p>
  ) : (
    <p className={clsx(successStyles, className)}>{successMessage}</p>
  );
}
