import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { Typography, IconButton, Tooltip, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { OPEN_POPUP, CLOSE_POPUP } from '../../services/constants/popupData'
import { DELETE_BY_ID_USERS } from '../../services/constants/users'
import ModalConfirmation from '../ModalConfirmation/ModalConfirmation'

export default function UsersTable({ usersData = [] }) {
    const dispatch = useDispatch()
    const columns = useMemo(
        () => [
            {
                id: 'fullName',
                header: 'ФИО',
                // Собираем ФИО из трёх полей
                accessorFn: (row) =>
                    `${row.second_name} ${row.name} ${row.middle_name}`,
            },
            {
                accessorKey: 'position',
                header: 'Должность',
            },
            {
                accessorKey: 'email',
                header: 'Email',
            },
            {
                accessorKey: 'department',
                header: 'Отдел',
            },
            {
                accessorKey: 'age',
                header: 'Возраст',
            },
        ],
        [],
    );

    const data = usersData;



    const table = useMaterialReactTable({
        columns,
        data,
        enableMultiRowSelection: true,
        muiTableHeadCellProps: {
            sx: {
                backgroundColor: '#e3f2fd',
                color: '#424242',
                fontWeight: 'bold',
                borderBottom: '2px solid #bdbdbd',
                borderRight: '1px solid #e0e0e0',
                '&:last-child': { borderRight: 'none' },
            },
        },
        muiTableBodyCellProps: {
            sx: {
                color: '#424242',
                borderBottom: '1px solid #e0e0e0',
                borderRight: '1px solid #e0e0e0',
                '&:last-child': { borderRight: 'none' },
            },
        },
        muiTableProps: { sx: { border: '2px solid #bdbdbd' } },
        muiTablePaperProps: { sx: { borderRadius: 2, boxShadow: 3 } },

        enablePagination: true,
        enableGlobalFilter: true,
        enableRowSelection: true,
        initialState: {
            pagination: { pageSize: 10, pageIndex: 0 },
        },
        muiTableBodyRowProps: ({ row }) => ({
            onClick: () => console.log('Clicked row:', row.original),
            sx: { cursor: 'pointer' },
        }),


        renderTopToolbarCustomActions: ({ table }) => {
            const selectedRows = table.getSelectedRowModel().rows;

            const handleDelete = () => {
                const selected = selectedRows.map((r) => r.original);
                const count = selected.length;
                dispatch({
                    type: OPEN_POPUP,
                    payload: {
                        componentPopup: <ModalConfirmation title={'Подтвердите удаление'}
                            question={`Удалить ${count} пользовател${count === 1 ? 'я' : 'ей'}?
                                `} handleClickButton={() => {
                                dispatch({
                                    type: DELETE_BY_ID_USERS,
                                    payload: { usersDelete: selected }
                                })
                                dispatch({
                                    type: CLOSE_POPUP,
                                })
                                table.resetRowSelection();
                            }} />
                    }
                })
            };
            const totalFound = table.getPrePaginationRowModel().rows.length;
            return (
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Typography variant="h6">
                        Список пользователей в базе
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {`(${totalFound} пользователей)`}
                    </Typography>
                    {selectedRows.length > 0 && (
                        <Tooltip title="Удалить выбранного пользователя">
                            <IconButton
                                color="error"
                                onClick={handleDelete}
                                size="small"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>
            );
        },
    });

    return <MaterialReactTable table={table} />;
}