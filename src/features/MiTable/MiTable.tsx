import { Paper, Grid, TableHead, TableRow } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import { useState } from "react";
import MiPagination from "./MiPagination";
import React from "react";
type MiTableProps<T> = {
  columns: Array<{
    key: keyof T;
    type: string;
    label: string;
    enumOptions?: () => void | string;
    props?: { [p: string]: string | number };
  }>;
  rows: Array<{
    [key in keyof T]: string | number;
  }>;
}

export default function MiTable<T>(props: MiTableProps<T & {id: string}>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const { columns, rows } = props;
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
                    <TableCell key={column.key as string} {...column.props}>
                      {column.label}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => {
                    return (
                      <TableCell key={column.key as string} {...column.props}>
                        {row[column.key]}
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
