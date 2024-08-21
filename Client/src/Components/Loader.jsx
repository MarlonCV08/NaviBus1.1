import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';

export const Loader = () => {
    return (
        <InfinitySpin
            visible={true}
            width="200"
            color="#7579E7"
            ariaLabel="infinity-spin-loading"
        />
    );
};
