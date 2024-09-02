import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewOrders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadData = async () => {
            const { data } = await axios.get('/api/cheesecake/getall');
            setOrders(data);
            setLoading(false);
        };

        loadData();

    }, []);

    function formatDate(string) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([], options);
    };

    function GetTotal(toppingsString, amount) {
        const chosenToppings = toppingsString.split(', ');
        let total = (49.99 + (chosenToppings.length * 3.95)) * amount;
        return total.toFixed(2);
    };

    return (
        <div className='container' style={{marginTop: 80} }>
            {loading ? <h1>Loading...</h1> : 
                <>
                    <h1>These are all orders</h1>
                    <table className='table table-striped table-hover'>
                        <thead>
                            <tr>
                                <th>Name/Email</th>
                                <th>Base Flavor</th>
                                <th>Toppings</th>
                                <th>Special Requests</th>
                                <th>Quantity</th>
                                <th>Delivery Date</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders && orders.map(o =>
                                <tr key={o.id}>
                                    <td>
                                        <a href={`/view/${o.id}`}>{o.name} - {o.email}</a>                                        
                                    </td>
                                    <td>{o.baseFlavor}</td>
                                    <td>{o.toppings}</td>
                                    <td>{o.specialInstructions}</td>
                                    <td>{o.amount}</td>
                                    <td>{formatDate(o.deliveryDate)}</td>
                                    <td>${GetTotal(o.toppings, o.amount)}</td>
                                </tr>)}
                        </tbody>
                    </table>
                </>}
            
        </div>
    );
};

export default ViewOrders;