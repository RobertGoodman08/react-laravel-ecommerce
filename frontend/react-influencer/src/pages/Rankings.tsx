import React, {useEffect, useState} from "react";
import Wrapper from "./Wrapper";
import axios from "axios";



const Rankings = () => {
    const [rankings, setRankings] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/influencer/ranking')
                setRankings(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <Wrapper>
            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="table-responsive">
                        <table className="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                            {rankings.map((r: {name: string, revenue: number }, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{r.name}</td>
                                        <td>{r.revenue}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}


export default Rankings;