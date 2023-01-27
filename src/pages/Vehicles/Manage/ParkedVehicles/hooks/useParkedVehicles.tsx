import { useEffect, useState } from 'react';

const useParkedVehicles = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return {
    openDialog,
    setOpenDialog,
  };
};

export default useParkedVehicles;
