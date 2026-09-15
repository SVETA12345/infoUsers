
import { Paper, Divider, Stack, Typography, Box } from "@mui/material";



export default function CardInfo({ rows, itemInfo = true, title, warning = '' }) {

    return (
        <>
            {!itemInfo ? (
                <Paper variant="outlined" sx={{ p: 2, bgcolor: "#fafafa", color: "text.secondary" }}>
                    <Typography variant="body2">{warning}</Typography>
                </Paper>
            ) : (
                <Paper
                    variant="outlined"
                    sx={{
                        mt: 1, mb: 2, p: 2,
                        bgcolor: "#f7f9fc",
                        borderLeft: "4px solid #1976d2",
                        borderRadius: 2,
                    }}
                >
                    <Typography
                        variant="caption"
                        sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}
                    >
                        {title}
                    </Typography>

                    <Divider sx={{ my: 1 }} />

                    {rows.map((r) => (
                        <Stack key={r.label} direction="row" spacing={1.5} alignItems="flex-start" sx={{ py: 0.75 }}>
                            <Box sx={{ color: "text.secondary", display: "flex", mt: 0.25 }}>{r.icon}</Box>
                            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 90 }}>
                                {r.label}
                            </Typography>
                            <Typography variant="body2" fontWeight={500}>
                                {r.value || "—"}
                            </Typography>
                        </Stack>
                    ))}
                </Paper>
            )}
        </>

    )
}