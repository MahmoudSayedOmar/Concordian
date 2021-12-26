import { FiltersConfig } from '@crx-dev/hss-react-components';

export const filtersConfig: FiltersConfig = [
    {
        type: 'single-select',
        label: 'Gender',
        name: 'gender',
        values: [
            { value: '', label: 'All' },
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' }
        ]
    }
];
