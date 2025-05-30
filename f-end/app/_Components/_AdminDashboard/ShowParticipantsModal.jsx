import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { closeIcon } from "@/public/assets/_index";
import Image from "next/image";

const ShowParticipantsModal = ({
  children,
  participantsList,
  setParticipantsList,
  eventId,
}) => {
  const [participantsFetchedList, setParticipantsFetchedList] = useState();
  useEffect(() => {
    if (participantsList) {
      fetchParticipantList();
    }
  }, [participantsList]);

  const fetchParticipantList = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/article/participant-list/${eventId}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setParticipantsFetchedList(data.data);
      }
    } catch (e) {
      console.error("this is error", e);
    }
  };

  return (
    <div className="min-w-[400px] bg-white rounded-[20px] relative">
      <div
        className="absolute right-[-18px] top-[-15px]"
        onClick={() => setParticipantsList(false)}
      >
        <Image src={closeIcon} height={30} width={30} />
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Enrollment ID</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead className="text-right">Year</TableHead>
            <TableHead className="text-right">Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {participantsFetchedList?.map((list) => (
            <TableRow key={list.enroll_id}>
              <TableCell className="font-medium">{list.name}</TableCell>
              <TableCell>{list.enroll_id}</TableCell>
              <TableCell>{list.branch}</TableCell>
              <TableCell className="text-right">{list.year}</TableCell>
              <TableCell className="text-right">{list.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ShowParticipantsModal;
