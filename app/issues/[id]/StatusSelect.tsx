"use client";
import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";

interface Props {
  issue: Issue;
}

const StatusSelect = ({ issue }: Props) => {
  const [status, setStatus] = useState<Status>(issue.status);
  const [isTransitionStarted, startTransition] = useTransition();
  const router = useRouter();

  const changeStatus = (issueStatus: Status) => {
    axios
      .patch("/api/issues/" + issue.id, {
        status: issueStatus,
      })
      .catch(() => {
        toast.error("Changes could not be saved");
      });
    setStatus(issueStatus);
    startTransition(router.refresh);
  };
  useEffect(() => {
    const fetchStatus = async () => {
      const { data } = await axios.get(`/api/issues/${issue.id}`);
      setStatus(data.status);
    };
    fetchStatus();
  }, [status]);
  return (
    <Select.Root defaultValue={issue.status} onValueChange={changeStatus}>
      <Select.Trigger placeholder="Status"></Select.Trigger>
      <Select.Content>
        <Select.Item value="OPEN">Open</Select.Item>
        <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
        <Select.Item value="CLOSED">Closed</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export default StatusSelect;
