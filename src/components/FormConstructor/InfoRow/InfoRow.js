import {
    Typography, Grid,
    TextField, MenuItem,
} from "@mui/material";
function InfoRow({ label, value, fieldKey, editing, form, onChange, options, type, error = null }) {
    return (
        <Grid container sx={{ py: 1, alignItems: "center" }}>
            <Grid item xs={4}>
                <Typography color="text.secondary" variant="body2">{label}</Typography>
            </Grid>
            <Grid item xs={8}>
                {!editing ? (
                    typeof value === "string"
                        ? <Typography variant="body2" fontWeight={500}>{value}</Typography>
                        : value
                ) : options ? (
                    <TextField
                        select size="small" fullWidth
                        value={form[fieldKey] ?? ""}
                        onChange={(e) => onChange(fieldKey, e.target.value)}
                        error={Boolean(error)}
                        helperText={error || " "}
                    >
                        {options.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                    </TextField>
                ) : (
                    <TextField
                        type={type || 'string'}
                        error={Boolean(error)}
                        helperText={error || " "}
                        size="small" fullWidth
                        value={form[fieldKey] ?? ""}
                        onChange={(e) => onChange(fieldKey, e.target.value)}
                    />
                )}
            </Grid>
        </Grid>
    );
}
export default InfoRow;