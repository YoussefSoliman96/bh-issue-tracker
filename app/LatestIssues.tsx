import prisma from "@/prisma/client";
import {
  Avatar,
  Card,
  Flex,
  Heading,
  Table,
  TableCell,
  TableRow,
} from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IssueStatusBadge } from "./components";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });
  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell>
                <Flex justify="between">
                  <Flex direction="column" align="start">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar
                      fallback="?"
                      src={issue.assignedToUser.image!}
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </TableCell>
            </TableRow>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
