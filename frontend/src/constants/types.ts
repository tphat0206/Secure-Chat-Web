export interface Account {
	uuid:string
	username: string
	first_name:string
	last_name:string
	email:string
	total_uploaded_course:string
	date_joined:string
}

export interface User {
	token: string | undefined
	account: Account | undefined
}

export interface SigninCredentails {
	username: string
	password: string
	remember: boolean
}

export interface Pagination<T> {
	count: number,
	results: T[]
}

export interface Category {
	uuid:string
	name: string
	creater: Account
	created_by_system: boolean
}

export interface Course {
	uuid: string
	name: string
	price: number
	tutor: Account
	cover_image: string
	description: string
}

export interface Group {
	conversation_uuid: string,
	name: string,
	from_member_name: string,
	is_message_owner: boolean,
	created_at: string,
}