// AirdropForm Component Styles using Tailwind classes
// This follows Tailwind best practices while keeping styles separate

export const containerClasses = `
  max-w-2xl 
  mx-auto 
  my-5 
  p-6 
  bg-gradient-to-br 
  from-gray-900/80 
  to-gray-800/80 
  backdrop-blur-xl 
  rounded-2xl 
  border 
  border-white/10 
  shadow-2xl 
  shadow-black/50
`;

export const cardClasses = `
  mt-6 
  p-4 
  rounded-xl 
  border 
  border-white/20 
  shadow-lg 
  backdrop-blur
`;

export const cardBlueClasses = `
  ${cardClasses}
  bg-gradient-to-br 
  from-blue-500/20 
  to-purple-500/20
`;

export const cardGreenClasses = `
  ${cardClasses}
  bg-gradient-to-br 
  from-green-500/20 
  to-emerald-500/20
`;

export const cardYellowClasses = `
  ${cardClasses}
  bg-gradient-to-br 
  from-yellow-500/20 
  to-orange-500/20
`;

export const cardTitleClasses = `
  text-lg 
  font-semibold 
  text-white 
  mb-3
`;

export const gridClasses = `
  grid 
  grid-cols-1 
  md:grid-cols-3 
  gap-3
`;

export const infoBoxClasses = `
  bg-white/10 
  p-3 
  rounded-lg
`;

export const infoLabelClasses = `
  text-gray-300 
  text-sm
`;

export const infoValueClasses = `
  text-white 
  font-medium
`;

export const infoValueSmallClasses = `
  ${infoValueClasses}
  text-xs
`;

export const summaryContainerClasses = `
  flex 
  flex-col 
  gap-3
`;

export const summaryRowClasses = `
  flex 
  justify-between 
  items-center
`;

export const summaryLabelClasses = `
  text-gray-300
`;

export const summaryValueClasses = `
  text-white 
  font-bold
`;

export const summaryValueLargeClasses = `
  ${summaryValueClasses}
  text-lg
`;

export const recipientsContainerClasses = `
  bg-white/10 
  p-3 
  rounded-lg
`;

export const recipientsLabelClasses = `
  text-gray-300 
  text-sm 
  mb-2
`;

export const recipientsListClasses = `
  max-h-20 
  overflow-y-auto
`;

export const recipientItemClasses = `
  flex 
  justify-between 
  text-xs
`;

export const recipientAddressClasses = `
  text-gray-400 
  truncate
`;

export const recipientAmountClasses = `
  text-white 
  ml-2
`;

export const transactionHashClasses = `
  mb-3
`;

export const transactionHashLabelClasses = `
  text-gray-300 
  text-sm
`;

export const transactionHashValueClasses = `
  text-white 
  font-mono 
  text-xs 
  break-all
`;

export const loadingContainerClasses = `
  flex 
  items-center 
  text-yellow-400
`;

export const spinnerClasses = `
  animate-spin 
  rounded-full 
  h-4 
  w-4 
  border-b-2 
  border-yellow-400 
  mr-2
`;

export const spinnerLargeClasses = `
  animate-spin 
  rounded-full 
  h-5 
  w-5 
  border-b-2 
  border-white 
  mr-2
`;

export const statusSuccessClasses = `
  text-green-400 
  font-semibold
`;

export const statusErrorClasses = `
  text-red-400
`;

export const statusErrorLabelClasses = `
  font-semibold
`;

export const statusErrorMessageClasses = `
  text-sm 
  mt-1
`;

export const buttonClasses = `
  mt-6 
  w-full 
  bg-gradient-to-r 
  from-blue-600 
  to-purple-600 
  text-white 
  font-bold 
  py-3 
  px-6 
  rounded-xl 
  shadow-lg 
  border 
  border-white/20 
  backdrop-blur 
  transition-all 
  duration-200 
  hover:from-blue-700 
  hover:to-purple-700 
  hover:shadow-xl 
  hover:-translate-y-0.5 
  disabled:from-gray-600 
  disabled:to-gray-600 
  disabled:transform-none 
  disabled:shadow-lg
`;

export const buttonContentClasses = `
  flex 
  items-center 
  justify-center
`;