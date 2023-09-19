import { Button, Form } from 'react-bootstrap'

export default function Input({button ,placeholder, setValue, onSubmit}:any) {
	return (
		<Form
			onSubmit={onSubmit}
			className="h-100 w-100 d-flex flex-row"
		>
			<Form.Control
				onChange={(e) => {
					setValue(e.target.value)
				}}
				type="text"
				placeholder={placeholder}
				aria-label="Input"
			/>
			<Button type='submit'>{button}</Button>
		</Form>
	)
}
