import { downloadUser } from '@/application/downloadUser/downloadUser';
import { type IUser } from '@/domain/models/IUser';
import { createCsvUserDownloader } from '@/infrastructure/dataDownload/CsvUserDownloader';
import { createJsonUserDownloader } from '@/infrastructure/dataDownload/JsonUserDownloader';
import { GlobalContext } from '@/ui/context/GlobalContext';
import { DownloadMethods } from '@/ui/helpers/enums/enums';
import { type IHookResponse } from '@/ui/helpers/types/types';
import { useContext } from 'react';

const useDownloadCell = (): IHookResponse => {
  const { downloadMethod } = useContext(GlobalContext);

  const handleDownloadClick = async (user: IUser): Promise<void> => {
    const userDownloader =
      downloadMethod === DownloadMethods.JSON ? createJsonUserDownloader() : createCsvUserDownloader();
    await downloadUser(userDownloader)(user);
  };

  return {
    actions: { handleDownloadClick }
  };
};

export default useDownloadCell;