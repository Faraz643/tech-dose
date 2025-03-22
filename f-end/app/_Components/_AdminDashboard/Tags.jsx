import { text } from "@/public/assets/_index";
import { useRouter } from "next/navigation";
import React from "react";
import Cookies from "js-cookie";
const Tags = ({
  backgC,
  textC,
  actionText,
  slug,
  renderOnDelete,
  thumbnail,
  category,
  eventId,
}) => {
  const router = useRouter();
  const bgColor = backgC;
  const textColor = textC;
  const action = actionText;
  async function handleDelete() {
    const token = Cookies.get("token");
    let dynamicRoute
    if (category === "article") {
      dynamicRoute = `/artilce/${slug}`;
    } else if (category === "event") {
       dynamicRoute = `/event/${eventId}`;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}${dynamicRoute}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ thumbnailPath: thumbnail }),
      }
    );
    renderOnDelete((prev) => !prev);

    // if (response.status === 204) {
    //   const data = await response.json();
    //   console.log(data);
    // }
  }
  function handleUpdate() {
    if (category === "article") {
      router.push(`/admin/edit-article?slug=${slug}`);
    } else if (category === "event") {
      router.push(`/admin/edit-event?eventId=${eventId}`);
      // console.log(eventId)
    }
  }

  return (
    <div
      className="flex items-center gap-1 justify-center px-2 rounded-[100px] text-center mt-2 hover:cursor-pointer"
      style={{
        backgroundColor: `${bgColor}`,
        color: `${textColor}`,
        border: `1px solid ${textColor}`,
      }}
      onClick={
        action === "Delete"
          ? handleDelete
          : action === "Update"
            ? handleUpdate
            : undefined
      }
    >
      <span>{action}</span>
      <span className="" style={{ color: `${textColor}` }}>
        •
      </span>
    </div>
  );
};

export default Tags;
