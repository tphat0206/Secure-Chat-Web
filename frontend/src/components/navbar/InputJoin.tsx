import { Button, Form } from 'react-bootstrap'

export default function InputJoin({setSearchText, onSubmit}:any) {
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
				placeholder="Enter invite code"
				aria-label="Search"
			/>
			<Button type='submit'>OK</Button>
		</Form>
	)
}
