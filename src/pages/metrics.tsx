import Head from "next/head";
import { Container } from "@/components/Container";
import { allArticles } from "contentlayer/generated";
import { trpc } from "@/utils/trpc";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/20/solid";
import {
  RocketLaunchIcon,
  BookOpenIcon,
  DocumentTextIcon,
  ArrowsUpDownIcon,
  ArrowUpRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { SVGProps } from "react";
import Link from "next/link";

const Icon = ({ id, ...props }: SVGProps<SVGSVGElement>) => {
  switch (id) {
    case "1":
      return <RocketLaunchIcon {...props} />;
    case "2":
      return <BookOpenIcon {...props} />;
    case "3":
      return <ArrowsUpDownIcon {...props} />;
    case "4":
      return <ArrowUpRightIcon {...props} />;
    case "5":
      return <DocumentTextIcon {...props} />;
    default:
      return <SparklesIcon {...props} />;
  }
};

export default function Metrics() {
  const metrics = trpc.metric.getAllMetrics.useQuery();
  const counts = trpc.metric.getAllEntryCounts.useQuery();
  const metricsWithCounts =
    metrics?.data &&
    metrics.data.map((metric) => ({
      // @ts-expect-error
      ...(counts?.data && counts.data?.[metric.id]),
      ...metric,
    }));
  return (
    <>
      <Head>
        <title>Matt Sichterman - Metrics</title>
        <meta
          name="description"
          content="The metrics that are guiding me in 2023."
        />
      </Head>
      <Container className="mt-12">
        <div>
          <h1 className="mb-8 text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
            Metrics for 2023
          </h1>

          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {metricsWithCounts?.map((metric) => {
              let metricCount = metric.actual;
              if (metric.id === 2) {
                // Number of Books Read
                metricCount = 0;
              } else if (metric.id === 5) {
                // Number of Published Blog Posts
                metricCount = allArticles.filter(
                  (a) => a.status === "PUBLISHED"
                ).length;
              }
              return (
                <div
                  key={metric.id}
                  className="relative overflow-hidden rounded-xl border border-zinc-100 shadow dark:border-zinc-700/40"
                >
                  <div className="flex w-full items-center justify-between space-x-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-sky-500">
                      <Icon
                        id={metric.id.toString()}
                        className="h-6 w-6 text-zinc-100"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mx-auto min-w-[75%]">
                      <p className="truncate text-lg font-medium text-zinc-500 dark:text-zinc-300">
                        {metric.name}
                      </p>
                      <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                        {`${metricCount} / ${metric.targetNumber}`}
                      </p>
                      <p
                        className={clsx(
                          metric.currentPace > 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400",
                          "flex items-baseline text-sm font-semibold"
                        )}
                      >
                        {metric.currentPace > 0 ? (
                          <ArrowTrendingUpIcon
                            className="mr-1 h-5 w-5 flex-shrink-0 self-center text-green-500 dark:text-green-300"
                            aria-hidden="true"
                          />
                        ) : (
                          <ArrowTrendingDownIcon
                            className="mr-1 h-5 w-5 flex-shrink-0 self-center text-red-500 dark:text-red-300"
                            aria-hidden="true"
                          />
                        )}
                        <span className="sr-only">
                          {" "}
                          {metric.currentPace > 0 ? "Ahead" : "Behind"} by{" "}
                        </span>
                        {`${Math.abs(metric.currentPace)}%`}
                      </p>
                    </div>
                  </div>
                  {metric?.href && (
                    <div className="mt-4 w-full bg-zinc-100 px-4 py-4 text-sm dark:bg-zinc-800 sm:px-6">
                      <Link
                        href={metric?.href}
                        className="font-medium text-sky-600 hover:text-sky-500"
                      >
                        {" "}
                        View all
                        <span className="sr-only"> {metric.name} stats</span>
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </dl>
        </div>
      </Container>
    </>
  );
}
