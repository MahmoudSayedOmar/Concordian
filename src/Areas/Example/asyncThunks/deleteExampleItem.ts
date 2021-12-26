// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { makeRequest } from '@crx-dev/hss-react-infrastructure/dist';
// import { ExampleItem } from '../types/ExampleItem';
// import { fetchExampleItems } from './fetchExampleItems';

// export const deleteExampleItem = createAsyncThunk(
//     'example/deleteExampleItem',
//     async (exampleItem: ExampleItem, { dispatch }) => {
//         await makeRequest({
//             method: 'DELETE',
//             path: `Example/${exampleItem.id}`
//         });

//         // reload data from the API
//         dispatch(fetchExampleItems());
//     }
// );
