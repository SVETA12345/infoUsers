import {
    Stack, TextField, InputAdornment, Button
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
const SearchCards = ({ query, setQuery, editable, openCreate }) => {
    return (
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 2 }}>
            <TextField
                size="small" fullWidth
                placeholder="Поиск по названию..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>
                    ),
                }}
            />



            {editable && (
                <Button
                    variant="contained" size="small"
                    startIcon={<AddIcon />}
                    onClick={openCreate}
                    sx={{ whiteSpace: "nowrap" }}
                >

                </Button>
            )}
        </Stack>
    )
}

export default SearchCards;