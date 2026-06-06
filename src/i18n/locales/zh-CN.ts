export default {
  components: {
    outOfDate: {
      title: "警告",
      staleMessage: ({ diffDays }: { diffDays: number }) =>
        `本文最后更新已超过 ${diffDays} 天。内容可能已经过时，请注意参考时效性。`,
      forceShowMessage: "【测试】本文最后更新可能已过时，请注意参考时效性。",
    },
  },
};
