import { articleDetails } from "@/app/(routes)/(blog)/utils";
import ArticleModal from "@/app/_Components/_Blog/_SingleArticle/ArticleModal";
import {ArticleDetailsContext} from "@/app/_Components/_Blog/_BlogPage/InterceptionContext";

const Page = () => {
  return (
    <ArticleDetailsContext>
      <ArticleModal />
    </ArticleDetailsContext>
  );
};

export default Page;
