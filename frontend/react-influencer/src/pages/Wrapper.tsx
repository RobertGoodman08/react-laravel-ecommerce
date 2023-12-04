import React, {ReactNode} from 'react';
import Nav from "../components/Nav";
import Header from "../components/Header";

interface WrapperProps {
    children?: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    return (
        <>
            <Nav />
            <main>

                <Header />

                <div className="album py-5 bg-body-tertiary">
                    <div className="container">

                        {children}

                    </div>
                </div>

            </main>
        </>
    )
}


export default Wrapper