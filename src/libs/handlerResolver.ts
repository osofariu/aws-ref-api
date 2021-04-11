export const handlerPath = (context: string) => {
  const path =  `${context.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}`
  console.log(`Resolver for context ${context}: ${path}`)
  return path;
};
