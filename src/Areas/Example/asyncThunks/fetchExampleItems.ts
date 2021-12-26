// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { makeRequest } from '@crx-dev/hss-react-infrastructure/dist';
// import { RootState } from '../../../app/rootReducer';

// export const fetchExampleItems = createAsyncThunk('example/fetchExampleItems', async (_, { getState }) => {
//     const { searchTerm, sort, pagination, filters } = (getState() as RootState).example;

//     return await makeRequest({
//         method: 'POST',
//         path: `Example/search`,
//         data: {
//             search: searchTerm,
//             sortField: sort.field,
//             sortDirection: sort.direction,
//             page: pagination.page,
//             pageSize: pagination.pageSize,
//             filters: Object.entries(filters).map(e => ({ field: e[0], value: e[1] }))
//         }
//     });
// });
