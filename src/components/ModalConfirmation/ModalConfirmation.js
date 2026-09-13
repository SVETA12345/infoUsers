
import {
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@mui/material";
import { useDispatch } from 'react-redux';
import { CLOSE_POPUP } from '../../services/constants/popupData'

const ModalConfirmation = ({ title, question, handleClickButton }) => {
    const dispatch = useDispatch()
    return (
        <>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {question}
                </DialogContentText>

            </DialogContent>
            <DialogActions>
                <Button onClick={(e) => dispatch({ type: CLOSE_POPUP })}>
                    Отмена
                </Button>
                <Button
                    onClick={(e) => handleClickButton()}
                    color="error"
                    variant="contained"
                >
                    Подтвердить
                </Button>
            </DialogActions>
        </>
    )
}

export default ModalConfirmation