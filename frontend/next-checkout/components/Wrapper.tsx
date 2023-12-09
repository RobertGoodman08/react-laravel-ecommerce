import React, {ReactNode} from "react";
import Head from 'next/head';


interface WrapperProps {
    children?: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    return (
        <div>
            <Head>
                <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
                    crossOrigin="anonymous"
                />
            </Head>

            <div className="container">
                {children}
            </div>
        </div>
    )
}

export default Wrapper;