import { useTranslation } from 'react-i18next';
import Vehicle from '../../../../models/Vehicle';
import TableCell from '@mui/material/TableCell';
import Table from '../../../../components/Table/index';
import { useHistory } from 'react-router-dom';
import routes from '../../../../helpers/routes';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  deleteVehicle,
  getVehicles,
  VehicleActions,
} from '../../../../modules/vehicle/vehicleSlice';
import { useState } from 'react';
import { RootState } from '../../../../app/store';
import ResponsiveDialog from '../../../../components/ResponsiveDialog';

const ManageOutVehicles: React.FC<{ vehicles: Vehicle[] }> = (props) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { vehicles } = props;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { selectedVehicle } = useAppSelector(
    (state: RootState) => state.vehicle
  );

  const headCells = [
    {
      id: 'id',
      numeric: false,
      disablePadding: true,
      label: '#',
    },
    {
      id: 'owner',
      numeric: false,
      disablePadding: false,
      label: t('ownerName'),
    },
    {
      id: 'registrationNumber',
      numeric: false,
      disablePadding: false,
      label: t('registrationNumber'),
    },
  ];

  const onRenderRow = (row: any) => {
    return (
      <>
        <TableCell align='left'>{row.owner}</TableCell>
        <TableCell align='left'>{row.registrationNumber}</TableCell>
      </>
    );
  };

  const onViewDetailsHandler = (selected: string[]) => {
    dispatch(VehicleActions.setSelectedVehicle(selected[0]));
    history.push(routes.vehicle.details);
  };

  const onDeleteHandler = (selected: string[]) => {
    dispatch(VehicleActions.setSelectedVehicle(selected[0]));
    setOpenDialog(true);
  };

  const onDeleteConfirmHandler = async () => {
    const res: any = await dispatch(deleteVehicle(''));

    if (!res.error) {
      dispatch(getVehicles());
    }
  };

  const onCloseDialogHandler = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Table
        headCells={headCells}
        rows={vehicles}
        includesToolbar={true}
        isDeleteAllowed={true}
        isViewDetailsAllowed={true}
        isEditingAllowed={false}
        headTitle={t('manageParkedVehicles')}
        onViewDetails={onViewDetailsHandler}
        onDelete={onDeleteHandler}
        onRenderRow={onRenderRow}
      />

      {openDialog && (
        <ResponsiveDialog
          open={openDialog}
          handleClose={onCloseDialogHandler}
          context={
            t('wantToDeleteVehicle') +
            `"${selectedVehicle?.company} - ${selectedVehicle?.status}"?`
          }
          title={t('delete')}
          optionCancel={t('no')}
          optionAgree={t('yes')}
          handleOnAgree={onDeleteConfirmHandler}
        />
      )}
    </>
  );
};

export default ManageOutVehicles;
