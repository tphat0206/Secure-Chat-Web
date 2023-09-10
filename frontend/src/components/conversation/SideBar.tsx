import { SetStateAction, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { setGroup } from "../../redux/chat/slice";
import { Group } from "../../constants/types";
import client from "../../client/axios";
import APIS from "../../constants/api";
import Colors from "../../constants/color";
import Input from "../navbar/Input";

export default function SideBar() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [search_text, setSearchText] = useState('')
	const onSubmit = (e:Event) =>{
		e.preventDefault()
		client.post(APIS.CREAT_GROUP, {name: search_text}).then((response: any) => {
			const new_group: Group = {
				conversation_uuid: response.data.conversation_uuid,
				name: response.data.name,
				from_member_name: '',
				is_message_owner: false,
				created_at: '',
			}
			setGroups([...groups, new_group]);
		  });
	}
  useEffect(() => {
    client.get<Group[]>(APIS.GET_GROUPS).then((response: any) => {
      setGroups(response.data);
    });
  },[]);
  const [isShow, setIsShow] = useState(false)
  const NewConversation = () =>{
	setIsShow(true)
  }

  return (
	<>
			<style type="text/css">
				{`
			.nav-pills .nav-link.active {
				border-radius: 0.2rem;
				color: ${Colors.DarkBlue};
				background-color: ${Colors.BabyBlue};
				box-shadow: rgb(0 0 0 / 45%) 0px 4px 4px;
			}
			.nav .nav-link{
				color:${Colors.DarkBlue};
				background-color: '#F4F4F4';
			}
			.nav .nav-link:hover{
				background-color: #efefef;
				color: black
			}
    `}
			</style>
    <div className="h-100 col col-sm-3 bg-sidebar border-end border-4">
      <Container>
        <Row className="justify-content-between my-3">
          <Col>
            <h2>Chats</h2>
          </Col>
          <Col>
            <Button onClick={NewConversation}>New conversation</Button>
          </Col>
        </Row>
		{isShow && <Row><Input setSearchText={setSearchText} onSubmit={onSubmit}/></Row>}
		<Row><Input setSearchText={setSearchText} onSubmit={onSubmit}/></Row>
		<ul className="nav nav-link-color-red nav-pills flex-column mb-auto">
        {groups.map((group: Group) => {
          return (
            <li key={group.conversation_uuid} className="nav-item m-1 ">
              <NavLink
                to={`conversation/${group.conversation_uuid}`}
                className="nav-link"
              >
                {group.name}
              </NavLink>
            </li>
          );
        })}
		</ul>
      </Container>
    </div>
	</>
  );
}
