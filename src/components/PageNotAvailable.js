import React from 'react'
import {Container} from 'reactstrap';

const PageNotAvailable = () => {
    return (
        <Container >
            <h2 className="p-4 text-center">
                This page isn't available
            </h2>
            <h6 className="p-4 text-center">
                The link you followed may be broken, or the page may have been removed.
            </h6>
        </Container>
    )
};

export default PageNotAvailable;
