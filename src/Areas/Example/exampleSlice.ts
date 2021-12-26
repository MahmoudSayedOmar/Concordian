import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExampleItem } from './types/ExampleItem';
import { fetchExampleItems } from './asyncThunks/fetchExampleItems';
import { createExampleItem } from './asyncThunks/createExampleItem';
import { updateExampleItem } from './asyncThunks/updateExampleItem';
import { deleteExampleItem } from './asyncThunks/deleteExampleItem';
import { FilterValues, SortFieldParams } from '@crx-dev/hss-react-components';

interface ExampleState {
    status: 'idle' | 'loading' | 'updating' | 'loadingError';
    itemStatus: 'idle' | 'creating' | 'creatingError' | 'deleting' | 'deletingError' | 'updating' | 'updatingError';
    isLoading: boolean;
    searchTerm: string;
    sort: { field: string; direction: 'asc' | 'desc' };
    pagination: { page: number; pageSize: number };
    filters: FilterValues;
    hasInitiallyLoaded: boolean;
    isShowingAddForm: boolean;
    editingItem: null | ExampleItem;
    items: ExampleItem[];
    totalResults: number;
}

const initialState: ExampleState = {
    status: 'idle',
    itemStatus: 'idle',
    isLoading: false,
    searchTerm: '',
    sort: { field: 'name', direction: 'asc' },
    pagination: { page: 0, pageSize: 10 },
    filters: {
        gender: ''
    },
    hasInitiallyLoaded: false,
    isShowingAddForm: false,
    editingItem: null,
    items: [],
    totalResults: 0
};

const example = createSlice({
    name: 'example',
    initialState: initialState,
    reducers: {
        setSearch(state: ExampleState, { payload }: PayloadAction<string>) {
            state.searchTerm = payload;
            state.pagination.page = 0;
        },
        setSort(state: ExampleState, { payload }: PayloadAction<SortFieldParams>) {
            state.sort = payload;
            state.pagination.page = 0;
        },
        setPagination(state: ExampleState, { payload }: PayloadAction<{ page: number; pageSize: number }>) {
            state.pagination.page = payload.page;
            state.pagination.pageSize = payload.pageSize;
        },
        setFilters(state: ExampleState, { payload }: PayloadAction<FilterValues>) {
            state.filters = payload;
            state.pagination.page = 0;
        },
        openAddForm(state: ExampleState) {
            state.isShowingAddForm = true;
        },
        openEditForm(state: ExampleState, { payload }: PayloadAction<ExampleItem>) {
            state.editingItem = payload;
        },
        closeForm(state: ExampleState) {
            state.isShowingAddForm = false;
            state.editingItem = null;
        }
    },
    extraReducers: builder => {
        builder
            // Fetch
            .addCase(fetchExampleItems.pending, state => {
                state.status = state.hasInitiallyLoaded ? 'updating' : 'loading';
                state.hasInitiallyLoaded = true;
            })
            .addCase(fetchExampleItems.fulfilled, (state, { payload }: PayloadAction<ApiResponse<ExampleItem[]>>) => {
                state.items = payload.payload;
                state.totalResults = payload.count;
                state.status = 'idle';
            })
            .addCase(fetchExampleItems.rejected, state => {
                state.status = 'loadingError';
            })
            // Create
            .addCase(createExampleItem.pending, state => {
                state.itemStatus = 'creating';
            })
            .addCase(createExampleItem.fulfilled, state => {
                state.itemStatus = 'idle';
                state.isShowingAddForm = false;
            })
            .addCase(createExampleItem.rejected, state => {
                state.itemStatus = 'creatingError';
            })
            // Update
            .addCase(updateExampleItem.pending, state => {
                state.itemStatus = 'updating';
            })
            .addCase(updateExampleItem.fulfilled, state => {
                state.itemStatus = 'idle';
                state.editingItem = null;
            })
            .addCase(updateExampleItem.rejected, state => {
                state.itemStatus = 'updatingError';
            })
            // Delete
            .addCase(deleteExampleItem.pending, state => {
                state.itemStatus = 'deleting';
            })
            .addCase(deleteExampleItem.fulfilled, state => {
                state.itemStatus = 'idle';
                state.editingItem = null;
            })
            .addCase(deleteExampleItem.rejected, state => {
                state.itemStatus = 'deletingError';
            });
    }
});

export const { setSearch, setSort, setPagination, setFilters, openAddForm, openEditForm, closeForm } = example.actions;

export default example.reducer;
