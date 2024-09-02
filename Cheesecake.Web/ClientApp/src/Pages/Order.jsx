import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Order = () => {

    const [cheesecake, setCheesecake] = useState({
        name: '',
        email: '',
        baseFlavor: '',
        toppings: '',
        specialInstructions: '',
        amount: '',
        deliveryDate: ''
    });
    const [chosenToppings, setChosenToppings] = useState([]);
    const [formValid, setFormValid] = useState(false);
    const baseFlavors = ['Classic', 'Chocolate', 'Red Velvet', 'Brownie'];
    const toppings = ['Almonds', 'Caramel Drizzle', 'Caramelized Bananas', 'Chocolate Chips', 'Cookie Dough',
        'Dark Chocolate Drizzle', 'Graham Cracker Crumble', 'Mint Chocolate Chips', 'Peanut Butter Drizzle', 'Pecans',
        'Powdered Sugar', 'Rainbow Sprinkles', 'Toasted Coconut', 'Whipped Cream', 'White Chocolate Shavings'];
    const navigate = useNavigate();

    useEffect(() => {
        const checkForm = cheesecake.name && cheesecake.email && cheesecake.baseFlavor && cheesecake.amount && cheesecake.deliveryDate;
        setFormValid(checkForm);

    }, [cheesecake]);

    const onTextChange = e => {
        const copy = { ...cheesecake };
        copy[e.target.name] = e.target.value;
        setCheesecake(copy);
        GetTotal();
    };

    const onToppingsChange = topping => {
        let copy = [];
        if (chosenToppings.includes(topping)) {
            copy = chosenToppings.filter(t => t !== topping);
            setChosenToppings(copy);
        } else {
            copy = [...chosenToppings];
            copy.push(topping);
            setChosenToppings(copy);
        }

        let toppingsString = '';
        copy.forEach((t, index) => {
            if (index === 0) {
                toppingsString += `${t}`
            } else {
                toppingsString += `, ${t}`
            }
        });
        const copy2 = { ...cheesecake };
        copy2.toppings = toppingsString;
        setCheesecake(copy2);
        GetTotal();
    };

    const onSubmitClick = async () => {
        await axios.post('/api/cheesecake/add', {cheesecake});
        navigate('/success');
    };

    function formatDate(string) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([], options);
    };

    function GetTotal() {
        if (cheesecake.baseFlavor) {
            const { amount } = cheesecake;
            let total = 49.99 + (chosenToppings.length * 3.95);
            if (amount) {
                total *= amount;
            }
            return total.toFixed(2);
        } else {
            return '0.00';
        }

    };

    return (
        <div className='container' style={{ marginTop: 80 }, { backgroundColor: 'darkmagenta' }}>
            <div className='col-md-6 offset-3'>
                <br />
                <h1 style={{ color: 'white' }}>Cheesecake Ordering Form</h1>
                <hr style={{ color: 'white' }} />
            </div>
            <div className='row'>
                <div name='form' className='col-md-6' style={{ color: 'white' }}>
                    <h6>Name</h6>
                    <input type='text' className='form-control' name='name' value={cheesecake.name} onChange={e => onTextChange(e)} />
                    <br />
                    <h6>Email</h6>
                    <input type='text' className='form-control' name='email' value={cheesecake.email} onChange={e => onTextChange(e)} />
                    <br />
                    <h6>Cheesecake Base Flavor ($49.99)</h6>
                    <select name='baseFlavor' onChange={e => onTextChange(e)} className='form-control'>
                        <option>--Choose--</option>
                        {baseFlavors.map((b, index) => {
                            return (<option key={index}>{b}</option>)
                        })}
                    </select>
                    <br />
                    <h6>Toppings (each topping adds an additional $3.95)</h6>
                    {toppings.map((t, index) => {
                        return (<h6 key={index}>
                            <input type='checkbox' checked={chosenToppings.includes(t)} onChange={_ => onToppingsChange(t)} />
                            {'     '} {t}
                        </h6>)
                    })}
                    <br />
                    <h6>Special Instructions</h6>
                    <textarea className='form-control' name='specialInstructions' rows='5' onChange={e => onTextChange(e)}></textarea>
                    <br />
                    <h6>Quantity</h6>
                    <input type='number' name='amount' className='form-control' value={cheesecake.amount} onChange={e => onTextChange(e)} min='1' />
                    <br />
                    <h6>Delivery Date</h6>
                    <input type='date' name='deliveryDate' className='form-control' value={cheesecake.deliveryDate} onChange={e => onTextChange(e)} />
                    <br />
                    <button className='btn btn-outline-light mt-2 w-100' disabled={!formValid} onClick={onSubmitClick}>Submit Order</button>
                    <br />
                    <br />
                </div>
                <div name='preview' className='col-md-4 offset-8'>
                    <div className='card'>
                        <div className='card-header'>
                            <h3>Live Preview</h3>
                        </div>
                        <img src='pic1.png' />
                        <div className='card-body'>
                            <h5>Your custom cheesecake</h5>
                            <h6 className='mt-2'>Base: {cheesecake.baseFlavor}</h6>
                            <h6 className='mt-2'>Toppings: {cheesecake.toppings}</h6>
                            <h6 className='mt-2'>Special Instructions: {cheesecake.specialInstructions}</h6>
                            <h6 className='mt-2'>Quantity: {cheesecake.amount}</h6>
                            <h6 className='mt-2'>Delivery Date: {cheesecake.deliveryDate ? formatDate(cheesecake.deliveryDate) : ''}</h6>
                            <h5>Total: ${GetTotal()}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Order;
