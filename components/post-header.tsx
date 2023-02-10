import Date from "./date";
import CoverImage from "./cover-image";
import Categories from "./categories";

export default function PostHeader({ title, coverImage, date, categories }) {
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
    </>
  );
}
