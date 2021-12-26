// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { makeRequest } from '@crx-dev/hss-react-infrastructure/dist';
// import { ExampleItem } from '../types/ExampleItem';
// import { fetchExampleItems } from './fetchExampleItems';

// export const updateExampleItem = createAsyncThunk(
//     'example/updateExampleItem',
//     async (exampleItem: Partial<ExampleItem>, { dispatch }) => {
//         await makeRequest({
//             method: 'PUT',
//             path: `Example/${exampleItem.id}`,
//             data: exampleItem
//         });

//         // reload data from the API
//         dispatch(fetchExampleItems());
//     }
// );
