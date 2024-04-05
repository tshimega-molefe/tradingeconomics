import { FC } from "react";

interface HighlightCardsProps {}

const HighlightCards: FC<HighlightCardsProps> = ({}) => {
  return (
    <div className="md:row-span-1 md:col-span-4 lg:col-span-4 bg-green-300 xl:row-span-1 xl:col-span-2">
      HighlightCards
    </div>
  );
};

export default HighlightCards;
