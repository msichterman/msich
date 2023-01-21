import { Entry, Metric } from "@prisma/client";
import { t } from "../trpc";

export type MetricWithEntries = Metric & { entries: Entry[] };
export const metricRouter = t.router({
  getAllMetrics: t.procedure.query(async ({ ctx }) => {
    const findManyAccount: MetricWithEntries[] =
      await ctx.prisma.metric.findMany({
        include: {
          entries: true,
        },
      });
    return findManyAccount;
  }),
  getAllEntryCounts: t.procedure.query(async ({ ctx }) => {
    const [milesWalked, pagesRead, pushUps, sitUps, blogPosts] =
      await ctx.prisma.$transaction([
        ctx.prisma.entry.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            metricId: 1,
          },
        }),
        ctx.prisma.entry.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            metricId: 2,
          },
        }),
        ctx.prisma.entry.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            metricId: 3,
          },
        }),
        ctx.prisma.entry.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            metricId: 4,
          },
        }),
        ctx.prisma.entry.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            metricId: 5,
          },
        }),
      ]);

    const now = new Date();
    const dayNum =
      (Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) -
        Date.UTC(now.getFullYear(), 0, 0)) /
      24 /
      60 /
      60 /
      1000;
    const totalDays = 365.0;

    return {
      1: {
        actual: milesWalked._sum.amount?.toFixed(2),
        expected: parseFloat(((1000 / totalDays) * dayNum).toFixed(2)),
        currentPace: parseFloat(
          (
            (((milesWalked._sum.amount || 0) -
              parseFloat(((1000 / totalDays) * dayNum).toFixed(2))) /
              (((milesWalked._sum.amount || 0) +
                parseFloat(((1000 / totalDays) * dayNum).toFixed(2))) /
                2)) *
            100
          ).toFixed(2)
        ),
      },
      2: {
        actual: pagesRead._sum.amount,
        expected: Math.ceil((9125 / totalDays) * dayNum),
        currentPace: parseFloat(
          (
            (((pagesRead._sum.amount || 0) -
              parseFloat(((9125 / totalDays) * dayNum).toFixed(2))) /
              (((pagesRead._sum.amount || 0) +
                parseFloat(((9125 / totalDays) * dayNum).toFixed(2))) /
                2)) *
            100
          ).toFixed(2)
        ),
      },
      3: {
        actual: pushUps._sum.amount,
        expected: Math.ceil((20000 / totalDays) * dayNum),
        currentPace: parseFloat(
          (
            (((pushUps._sum.amount || 0) -
              parseFloat(((20000 / totalDays) * dayNum).toFixed(2))) /
              (((pushUps._sum.amount || 0) +
                parseFloat(((20000 / totalDays) * dayNum).toFixed(2))) /
                2)) *
            100
          ).toFixed(2)
        ),
      },
      4: {
        actual: sitUps._sum.amount,
        expected: Math.ceil((20000 / totalDays) * dayNum),
        currentPace: parseFloat(
          (
            (((sitUps._sum.amount || 0) -
              parseFloat(((20000 / totalDays) * dayNum).toFixed(2))) /
              (((sitUps._sum.amount || 0) +
                parseFloat(((20000 / totalDays) * dayNum).toFixed(2))) /
                2)) *
            100
          ).toFixed(2)
        ),
      },
      5: {
        actual: blogPosts._sum.amount || 0,
        expected: Math.ceil((100 / totalDays) * dayNum),
        currentPace: parseFloat(
          (
            (((blogPosts._sum.amount || 0) -
              parseFloat(((1000 / totalDays) * dayNum).toFixed(2))) /
              (((blogPosts._sum.amount || 0) +
                parseFloat(((1000 / totalDays) * dayNum).toFixed(2))) /
                2)) *
            100
          ).toFixed(2)
        ),
      },
    };
  }),
});
