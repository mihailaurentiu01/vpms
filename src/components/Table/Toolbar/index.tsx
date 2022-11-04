import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';
import { Search } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const TableToolbar: React.FC<{
  numSelected: number;
  isDeleteAllowed?: boolean;
  isEditingAllowed?: boolean;
  isViewDetailsAllowed?: boolean;
  headTitle: string;
  onDelete?: (e: React.MouseEvent) => void;
  onEdit?: (e: React.MouseEvent) => void;
  onViewDetails?: (e: React.MouseEvent) => void;
}> = (props) => {
  const { numSelected } = props;
  const { isDeleteAllowed } = props;
  const { isEditingAllowed } = props;
  const { isViewDetailsAllowed } = props;

  const { headTitle } = props;

  const { onDelete } = props;
  const { onEdit } = props;
  const { onViewDetails } = props;

  const { t } = useTranslation();

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} {t('selected')}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant='h6'
          id='tableTitle'
          component='div'
        >
          {headTitle}
        </Typography>
      )}

      {isViewDetailsAllowed && numSelected === 1 && (
        <Tooltip title={t('viewDetails')}>
          <IconButton onClick={onViewDetails}>
            <Search />
          </IconButton>
        </Tooltip>
      )}
      {isEditingAllowed && numSelected === 1 && (
        <Tooltip title={t('edit')}>
          <IconButton onClick={onEdit}>
            <Edit />
          </IconButton>
        </Tooltip>
      )}
      {isDeleteAllowed && numSelected === 1 && (
        <Tooltip title={t('delete')}>
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default TableToolbar;
