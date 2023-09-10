import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import APIS from '../../constants/api'
import client from '../../client/axios'

export default function Input({setSearchText, onSubmit}:any) {
	return (
		<Form
			onSubmit={onSubmit}
			className="w-100 d-flex flex-row"
		>
			<Form.Control
				onChange={(e) => {
					setSearchText(e.target.value)
				}}
				type="text"
				placeholder="Enter name of conversation"
				aria-label="Search"
			/>
			<Button type='submit'>OK</Button>
		</Form>
	)
}
