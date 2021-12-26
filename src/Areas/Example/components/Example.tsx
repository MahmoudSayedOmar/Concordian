/* istanbul ignore file */
import React, { useEffect } from 'react';
import {
    PageSection,
    Page,
    PageHeader,
    PageHeaderRow,
    PageHeaderTitle,
    SecondaryButton,
    ResponsiveTable,
    ResponsiveTableHeaderRow,
    ResponsiveTableHeaderCell,
    ResponsiveTableRow,
    ResponsiveTableCell,
    ResponsiveTableRowActions,
    ResponsiveTableBody,
    PrimaryButton,
    Modal,
    DateFormat,
    ResponsiveTableFooter,
    ResponsiveTablePagination,
    Filters,
    SearchAndFiltersLayout,
    SearchInput
} from '@crx-dev/hss-react-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import ExampleForm from './ExampleForm';
import { openAddForm, closeForm, openEditForm, setPagination, setSort, setFilters, setSearch } from '../exampleSlice';
import { fetchExampleItems } from '../asyncThunks/fetchExampleItems';
import { filtersConfig } from '../config/filtersConfig';

const Example: React.FC = () => {
    const dispatch = useDispatch();
    const {
        status,
        items,
        totalResults,
        isShowingAddForm,
        editingItem,
        searchTerm,
        sort,
        pagination,
        filters
    } = useSelector((state: RootState) => state.example);

    useEffect(() => {
        dispatch(fetchExampleItems());
    }, [dispatch, searchTerm, sort, pagination, filters]);

    return (
        <Page background="SwedishChefBlue">
            <PageHeader>
                <PageHeaderRow>
                    <PageHeaderTitle>Example</PageHeaderTitle>
                </PageHeaderRow>
            </PageHeader>
            <PageSection>
                <SearchAndFiltersLayout
                    search={
                        <SearchInput
                            name="search"
                            onSearch={searchTerm => dispatch(setSearch(searchTerm))}
                            placeholder="Product Search"
                        />
                    }
                    filters={
                        <Filters
                            config={filtersConfig}
                            values={filters}
                            onChange={values => {
                                dispatch(setFilters(values));
                            }}
                        />
                    }
                    actions={[
                        <PrimaryButton id="addItem" onClick={() => dispatch(openAddForm())}>
                            Add Example Item
                        </PrimaryButton>
                    ]}
                    collapseAt={600}
                />
                <ResponsiveTable
                    id="test"
                    collapseAt={700}
                    isLoading={status === 'loading'}
                    isUpdating={status === 'updating'}
                    hasError={status === 'loadingError'}
                    sortParams={sort}
                    onSort={sort => dispatch(setSort(sort))}
                >
                    <ResponsiveTableHeaderRow>
                        <ResponsiveTableHeaderCell sortField="name">Name</ResponsiveTableHeaderCell>
                        <ResponsiveTableHeaderCell sortField="nhsNumber">NHS Number</ResponsiveTableHeaderCell>
                        <ResponsiveTableHeaderCell sortField="gender">Gender</ResponsiveTableHeaderCell>
                        <ResponsiveTableHeaderCell sortField="dob">DoB</ResponsiveTableHeaderCell>
                        <ResponsiveTableHeaderCell sortField="address">Address</ResponsiveTableHeaderCell>
                        <ResponsiveTableHeaderCell />
                    </ResponsiveTableHeaderRow>
                    <ResponsiveTableBody>
                        {items.map((item, i) => (
                            <ResponsiveTableRow key={i}>
                                <ResponsiveTableCell promoteToHeaderOnMobile>{item.name}</ResponsiveTableCell>
                                <ResponsiveTableCell>{item.nhsNumber}</ResponsiveTableCell>
                                <ResponsiveTableCell>{item.gender}</ResponsiveTableCell>
                                <ResponsiveTableCell>
                                    <DateFormat date={item.dob} format="date" />
                                </ResponsiveTableCell>
                                <ResponsiveTableCell>{item.address}</ResponsiveTableCell>

                                <ResponsiveTableRowActions>
                                    <SecondaryButton
                                        id={`edit-${item.id}`}
                                        size="small"
                                        onClick={() => dispatch(openEditForm(item))}
                                    >
                                        Edit
                                    </SecondaryButton>
                                </ResponsiveTableRowActions>
                            </ResponsiveTableRow>
                        ))}
                    </ResponsiveTableBody>
                    <ResponsiveTableFooter>
                        <ResponsiveTablePagination
                            onPageChange={page => dispatch(setPagination({ page, pageSize: pagination.pageSize }))}
                            onRowsPerPageChange={pageSize => dispatch(setPagination({ page: 0, pageSize }))}
                            page={pagination.page}
                            rowsPerPage={pagination.pageSize}
                            totalResults={totalResults}
                            showRowsPerPageSelect
                        />
                    </ResponsiveTableFooter>
                </ResponsiveTable>

                <Modal open={isShowingAddForm || !!editingItem} onCancel={() => dispatch(closeForm())} title="Add Note">
                    <ExampleForm />
                </Modal>
            </PageSection>
        </Page>
    );
};

export default Example;
