// "use client";
// import { articleDetails } from "@/app/(routes)/(blog)/utils";
// import ArticleModal from "@/app/_Components/_Blog/_SingleArticle/ArticleModal";
// import { useParams } from "next/navigation";
// import { useRouter } from "next/navigation";
// import React, { Children, createContext, useContext, useEffect, useState } from "react";

// export const ArticleDetails = createContext({});

// export default function ArticleDetailsContext({ children }) {
//   const router = useRouter();
//   const [articleDetails, setArticleDetails] = useState({});
//   const [notFound, setNotFound] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const [test, setTest] = useState('hi')
//   console.log('intercept', articleDetails)
//   const params = useParams();
//   const slug = useParams().slug;
//   useEffect(() => {
//     const fetchArticle = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3001/api/article/${slug}`,
//           {
//             method: "GET",
//           }
//         );
//         if (response.ok) {
//           const result = await response.json();
//           setArticleDetails(result.articleData[0])
//         }
//         else {
//           setNotFound(true)
//         }
//       } catch (err) {
//         console.log("An error occured:", err);
//         setNotFound(true)
//       } finally {
//         setLoading(false)
//       }
//     };
//     fetchArticle();

//   }, []);


//   const onModalClose = () => {
//     router.back();
//   };

//   if (loading) {
//     return (
//       <div>Loading...</div>
//     )
//   }
//   if (notFound) {
//     return (
//       <div>Error 404 Article not found</div>
//     )
//   }

//   return (
//     <ArticleDetails.Provider value={{ articleDetails, onModalClose, test }}>
//       {children}
//     </ArticleDetails.Provider>
//   )





// };

