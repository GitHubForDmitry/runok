import React from 'react';
import Header from "../components/Header";
import Catalog from "./Catalog";

function Wrapper(props) {
    return (
        <div>
            <Header>
                <Catalog />
            </Header>
        </div>
    );
}

export default Wrapper;
