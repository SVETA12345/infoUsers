import {
    Grid
} from "@mui/material";
import FormConstructor from '../FormConstructor/FormConstructor'
import CardInfo from '../CardInfo/CardInfo'

export default function EducationTab({ educationFormData, university, rowsUniversity }) {
    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
                <FormConstructor formData={educationFormData} title={'Образование'}></FormConstructor>

                <CardInfo
                    itemInfo={university}
                    warning={'Учебное заведение не выбрано'}
                    title={'Информация об учебном заведении'}
                    rows={rowsUniversity}
                />

            </Grid>

            <Grid item xs={12} md={5}>
                {/* тут можно: карта вуза, статистика, и т.п. */}
            </Grid>
        </Grid>
    )
}