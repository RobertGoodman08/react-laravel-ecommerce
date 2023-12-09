import React, {useEffect} from "react";
import Wrapper from "../components/Wrapper";
import {useRouter} from "next/router";
import axios from "axios";



const Success = () => {
    const router = useRouter();
    const {soruce} = router.query;


    useEffect( () => {
        if(soruce !== undefined) {
            async () => {
                await axios.post(`http://127.0.0.1:8000/api/checkout/orders/confirm`, {
                   source: soruce
                });
            }
        }
    }, [soruce]);


    return (
        <Wrapper>
            <div className="container">
                <div className="py-5 text-center">
                    <h2>Success</h2>
                    <p className="lead">Your purchase has been completed!</p>
                </div>
            </div>
        </Wrapper>
    )
}

export default Success;