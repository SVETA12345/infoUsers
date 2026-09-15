
import {
    Stack, Typography,
    Pagination, FormControl, InputLabel, Select, MenuItem,
} from "@mui/material";
export default function PaginationCustom({ perPage, setPerPage, pageItems, filtered, page, totalPages, setPage }) {
    return (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            sx={{ mt: 3 }}
        >
            <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel id="per-page-label">На странице</InputLabel>
                <Select
                    labelId="per-page-label"
                    label="На странице"
                    value={perPage}
                    onChange={(e) => setPerPage(Number(e.target.value))}
                >
                    {[5, 10, 20, 50].map((n) => (
                        <MenuItem key={n} value={n}>{n}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Typography variant="caption" color="text.secondary">
                Показано {pageItems.length} из {filtered.length}
            </Typography>

            <Pagination
                page={page}
                count={totalPages}
                onChange={(_, p) => setPage(p)}
                color="primary"
                shape="rounded"
                size="small"
            />
        </Stack>
    )
}