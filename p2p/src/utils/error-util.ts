export const errorParser = (error: any): ParsedError => {
  console.log(error)
  const match = error?.stack?.match(/\/(.*):\d+:\d+\)/);
  return {
    ...error,
    ...(match && {
      filePath: new Error(error).stack.split("\n")[1],
      filePaths: match,
    }),
  };
};
interface ParsedError extends Error {
  filePath: string;
  filePaths: string[];
}
