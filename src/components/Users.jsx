import { useState, useEffect } from 'react'
import User from './User'

const Users = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [lastLoadTime, setLastLoadTime] = useState(null)
    const [filter, setFilter] = useState('')

    const fetchWithTimeout = async (url, options, timeout = 3500) => {
        return Promise.race([
            fetch(url, options),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timeout')), timeout)
            ),
        ]);
    };

    // default parameter value: delay = 3
    const fetchData = (delay = 3) => {
        setData([])
        setLoading(true)
        setError(null)
        fetchWithTimeout('https://reqres.in/api/users?delay=' + delay)
            .then(res => res.json())
            .then(json => {
                setData(json.data)
                setLoading(false)
                setLastLoadTime(new Date().toLocaleTimeString())
            })
            .catch(err => {
                setError(err)
                setLoading(false)
            })
    }

    useEffect(() => {
        console.log('useEffect');
        fetchData()
    }, [])

    return (
        <div>
            <h1>Users</h1>
            <div>
                <button onClick={() => fetchData()}>Fetch data with 3 seconds delay</button>
            </div>
            <div>
                <button onClick={() => fetchData(5)}>Fetch data with 5 seconds delay</button>
            </div>
            <div>
                <label>Filter: </label>
                <input type="text" value={filter} onChange={e => setFilter(e.target.value)} />
            </div>
            <p>Last load time: {lastLoadTime}</p>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error.message}</p>}
            <div>
                {data.filter(user => user.first_name.includes(filter) || user.email.includes(filter)).map(user => (
                    <div key={user.id}>
                        <User key={user.id} user={user} />
                    </div>
                ))}
                {/* If no user found, display a message */}
                {data.filter(user => user.first_name.includes(filter) || user.email.includes(filter)).length === 0 && !loading && !error && <p>No user found</p>}
            </div>

        </div>
    )
}

export default Users