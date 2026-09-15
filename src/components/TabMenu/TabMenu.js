import {
    Tabs, Tab, Stack, IconButton,
    Tooltip
} from "@mui/material";
import {
    Tune as TuneIcon,
} from "@mui/icons-material";
const TabMenu = ({ shownTabs, setFilterAnchor, setTab, tab }) => {
    return (<Stack
        direction="row" alignItems="center"
        sx={{ borderBottom: 1, borderColor: "divider" }}
    >
        <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ flex: 1 }}
        >
            {shownTabs.map((t) => (
                <Tab key={t.id} value={t.id} label={t.label} />
            ))}
        </Tabs>

        <Tooltip title="Настроить вкладки">
            <IconButton
                onClick={(e) => setFilterAnchor(e.currentTarget)}
                sx={{ ml: 1 }}
            >
                <TuneIcon />
            </IconButton>
        </Tooltip>
    </Stack>
    )
}

export default TabMenu;