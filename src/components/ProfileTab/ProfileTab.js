import {
    Box, Grid,
    Avatar
} from "@mui/material";


import AvatarUploader from '../AvatarUploader/AvatarUploader'
import FormConstructor from '../FormConstructor/FormConstructor'
import CardInfo from '../CardInfo/CardInfo'

export default function ProfileTab({ formData, rowsDepartement, editing, form, user, onChange, userAcive }) {
    return (
        <Grid container spacing={4}>
            <FormConstructor formData={formData} title={'Общая информация'}>
                <CardInfo
                    title={'Информация об отделе'}
                    rows={rowsDepartement}
                />
            </FormConstructor>



            <Grid item xs={12} md={5}>
                {editing ? (
                    <AvatarUploader
                        value={form.photo}
                        name={`${user.second_name} ${user.name} ${user.middle_name}`}
                        onChange={(v) => onChange("photo", v)}
                    />
                ) : userAcive.photo ? (
                    <Box
                        component="img"
                        src={userAcive.photo}
                        alt="avatar"
                        sx={{
                            width: "100%", borderRadius: 2, display: "block", mb: 2,
                            objectFit: "cover", maxHeight: 320,
                        }}
                    />
                ) : (
                    <Avatar
                        sx={{
                            width: "100%", height: 320, borderRadius: 2,
                            fontSize: 96, mb: 2,
                        }}
                    >
                        {`${user.second_name[0] || ''} ${user.name[0] || ''} ${user.middle_name[0] || ''}`}
                    </Avatar>
                )}


            </Grid>
        </Grid>
    )
}