"use client";

import React from "react";
import MainContentWrapper from "@/app/_Components/_AdminDashboard/MainContentWrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const page = () => {
  function handleSubmitForm(e) {}

  async function handleFileChange(e) {
    // console.log(e.target.files[0]);
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("excelFile", file);
    console.log(formData);
    const response = await fetch(
      "http://localhost:3001/api/article/upload-excel",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    console.log(data);
  }

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
        <form onSubmit={handleSubmitForm} encType="multipart/form-data">
          <Label htmlFor="file" className="text-sm font-medium">
            Upload File
          </Label>
          <div className="flex items-center gap-2 w-full">
            <Input
              id="file"
              type="file"
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-600 dark:hover:border-gray-500 dark:focus:ring-gray-400"
              accept=".xlsx"
              onChange={handleFileChange}
            />
            <Button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            >
              <UploadIcon className="w-4 h-4 mr-2" />
              Publish
            </Button>
          </div>
        </form>
      </div>
    </MainContentWrapper>
  );
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
export default page;
