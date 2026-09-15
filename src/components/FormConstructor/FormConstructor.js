import {
    Typography, Grid,
} from "@mui/material";
import InfoRow from './InfoRow/InfoRow'

const FormConstructor = ({ formData, title, children }) => {


    return (
        <Grid item xs={12} md={7}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
                {title}
            </Typography>
            {
                formData.map(fieldData => (
                    <InfoRow key={fieldData.fieldKey} label={fieldData.label} value={fieldData.value} fieldKey={fieldData.fieldKey}
                        editing={fieldData.editing} form={fieldData.form} onChange={fieldData.onChange}
                        options={fieldData.options} type={fieldData.type} error={fieldData.error} />
                ))
            }
            {children}
        </Grid>
    )
}

export default FormConstructor;