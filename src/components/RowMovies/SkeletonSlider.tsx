const elements: number[] = Array.from(Array(20).keys());

const SkeletonSlider: React.FC<{ main?: boolean }> = ({ main }) => {
  return (
    <div className={`w-full flex ${main ? 'items-center' : 'mt-8 flex-start'}`}>
      {elements.map((element) => (
        <div
          className={`p-1 sm:p-2 shrink-0 ${
            main ? 'w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6 xl:w-[12.5%] 2xl:w-[10%]' : 'w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6'
          }`}
          key={element}
        >
          <div className={`${main ? 'aspect-[6/9]' : 'aspect-video'} bg-gray-700`} />
        </div>
      ))}
    </div>
  );
};

export default SkeletonSlider;
