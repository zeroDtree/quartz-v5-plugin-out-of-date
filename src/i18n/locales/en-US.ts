export default {
  components: {
    outOfDate: {
      title: "Warning",
      staleMessage: ({ diffDays }: { diffDays: number }) =>
        `This page was last updated over ${diffDays} days ago. Content may be outdated.`,
      forceShowMessage:
        "[Test] This page may be outdated. Please verify the information is still current.",
    },
  },
};
