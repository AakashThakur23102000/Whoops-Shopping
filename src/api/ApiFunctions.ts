export const APP_VERSION_CHECKER = async (apiCallingFunctionQuery: any) => {
    return {
        fullUrl: "https://whoops-shopping-default-rtdb.firebaseio.com/version.json",
        method: 'GET',
        token: null,
        customHeaders: null,
        successCodeWithAction: null,
        errorCodeWithAction: null
    };
};