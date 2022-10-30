import { Paper, Grid, TableHead, TableRow } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import { useState } from "react";
import MiPagination from "./MiPagination";
import React from "react";

export type MiTableProps<T> = {
  columns: Array<{
    key: Exclude<keyof T, symbol>;
    type: string;
    label: string;
    enumOptions?: () => void | string;
    props?: { [p: string]: string | number };
  }>;
  tableParamsChange: (page: number, limit: number) => void;
  rows: Array<T>;
};

export default function MiTable<T>(props: MiTableProps<T>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const { columns, tableParamsChange, rows } = props;
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    tableParamsChange(newPage + 1, rowsPerPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    tableParamsChange(1, rowsPerPage);
  };
  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {columns.map((column) => {
                  return (
                    <TableCell key={column.key} {...column.props}>
                      {column.label}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row?.id}>
                  {columns.map((column) => {
                    return (
                      <TableCell key={column.key} {...column.props}>
                        {row[column.key] as React.ReactNode}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <MiPagination
                  size={rowsPerPage}
                  total={rows.length}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}></MiPagination>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
