import {
    Box, Typography, Button, Stack, MenuItem, Menu,
    Checkbox, ListItemText, Divider

} from "@mui/material";
const TabMenuFilter = ({ filterAnchor, setFilterAnchor, ALL_TABS, selectAllTabs, resetTabs, visibleTabs, toggleTab }) => {
    return (
        <Menu
            anchorEl={filterAnchor}
            open={Boolean(filterAnchor)}
            onClose={() => setFilterAnchor(null)}
            PaperProps={{ sx: { maxHeight: 420, width: 280 } }}
        >
            <Typography
                variant="caption"
                sx={{ px: 2, py: 1, display: "block", color: "text.secondary" }}
            >
                Показывать вкладки ({visibleTabs.length}/{ALL_TABS.length})
            </Typography>
            <Divider />
            <Stack direction="row" spacing={1} sx={{ px: 2, py: 1 }}>
                <Button size="small" onClick={selectAllTabs}>Все</Button>
                <Button size="small" onClick={resetTabs}>По умолчанию</Button>
            </Stack>
            <Divider />
            <Box sx={{ maxHeight: 260, overflowY: "auto" }}>
                {ALL_TABS.map((t) => (
                    <MenuItem key={t.id} onClick={() => toggleTab(t.id)} dense>
                        <Checkbox
                            size="small"
                            checked={visibleTabs.includes(t.id)}
                            tabIndex={-1}
                        />
                        <ListItemText primary={t.label} />
                    </MenuItem>
                ))}
            </Box>
        </Menu>
    )
}

export default TabMenuFilter;