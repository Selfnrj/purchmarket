import Avatar from "./avatar";
import Date from "./date";
import CoverImage from "./cover-image";
import Categories from "./categories";
import Container from "./container";

export default function PostHeader({
  title,
  coverImage,
  date,
  author,
  categories,
}) {
  return (
    <>
      <div className="wp-block-cover relative flex w-full justify-items-end">
        <div className="absolute z-20 h-full w-full bg-black bg-opacity-50" />
        <CoverImage title={title} coverImage={coverImage} />
        <div className="container absolute bottom-0 z-30 mx-auto px-8 text-white">
          <Categories categories={categories} /> - <Date dateString={date} />
          <h1
            className="z-50 mb-12 text-center text-6xl font-bold leading-tight tracking-tighter text-white md:text-left md:text-7xl md:leading-none lg:text-8xl"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>
      </div>

      {/* <div className="hidden md:mb-12 md:block">
        <Avatar author={author} />
      </div> 
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 block md:hidden">
          <Avatar author={author} />
        </div>
      </div>*/}
    </>
  );
}
