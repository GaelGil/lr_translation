"use client"

import { Table } from "@mantine/core"
import { SkeletonText } from "../ui/skeleton"

const PendingTranslations = () => (
  <Table striped highlightOnHover withTableBorder withColumnBorders>
    <thead>
      <tr>
        <th style={{ width: "50%" }}>Source</th>
        <th style={{ width: "50%" }}>Translation</th>
      </tr>
    </thead>

    <tbody>
      {[...Array(10)].map((_, index) => (
        <tr key={index}>
          <td>
            <SkeletonText noOfLines={2} />
          </td>
          <td>
            <SkeletonText noOfLines={2} />
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
)

export default PendingTranslations