import Head from "next/head";
import { Container } from "@/components/Container";
import { allArticles } from "contentlayer/generated";
import { trpc } from "@/utils/trpc";
import {
  Activity,
  ArrowUpDown,
  BookOpenCheck,
  Dumbbell,
  Newspaper,
  PartyPopper,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import clsx from "clsx";
import { SVGProps } from "react";
import Link from "next/link";

const Icon = ({ id, ...props }: SVGProps<SVGSVGElement>) => {
  switch (id) {
    case "1":
      return <Activity {...props} />;
    case "2":
      return <BookOpenCheck {...props} />;
    case "3":
      return <Dumbbell {...props} />;
    case "4":
      return <ArrowUpDown {...props} />;
    case "5":
      return <Newspaper {...props} />;
    default:
      return <PartyPopper {...props} />;
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
        <meta
          property="og:image"
          content={`https://msich.dev/api/og?preface=${"Matt Sichterman ‣ Metrics"}`}
        />
      </Head>
      <Container className="mt-12">
        <div>
          <h1 className="mb-8 text-2xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100 sm:text-4xl">
            Metrics for 2023
          </h1>

          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.isLoading || counts.isLoading
              ? Array.from(Array(5).keys()).map((i) => (
                  <div
                    className="relative animate-pulse overflow-hidden rounded-xl border border-neutral-100 shadow dark:border-neutral-700/40"
                    role="status"
                    key={i}
                  >
                    <div className="flex h-full w-full items-center justify-between space-x-4 p-6">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-neutral-200 dark:bg-neutral-700">
                        <div
                          className="h-6 w-6 text-neutral-100"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mx-auto w-48 space-y-2">
                        <div className="h-6 w-48 truncate rounded-md bg-neutral-200 text-lg font-medium text-neutral-500 dark:bg-neutral-700 dark:text-neutral-300" />
                        <div className="h-8 w-32 rounded-md bg-neutral-200 text-2xl font-semibold text-neutral-900 dark:bg-neutral-700 dark:text-neutral-50" />
                        <div className="flex h-4 w-16 items-baseline rounded-md bg-neutral-200 text-sm font-semibold dark:bg-neutral-700" />
                      </div>
                    </div>
                  </div>
                ))
              : metricsWithCounts?.map((metric) => {
                  let metricCount = metric.actual;
                  let hidePace = false;
                  if (metric.id === 2) {
                    // Number of Books Read
                    metricCount = 1;
                    hidePace = true;
                  } else if (metric.id === 5) {
                    // Number of Published Blog Posts
                    metricCount = allArticles.filter(
                      (a) => a.status === "PUBLISHED"
                    ).length;
                    hidePace = true;
                  }
                  return (
                    <div
                      key={metric.id}
                      className="relative overflow-hidden rounded-xl border border-neutral-100 shadow dark:border-neutral-700/40"
                    >
                      <div className="flex w-full items-center justify-between space-x-4 p-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-sky-500">
                          <Icon
                            id={metric.id.toString()}
                            className="h-6 w-6 text-neutral-100"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mx-auto min-w-[75%]">
                          <p className="truncate text-lg font-medium text-neutral-500 dark:text-neutral-300">
                            {metric.name}
                          </p>
                          <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
                            {`${metricCount} / ${metric.targetNumber}`}
                          </p>
                          {!hidePace && (
                            <p
                              className={clsx(
                                metric.currentPace > 0
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-red-600 dark:text-red-400",
                                "flex items-baseline text-sm font-semibold"
                              )}
                            >
                              {metric.currentPace > 0 ? (
                                <TrendingUp
                                  className="mr-1 h-4 w-4 flex-shrink-0 self-center text-green-500 dark:text-green-300"
                                  aria-hidden="true"
                                />
                              ) : (
                                <TrendingDown
                                  className="mr-1 h-4 w-4 flex-shrink-0 self-center text-red-500 dark:text-red-300"
                                  aria-hidden="true"
                                />
                              )}
                              <span className="sr-only">
                                {" "}
                                {metric.currentPace > 0
                                  ? "Ahead"
                                  : "Behind"} by{" "}
                              </span>
                              {`${Math.abs(metric.currentPace)}%`}
                            </p>
                          )}
                        </div>
                      </div>
                      {metric?.href && (
                        <div className="mt-4 w-full bg-neutral-100 px-4 py-4 text-sm dark:bg-neutral-800 sm:px-6">
                          <Link
                            href={metric?.href}
                            className="font-medium text-sky-600 hover:text-sky-500"
                          >
                            {" "}
                            View all
                            <span className="sr-only">
                              {" "}
                              {metric.name} stats
                            </span>
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
