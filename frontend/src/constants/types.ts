export interface Account {
	uuid:string
	username: string
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
export interface Conversation {
	conversation_uuid: string | undefined,
	name: string | undefined,
	content: string | undefined,
	from_member_name: string | undefined,
	is_message_owner: boolean | undefined,
	created_at: string | undefined,
}