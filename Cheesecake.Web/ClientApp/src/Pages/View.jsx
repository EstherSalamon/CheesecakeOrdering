import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const View = () => {

    const { id } = useParams();
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadData = async () => {
            const { data } = await axios.get(`/api/cheesecake/byid?id=${id}`);
            setOrder(data);
        };

        loadData();
        setLoading(false);

    }, []);

    function formatDate(string) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([], options);
    };

    function GetTotal() {
        if (order.toppings) {
            const chosenToppings = order.toppings.split(', ');
            let total = (49.99 + (chosenToppings.length * 3.95)) * order.amount;
            return total.toFixed(2);
        }

    };

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    } else {
        return (
            <div className='container' style={{ marginTop: 80 }}>
                <div className=' col-md-4 offset-4'>
                    <div className='card bg-light text-center'>
                        <h4 className='card-header'>Order for {order.name}</h4>
                        <div className='card-body justify-content-center'>
                            <h6>{order.email}</h6>
                            <h6>{order.baseFlavor}</h6>
                            <h6>{order.toppings}</h6>
                            <h6>{order.specialInstructions}</h6>
                            <h6>{order.amount}</h6>
                            <h6>{formatDate(order.deliveryDate)}</h6>
                            <h6>${GetTotal()}</h6>
                        </div>
                        <div className='card-footer'>
                            <a href='/viewall' className='btn btn-primary w-100'>Back to Orders</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default View;