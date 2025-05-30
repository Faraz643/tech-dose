import React, { useEffect, useState } from "react";

const useFetchEvents = (slug = null) => {
  // all states
  const [singleArticleDetails, setSingleArticleDetails] = useState({});
  const [allEvents, setAllEvents] = useState([]);
  const [placeholder, setPlaceholder] = useState("skeleton"); // ''

  const fetchData = async () => {
    try {
      let endpoint = `${process.env.NEXT_PUBLIC_BACKEND_API}/event`;
      //   if (slug) {
      //     endpoint = `${process.env.NEXT_PUBLIC_BACKEND_API}/event/${slug}`
      //   }
      const response = await fetch(new URL(endpoint), {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        // if (slug) {
        //   setSingleArticleDetails(data.articleData[0])
        // } else {
        setAllEvents(data);
        // }
        setPlaceholder("");
      }
    } catch (err) {
      console.log("An error occured while fetching data", err);
    } finally {
      setPlaceholder("");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return { singleArticleDetails, allEvents, placeholder, fetchData };
};

export default useFetchEvents;
