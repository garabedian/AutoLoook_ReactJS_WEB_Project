import Backendless from 'backendless';

const APP_ID = 'BC62E6F1-0281-1D6A-FF35-E49866C52C00';
const API_KEY = '0A2C97B8-C7C4-473E-AE22-A95187CC1661';
Backendless.initApp(APP_ID, API_KEY);

export const BackendlessAPI = () => {
    return [APP_ID, API_KEY];
};

export default Backendless;