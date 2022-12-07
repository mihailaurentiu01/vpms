import { useTranslation } from 'react-i18next';
import Vehicle from '../../../../models/Vehicle';
import TableCell from '@mui/material/TableCell';
import Table from '../../../../components/Table/index';
import { useHistory } from 'react-router-dom';
import routes from '../../../../helpers/routes';
import { useAppDispatch } from '../../../../app/hooks';
import { VehicleActions } from '../../../../modules/vehicle/vehicleSlice';

const ManageParkedVehicles: React.FC<{ parkedVehicles: Vehicle[] }> = (
  props
) => {
  const { parkedVehicles } = props;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useHistory();

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

  return (
    <Table
      headCells={headCells}
      rows={parkedVehicles}
      includesToolbar={true}
      isDeleteAllowed={true}
      isViewDetailsAllowed={true}
      isEditingAllowed={false}
      headTitle={t('manageParkedVehicles')}
      onViewDetails={onViewDetailsHandler}
      onRenderRow={onRenderRow}
    />
  );
};

export default ManageParkedVehicles;
