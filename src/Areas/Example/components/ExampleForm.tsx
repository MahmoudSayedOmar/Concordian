import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, FormFooter, TextArea, getFieldProps, TextField, DateInput, Select } from '@crx-dev/hss-react-components';
import { ExampleItem } from '../types/ExampleItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import { closeForm } from '../exampleSlice';
import { createExampleItem } from '../asyncThunks/createExampleItem';
import { updateExampleItem } from '../asyncThunks/updateExampleItem';
import { deleteExampleItem } from '../asyncThunks/deleteExampleItem';

const ExampleForm: React.FC = () => {
    const dispatch = useDispatch();
    const { editingItem, itemStatus } = useSelector((state: RootState) => state.example);

    const formik = useFormik<Partial<ExampleItem>>({
        initialValues: editingItem || {
            name: '',
            nhsNumber: '',
            gender: '',
            dob: '',
            address: ''
        },
        validationSchema: yup.object().shape({
            name: yup.string().required('Required'),
            nhsNumber: yup.string().required('Required'),
            gender: yup.string().required('Required'),
            dob: yup.string().required('Required'),
            address: yup.string().required('Required')
        }),
        onSubmit: (values: Partial<ExampleItem>) => {
            if (editingItem) {
                dispatch(updateExampleItem(values));
            } else {
                dispatch(createExampleItem(values));
            }
        }
    });

    return (
        <Form onSubmit={formik.handleSubmit} focusOnFirstElement={false}>
            <TextField {...getFieldProps(formik, 'name')} label="Name" placeholder="Name" />
            <TextField {...getFieldProps(formik, 'nhsNumber')} label="NHS Number" placeholder="NHS Number" />
            <Select
                {...getFieldProps(formik, 'gender')}
                label="Gender"
                data={[
                    { value: 'Male', label: 'Male' },
                    { value: 'Female', label: 'Female' }
                ]}
                dataValue="value"
                dataLabel="label"
                placeholder="Please select"
            />
            <DateInput {...getFieldProps(formik, 'dob')} label="Date of Birth" />

            <TextArea {...getFieldProps(formik, 'address')} label="Address" placeholder="Address" maxLength={500} />

            <FormFooter
                entityId="Note"
                onCancel={() => dispatch(closeForm())}
                onDelete={
                    editingItem
                        ? () => {
                              dispatch(deleteExampleItem(editingItem));
                          }
                        : undefined
                }
                submitRequest={{
                    isPending: itemStatus === 'creating' || itemStatus === 'updating',
                    hasError: itemStatus === 'creatingError' || itemStatus === 'updatingError'
                }}
                deleteRequest={{
                    isPending: itemStatus === 'deleting',
                    hasError: itemStatus === 'deletingError'
                }}
            />
        </Form>
    );
};

export default ExampleForm;
