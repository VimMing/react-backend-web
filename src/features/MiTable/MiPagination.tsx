import Pagination from "@mui/material/Pagination";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

interface MiPaginationProps {
  total: number;
  size: number;
  page: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange: ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;
  const pageCount = Math.ceil(count / rowsPerPage);

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 1.5, display: "flex", alignItems: "center" }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page">
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      {/* note that TablePagination page prop start at 0, Pagination page prop start at 1 */}
      <Pagination
        count={pageCount}
        color="primary"
        onChange={(e, num) =>
          onPageChange(e as React.MouseEvent<HTMLButtonElement>, num - 1)
        }
        page={page + 1}
      />
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page">
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function MiPagination(props:MiPaginationProps) {
  const { total, size, page, onPageChange, onRowsPerPageChange } = props;

  return (
    <TablePagination
      rowsPerPageOptions={[20, 50, { label: "All", value: -1 }]}
      count={total}
      rowsPerPage={size}
      page={page}
      SelectProps={{
        inputProps: {
          "aria-label": "rows per page",
        },
        native: true,
      }}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      ActionsComponent={TablePaginationActions}
    />
  );
}
