import { SetStateAction, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useAppDispatch } from '../../redux/store';
import { setGroup } from '../../redux/chat/slice';
import { Group } from '../../constants/types';
import client from '../../client/axios';
import APIS from '../../constants/api';


export default function SideBar() {

	// const [groups, setGroups] = useState<Group>();

	//TODO: lấy groups từ response
	// useEffect(() => {
	// 	client.get<Group>(APIS.GET_GROUPS).then((response) => {
	// 		setGroups(response.data)
	// 	})
	// });

	const groups: Group[] = [
		{
			uuid: "abasdjksal",
			name: "Group A",
		},
		{
			uuid: "wqoejsknf",
			name: "Group B",
		},
		{
			uuid: "nmsosdcinds",
			name: "Group C",
		},
	]


	const handleSelect = (group: any) => {
		console.log("Click group " + group)
		const dispatch = useAppDispatch()
		dispatch(setGroup(group))
	}

	return (
			<div className="col col-sm-3 bg-sidebar border-end border-4">
				<Container>
					<Row className='justify-content-between my-3'>
						<Col>
						<h2>Chats</h2>
						</Col>
						<Col>
						<Button>
							New conversation
						</Button>
						</Col>
						</Row>
				
				{groups.map((group) => (
					<div className='my-3 mx-3 fs-5' key={group.uuid} onClick={() => handleSelect(group.uuid)}>
						{group.name}
					</div>
				))}
				</Container>
				
			</div>
	)
}
