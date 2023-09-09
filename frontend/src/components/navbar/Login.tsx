import { Button, Nav } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import LOCAL_STORAGE_KEYS from '../../constants/local_storage'
import { removeAccount, removeToken } from '../../redux/user/slice'
import Colors from '../../constants/color'
let linkStyle = {
	display: 'flex',
	alignItems: 'center',
	color: Colors.NavyBlue,
}
export default function isLogin({ account, dispatch }: any) {
	const navigate = useNavigate()
	return (
        <>
        <style type="text/css">
				{`
            .btn-login {
			height:3em;
            color: ${Colors.BlueGreen};
			background-color: ${Colors.DarkBlue};
			border:none;
			text-align:left;
            }
            .btn-login:hover {
                color: ${Colors.BabyBlue};
				background-color: ${Colors.DarkBlue};
            }
			.btn-login:focus{
				color: ${Colors.BabyBlue};
				background-color: ${Colors.DarkBlue};
			}
    `}
			</style>
		<Nav>
			{account ? (
					<Button
						className='btn-login'
						onClick={() => {
							localStorage.removeItem(
								LOCAL_STORAGE_KEYS.TOKEN_KEY
							)
							dispatch(removeToken())
							dispatch(removeAccount())
							navigate('/')
						}}
					>
						Log Out
					</Button>
			) : (
				<>
					<Nav.Link
						to="/signin"
						as={NavLink}
						style={linkStyle}
						className="d-flex align-items-center"
					>
						Sign In
					</Nav.Link>
					<Nav.Link
						to="/signup"
						as={NavLink}
						style={linkStyle}
						className="d-flex align-items-center"
					>
						Sign Up
					</Nav.Link>
				</>
			)}
		</Nav>
        </>
	)
}
