const dev = {
    BASE_URL: 'http://127.0.0.1:8000/api/influencer',
    CHECKOUT_URL: 'http://localhost:3002'
}


const prod = {
    BASE_URL: '',
    CHECKOUT_URL: ''
}


export default  {
    ...(process.env.REACT_APP_ENV === 'development' ? dev : prod)
};