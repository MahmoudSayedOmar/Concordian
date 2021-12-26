const mockPush = jest.fn();
const mockHistoryGoBack = jest.fn();
const mockHistoryReplace = jest.fn();

module.exports = {
    mockPush,
    mockHistoryGoBack,
    mockHistoryReplace,
    useHistory: jest.fn().mockReturnValue({
        push: mockPush,
        replace: mockHistoryReplace,
        goBack: mockHistoryGoBack
    }),
    useLocation: jest.fn().mockReturnValue({ state: {}, search: {} })
};
