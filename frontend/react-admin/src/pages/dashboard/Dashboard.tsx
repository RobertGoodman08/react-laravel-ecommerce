import React, {Component} from 'react'
import Wrapper from "../../secure/Wrapper";
import c3 from 'c3';
import axios from "axios";


class  Dashboard extends Component {

    // componentDidMount = async () => {
    //     let chart = c3.generate({
    //         bindto: '#chart',
    //         data: {
    //             x: 'x',
    //             columns: [
    //                 ['x'],
    //                 ['Sales'],
    //             ],
    //             types: {
    //                 Sales: 'bar'
    //             }
    //         },
    //         axis: {
    //             x: {
    //                 type: 'timeseries',
    //                 tick: {
    //                     format: '%Y-%m-%d'
    //                 }
    //             }
    //         }
    //     });
    //     const response = await axios.get('http://127.0.0.1:8000/api/chart')
    //
    //     const records: {data: string, sum: number}[] = response.data.data;
    //
    //     chart.load({
    //         columns: [
    //             ['x', ...records.map(r => r.data)],
    //             ['Sales', ...records.map(r => r.sum)]
    //         ]
    //     })
    //
    // }


    render() {
        return (
            <Wrapper>
                <h2>Daily Sales</h2>

                <div id="chart" />
            </Wrapper>
        )
    }



}


export default Dashboard;