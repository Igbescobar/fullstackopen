import { useState } from "react"

const LoginForm = ({ createLogin }) => {
    const [username, setUsername] = useState([])
    const [password, setPassword] = useState([])

    const handleLogin = (event) => {
        event.preventDefault()

        createLogin({
            username: username,
            password: password,
        })

        setUsername('')
        setPassword('')
    }
    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        id="username"
                        type="text"
                        value={username}
                        name='Username'
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        id="password"
                        type="text"
                        value={password}
                        name='Password'
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button id="login-button" type='submit'>login</button>
            </form>
        </div>
    )
}

export default LoginForm