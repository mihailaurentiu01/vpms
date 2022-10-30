import Breadcrumbs from '@mui/material/Breadcrumbs';

const Breadcrumb: React.FC<{
  onHandleClick?: (e: React.MouseEvent) => void;
  children: any;
}> = (props) => {
  const onHandleClickDefault = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div
      role='presentation'
      onClick={props.onHandleClick || onHandleClickDefault}
    >
      <Breadcrumbs aria-label='breadcrumb'>{props.children}</Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
