"use client";

import React, { useContext, useState } from "react";
import MainContentWrapper from "@/app/_Components/_AdminDashboard/MainContentWrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import UploadingAnimation from "@/app/_Components/_AdminDashboard/UploadingAnimation";
import UploadedAnimation from "@/app/_Components/_AdminDashboard/UploadedAnimation";
import { jwtVerify } from "jose";

const Page = () => {
  const [showExcelErr, setShowExcelErr] = useState("");
  const [suscessMessage, setSuccessMessage] = useState("");
  const [showZipErr, setShowZipErr] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isDisabledButton, setIsButtonDisabled] = useState(false);

  function timeOutExcelError() {
    setTimeout(() => {
      setShowExcelErr();
    }, 4000);
  }

  const excelFileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  function handleExcelFileChange(e) {
    const file = e.target.files[0];
    setShowExcelErr();
    if (file && file.type != excelFileType) {
      setShowExcelErr("Only files with '.xlsx' extension is allowed !");
      e.target.value = "";
      timeOutExcelError();
    }
  }

  const zipFileType = "application/x-zip-compressed";
  function handleZipFileChange(e) {
    const file = e.target.files[0];

    if (file && file.type != zipFileType) {
      setShowZipErr("Only zip files are allowed !");
      e.target.value = "";
      setTimeout(() => {
        setShowZipErr();
      }, 4000);
    }
  }

  async function uploadExcelToDB(e) {
    e.preventDefault();
    const fileInput = e.target[0];
    const zipFile = e.target[0].files[0];
    const excelFile = e.target[1].files[0];

    if (
      zipFile &&
      zipFile.type === zipFileType &&
      excelFile &&
      excelFile.type === excelFileType
    ) {
      setIsUploading(true);

      // if (
      //   file.type !==
      //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      // ) {
      //   setShowExcelErr("Please upload a valid Excel file.");
      //   setTimeout(() => {
      //     setShowExcelErr();
      //   }, 4000);
      //   fileInput.value = ""; // Reset the file input field
      //   return;
      // }

      const formData = new FormData();
      const token = Cookies.get("token");
      const SECRET_KEY = new TextEncoder().encode(
        process.env.NEXT_PUBLIC_SECRET_KEY
      );

      const userDetails = (await jwtVerify(token, SECRET_KEY)).payload;
      formData.append("zipFile", zipFile);
      formData.append("excelFile", excelFile);
      formData.append("authorName", userDetails.userName);
      try {
        setIsButtonDisabled(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/article/upload-excel`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );
        const data = await response.json();
        if (response.ok) {
          setIsUploading(false);
          setIsUploaded(true);
          setIsButtonDisabled(false);
          setTimeout(() => {
            setIsUploaded(false);
          }, 3000);
          e.target[0].value = "";
          setSuccessMessage(data.message);
          // setSuccessMessage("Articles uploaded successfully");
          setTimeout(() => {
            setSuccessMessage();
          }, 4000);
        } else {
          setIsUploading(false);
          setIsButtonDisabled(false);
          setShowExcelErr(data.message);
          // setShowExcelErr("An error occurred while processing the file!");
          timeOutExcelError();
        }
      } catch (error) {
        setShowExcelErr(data.message);
        // setShowExcelErr("An error occurred while processing the file!");
        timeOutExcelError();
      }
    } else {
      setShowExcelErr("Please upload both the files");
      timeOutExcelError();
    }
  }

  const messageInfo =
    showZipErr || showExcelErr || suscessMessage ? (
      <span
        className={`text-xl   p-2 ${suscessMessage ? "bg-[#a2f1a2e8]" : "bg-[#f0fb8bfa]"} rounded-[20px] border-[#2e2e2eaf] border-[1px]`}
      >
        {showZipErr || showExcelErr || suscessMessage}
      </span>
    ) : null;
  return (
    <MainContentWrapper>
      <h1 className="text-center text-2xl italic">
        Upload Multiple Articles in a Single Click !
      </h1>
      <div className="my-10 text-lg">
        <p>
          Please download the Excel template for article submission and proceed
          to upload the finalized document here.
        </p>
        {/* <a href={excelTemplate} download>
          Download Template
        </a> */}
        <a
          href="/assets/article-excel-template.xlsx"
          download="article-excel-template.xlsx"
          className="text-blue-800 underline"
        >
          Download Template
        </a>
      </div>
      <div className="flex flex-col items-start gap-2">
        <form onSubmit={uploadExcelToDB} encType="multipart/form-data">
          <div className="flex flex-col items-center gap-2 w-full">
            <div>
              {/* zip file */}
              <Label htmlFor="zipFile" className="text-sm font-medium">
                Zip File
              </Label>
              <Input
                id="zipFile"
                type="file"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-600 dark:hover:border-gray-500 dark:focus:ring-gray-400"
                accept=".zip"
                onChange={handleZipFileChange}
              />
            </div>
            {/* excel file */}
            <div>
              <Label htmlFor="excelFile" className="text-sm font-medium">
                Excel File
              </Label>
              <Input
                id="excelFile"
                type="file"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-600 dark:hover:border-gray-500 dark:focus:ring-gray-400"
                accept=".xlsx"
                onChange={handleExcelFileChange}
              />
            </div>
            <div className="relative">
              <Button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-md bg-[#7262EC] px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-[#6152d3] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                disabled={isDisabledButton}
              >
                <UploadIcon className="w-4 h-4 mr-2" />
                Publish
                {isUploaded && (
                  <UploadedAnimation ml={"200px"} styling={animationStyles} />
                )}
                {isUploading && (
                  <UploadingAnimation
                    ml={"200px"}
                    styling={animationStylesUploading}
                  />
                )}
              </Button>
            </div>
          </div>
        </form>
        {messageInfo}
      </div>
    </MainContentWrapper>
  );
};

const animationStylesUploading = {
  height: "100px",
  width: "100px",
};
const animationStyles = {
  height: "50px",
  width: "50px",
};

function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
export default Page;
