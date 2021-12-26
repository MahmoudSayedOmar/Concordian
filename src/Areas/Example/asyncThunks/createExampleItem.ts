// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { ExampleItem } from '../types/ExampleItem';
// import { fetchExampleItems } from './fetchExampleItems';

// export const createExampleItem = createAsyncThunk(
//     'example/createExampleItem',
//     async (exampleItem: Partial<ExampleItem>, { dispatch }) => {
//         await makeRequest({
//             method: 'POST',
//             path: `Example`,
//             data: exampleItem
//         });

//         // reload data from the API
//         dispatch(fetchExampleItems());
//     }
// );
