import React from 'react';

export const useFetchData = () => {
    const [data, setData] = React.useState([]);
    const [error, setErrorMessage] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    React.useMemo(() => {

        setIsLoading(true);

        async function getData() {
            await fetch('http://localhost:3001/api/users')
            .then((res) => {
                console.log(res);
                return res.json()
            })
            .then((data) => setData(data.users))
                .catch((error) => {
                    setErrorMessage(error.message)
                })
        };

        getData();

    }, [])


    return {data, error, isLoading};
}