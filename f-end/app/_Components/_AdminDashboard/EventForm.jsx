"use client";
import { slug, text, calendar } from "@/public/assets/_index";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Tags from "../_AdminDashboard/Tags";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  redirect,
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Cookies from "js-cookie";
import { JsonWebTokenError } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";
import UploadingAnimation from "../_AdminDashboard/UploadingAnimation";
import UploadedAnimation from "../_AdminDashboard/UploadedAnimation";

const EventForm = ({ formMode }) => {
  // states
  const [slugStatus, setSlugStatus] = useState(""); // 'generated || 'generating'
  const [thumbnailFile, setThumbnailFile] = useState("");
  const [articleData, setArticleData] = useState({
    thumbnail: "",
    eventName: "",
    eventDetails: "",
    slug: "",
    eventStartTime: "",
    eventEndTime: "",
    eventDate: "",
    eventVenue: "",
    eventStatus: "",
  });
  const [dataURL, setDataURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isDisabledButton, setIsButtonDisabled] = useState(false);
  const [existingThumbnailFileName, setExistingThumbnailFileName] =
    useState("");
  const [existingSlug, setExistingSlug] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const querySlug = searchParams.get("eventId");
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      changeSlug();
    }, 900);
    // Cleanup function to clear the timeout if component unmounts or if name changes again
    return () => clearTimeout(timeoutId);
  }, [articleData.eventName]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/event/${querySlug}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          const fetchedData = data[0];
          console.log(data[0])
          setArticleData({
            ...articleData,
            eventName: fetchedData.name,
            eventDetails: fetchedData.description,
            eventEndTime: fetchedData.end_time,
            eventStartTime: fetchedData.start_time,
            eventVenue: fetchedData.location,
            eventStatus: fetchedData.status,
            eventDate: fetchedData.event_date,
            // slug: fetchedData.slug,
            thumbnail: fetchedData.thumbnail,
          });
          setExistingSlug(fetchedData.slug);
          setExistingThumbnailFileName(fetchedData.thumbnail);
        } else {
          router.replace("/admin/dashboard");
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (formMode === "add") {
      return;
    } else if ((formMode = "edit" && querySlug)) {
      fetchArticle();
    } else if ((formMode = "edit" && !querySlug)) {
      router.replace("/admin/dashboard");
    }
    // if (formMode = 'edit' && querySlug) {
    //     fetchArticle()
    // } else if (formMode = 'add') {
    //     return;
    // }
    else {
      router.push("/admin/dashboard");
    }
  }, [querySlug]);

  function handleInput(e) {
    const { name, value } = e.target;
    setArticleData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "eventName" && value.trim() != "") {
      setSlugStatus("generating");
    }
    console.log(articleData);
  }

  function changeSlug() {
    articleData.eventName.trim() != ""
      ? setSlugStatus("generated")
      : setSlugStatus("");
    const slugValue = articleData.eventName.split(" ").join("-");
    setArticleData({ ...articleData, slug: slugValue });
  }

  // handle file drag and drop
  function uploadImage() {
    const imgFile = document.getElementById("event-thumbnail").files[0];
    let imgLink = URL.createObjectURL(imgFile);
    setThumbnailFile(imgLink);
    const fileReader = new FileReader();
    fileReader.onLoad = function () {
      const imgData = fileReader.result;
      // const blob = new Blob([fileReader.result], { type: imgFile.type })
      setArticleData({ ...articleData, thumbnail: imgData });
      // showImage()
    };
    fileReader.readAsArrayBuffer(
      document.getElementById("event-thumbnail").files[0]
    );
    document.getElementById("thumbail-view").textContent = "";
    document.getElementById("drop-area").style.border = "0";
  }

  function handleDrop(e) {
    e.preventDefault();
    document.getElementById("event-thumbnail").files = e.dataTransfer.files;
    uploadImage();
  }

  function borderActive(e) {
    e.stopPropagation();
    e.preventDefault();
    // Apply styles or perform actions on the clicked element
    e.currentTarget.style.border = "3px solid #7262ec";
    // Search for and focus on the input element
    const inputElement = e.currentTarget.querySelector("input");
    if (inputElement) {
      inputElement.focus();
    }
  }

  function borderInActive(e) {
    e.stopPropagation();
    e.preventDefault();
    e.currentTarget.style.border = "3px solid rgb(108, 108, 108)";
    const inputElement = e.currentTarget.querySelector(".input-area");
    if (inputElement) {
      inputElement.blur();
    }
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    const formData = e["target"];
    // get form values
    const validateThumbnail = formData["event-thumbnail"].files[0];
    // console.log(formData["event-thumbnail"].files[0]);
    const validateName = formData["event-name"].value;
    const validateDetails = formData["event-details"].value;

    // start date input
    const validateStartTime = formData["start-time"].value;
    // end date input
    const validateEndTime = formData["end-time"].value;
    // date input
    const validateDate = formData["event-date"].value;
    // venue input
    const validateVenue = formData["event-venue"].value;
    // event status
    const validateStatus = formData["event-status"].value;

    // warning messages for validations
    const warnThumbnail = "Please add a thumbnail for article";
    const warnname = "Please add event name";
    const warnDesc = "Please add event details";
    const warnStartTime = "Please add event start time";
    const warnEndTime = "Please add event end time";
    const warnDate = "Please add event date";
    const warnVenue = "Please add event venue";
    const warnStatus = "Please add event current status";
    // function to show warning
    function notify(message, id) {
      toast.warn(message, {
        toastId: id,
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
    // show warning logic
    const showWarning =
      !validateThumbnail && formMode === "add"
        ? notify(warnThumbnail, 1)
        : validateName.trim() === ""
          ? notify(warnname, 2)
          : validateDetails.trim() === ""
            ? notify(warnDesc, 3)
            : validateStartTime.trim() === ""
              ? notify(warnStartTime, 4)
              : validateEndTime.trim() === ""
                ? notify(warnEndTime, 5)
                : validateDate.trim() === ""
                  ? notify(warnDate, 6)
                  : validateVenue.trim() === ""
                    ? notify(warnVenue, 7)
                    : validateStatus.trim() === ""
                      ? notify(warnStatus, 8)
                      : publishArticle(
                          validateThumbnail,
                          validateName,
                          validateDetails,
                          validateStartTime,
                          validateEndTime,
                          validateDate,
                          validateVenue,
                          validateStatus
                        );
    showWarning; // function for submitting form if no validation error
  }

  function clearFormData() {
    if (formMode === "edit") {
      router.replace("/admin/dashboard");
    }
    setArticleData({
      thumbnail: "",
      eventName: "",
      eventDetails: "",
      slug: "",
      eventStartTime: "",
      eventEndTime: "",
      eventDate: "",
      eventVenue: "",
    });
    setThumbnailFile("");
    document.getElementById("thumbail-view").innerHTML =
      `<h1 class='text-xl'>Drag and Drop here</h1>
        <span class='span-line text-center'>OR</span>
        <h1 class='text-[#7262EC] text-xl'>Browse Files</h1>`;
    document.getElementById("drop-area").style.border = "initial";
  }

  function formatDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${day} ${month} ${hours}:${minutes}:${seconds}`;
  }

  async function publishArticle(
    thumbnail,
    name,
    details,
    eventStartTime,
    eventEndTime,
    eventDate,
    eventVenue,
    validateStatus
  ) {
    const SECRET_KEY = new TextEncoder().encode(
      process.env.NEXT_PUBLIC_SECRET_KEY
    );

    const token = Cookies.get("token");
    try {
      setIsButtonDisabled(true);
      setIsUploading(true);
      const userDetails = (await jwtVerify(token, SECRET_KEY)).payload;
      const formData = new FormData();
      const dateTime = formatDate();
      // console.log('this is thumbnail from publishArticle function', thumbnail)
      // Getting full month name (e.g. "September")
      const today = new Date();
      const month = today.toLocaleString("default", { month: "long" });
      const year = today.getFullYear();
      const slug =
        formMode === "edit"
          ? existingSlug
          : articleData.slug + "-" + Date.now();
      thumbnailFile && formData.append("thumbnail", thumbnail);
      formData.append("name", name);
      formData.append("description", details);
      //   formData.append("slug", slug);
      //   formData.append("dateTime", dateTime);
      //   formData.append("authorName", userDetails.userName);
      formData.append("startTime", eventStartTime);
      formData.append("endTime", eventEndTime);
      formData.append("location", eventVenue);
      formData.append("status", validateStatus);
      formData.append("eventDate", eventDate);
      formData.append("existingThumbnailFileName", existingThumbnailFileName);
      !querySlug && formData.append("month", month);
      !querySlug && formData.append("year", year);
      // Add article -api
      const prefixAPi = `${process.env.NEXT_PUBLIC_BACKEND_API}/event`;
      const api = querySlug ? prefixAPi + `/${querySlug}` : prefixAPi;
      const methodIs = querySlug ? "PUT" : "POST";
      const response = await fetch(api, {
        method: methodIs,
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
        body: formData,
      });

      // Handle non-2xx status codes:
      if (!response.ok) {
        setIsUploading(false);
        setIsButtonDisabled(false);
        const errorData = await response.json();
        throw new Error(
          `API error: ${response.status} - ${errorData.message || "Unknown error"}`
        );
      } else {
        setIsButtonDisabled(false);
        setIsUploading(false);
        setIsUploaded(true);
        setTimeout(() => {
          setIsUploaded(false);
        }, 3000);
        clearFormData();
        document.getElementById("event-thumbnail").value = "";
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  }

  return (
    <div className="my-1">
      <form
        id="article-form"
        autoComplete="off"
        method="post"
        onSubmit={handleSubmitForm}
        encType="multipart/form-data"
      >
        <div className="flex flex-wrap justify-center gap-10 items-center ">
          {/* file input */}
          <div className="flex flex-col gap-1">
            <span>Banner Image</span>
            <label
              id="drop-area"
              htmlFor="event-thumbnail"
              className={`thumbnail-label w-[500px] h-[190px] max-[520px]:w-[300px]  bg-blur !border-dashed !border-[#7262EC] ${formMode === "edit" && "!border-[0]"} flex justify-center items-center cursor-pointer rounded-[20px]`}
              onDragOver={(e) => e.preventDefault()}
              onDropCapture={handleDrop}
              onLoad={!thumbnailFile}
            >
              <input
                type="file"
                id="event-thumbnail"
                accept="image/*"
                multiple={false}
                hidden
                onChange={uploadImage}
              />
              {/* show selected file area*/}
              {/* <div id='thumbail-view' className='w-[100%] h-[90%] text-center flex flex-col gap-6' style={{ backgroundImage: `url(${formMode === 'add' ? thumbnailFile : `${process.env.NEXT_PUBLIC_BACKEND_API}/article/img/${articleData.thumbnail}`})` }}> */}
              <div
                id="thumbail-view"
                className="w-[100%] h-[90%] text-center flex flex-col gap-6"
                style={{
                  backgroundImage: `url(${thumbnailFile ? thumbnailFile : articleData.thumbnail})`,
                }}
              >
                {formMode === "add" && (
                  <>
                    <h1 className="text-xl">Drag and Drop here</h1>
                    <span className="span-line text-center">OR</span>
                    <h1 className="text-[#7262EC] text-xl">Browse Files</h1>
                  </>
                )}
              </div>
            </label>
          </div>
          <div className="flex flex-col gap-10 w-full">
            {/* Event Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="event-name">Name of the Event</label>
              <div
                className="ac-t flex input-text"
                onClick={borderActive}
                onBlur={borderInActive}
              >
                <Image src={text} width={30} alt="name" />
                <input
                  type="text"
                  name="eventName"
                  id="event-name"
                  placeholder="Hack-a-Thon 2.0"
                  value={articleData.eventName}
                  onChange={handleInput}
                />
              </div>
            </div>
            {/* slug */}
            {/* <div className="flex flex-col gap-1">
              <div className="flex justify-between items-end">
                <label htmlFor="article-slug">Slug</label>
                {/* slug generated tag -- /*}
                <div className="auto-gen-tag">
                  {slugStatus === "generated" ? (
                    <Tags
                      backgC="#B1FAB0"
                      textC="#03D100"
                      actionText="Auto-Generated"
                    />
                  ) : slugStatus === "generating" ? (
                    <Tags
                      backgC="#FFD99F"
                      textC="#D47800"
                      actionText="Generating Slug..."
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div
                className="ac-s flex input-text"
                onClick={borderActive}
                onBlur={borderInActive}
              >
                <Image
                  src={slug}
                  width={30}
                  htmlFor="event-slug"
                  alt="auto generated slug"
                />
                <input
                  onChange={handleInput}
                  type="text"
                  name="slug"
                  readOnly
                  id="event-slug"
                  value={articleData.slug}
                  contentEditable={false}
                  className="hover:cursor-default"
                />
              </div>
            </div> */}
          </div>
        </div>
        {/* description */}
        <div className="mt-5">
          <label htmlFor="event-details">Details of the Event</label>
          <div
            className="ac-t flex input-text"
            onClick={borderActive}
            onBlur={borderInActive}
          >
            <div>
              <Image src={text} width={30} alt="name" />
            </div>
            <textarea
              onChange={handleInput}
              name="eventDetails"
              id="event-details"
              rows="5"
              value={articleData.eventDetails}
            />
          </div>
        </div>
        <div className="flex gap-10 flex-wrap">
          {/* Start time */}
          <div className="flex flex-col gap-1 mt-5">
            <label htmlFor="start-time">Start Time</label>
            <div
              className="ac-t flex input-text"
              onClick={borderActive}
              onBlur={borderInActive}
            >
              {/* <Image src={clock} width={10} height={20} alt="name" /> */}
              <input
                type="time"
                name="eventStartTime"
                id="start-time"
                placeholder="Meta to reveal its plan"
                value={articleData.eventStartTime}
                onChange={handleInput}
              />
            </div>
          </div>
          {/* End time */}
          <div className="flex flex-col gap-1 mt-5">
            <label htmlFor="end-time">End Time</label>
            <div
              className="ac-t flex input-text"
              onClick={borderActive}
              onBlur={borderInActive}
            >
              {/* <Image src={text} width={30} alt="name" /> */}
              <input
                type="time"
                name="eventEndTime"
                id="end-time"
                placeholder="Meta to reveal its plan"
                value={articleData.eventEndTime}
                onChange={handleInput}
              />
            </div>
          </div>
          {/* Date */}
          <div className="flex flex-col gap-1 mt-5">
            <label htmlFor="event-date">Date of Event</label>
            <div
              className="ac-t flex input-text"
              onClick={borderActive}
              onBlur={borderInActive}
            >
              {/* <Image src={calendar} width={30} alt="name" /> */}
              <input
                type="date"
                name="eventDate"
                id="event-date"
                placeholder="Meta to reveal its plan"
                value={articleData.eventDate}
                onChange={handleInput}
              />
            </div>
          </div>
          {/* Event venue */}
          <div className="flex flex-col gap-1 mt-5">
            <label htmlFor="event-venue">Venue</label>
            <div
              className="ac-t flex input-text"
              onClick={borderActive}
              onBlur={borderInActive}
            >
              <Image src={text} width={30} alt="name" />
              <input
                type="text"
                name="eventVenue"
                id="event-venue"
                placeholder="Central Auditorium"
                value={articleData.eventVenue}
                onChange={handleInput}
              />
            </div>
          </div>
          {/* Event status */}
          <div className="flex flex-col gap-1 mt-5">
            <label htmlFor="event-status">Event Status</label>
            <select
              name="eventStatus"
              id="event-status"
              className="bg-[transparent] input-text"
              value={articleData.eventStatus}
              onChange={handleInput}
            >
              <option value="Upcoming" className="p-1">
                Upcoming
              </option>
              <option value="Live" className="p-1">
                Live
              </option>
              <option value="Completed" className="p-1">
                Completed
              </option>
              <option value="Cancelled" className="p-1">
                Cancelled
              </option>
              <option value="Postponed" className="p-1">
                Postponed
              </option>
            </select>
          </div>
        </div>
        {/* Submit Button */}
        <ToastContainer />

        <div className="flex justify-center items-center mt-2 relative">
          <input
            type="submit"
            value={formMode === "add" ? "Publish" : "Update"}
            id="publish-article"
            className="text-white px-5 py-2 bg-[#7262EC] rounded-[5px] hover:cursor-pointer hover:bg-[#6152d3]"
            disabled={isDisabledButton}
          />
          {isUploading && (
            <UploadingAnimation ml={"200px"} styling={animationStyles} />
          )}
          {isUploaded && (
            <UploadedAnimation ml={"200px"} styling={animationStylesUploaded} />
          )}
        </div>
      </form>
    </div>
  );
};

const animationStyles = {
  height: "100px",
  width: "100px",
};
const animationStylesUploaded = {
  height: "50px",
  width: "50px",
};
export default EventForm;
