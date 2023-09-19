export default interface Message {
    uuid: string,
    is_owned: boolean ,
    from_member: string,
    created_at: string,
    updated_at: string,
    is_unsent: boolean
    is_removed: boolean,
    is_system_message: boolean,
    content: string,
    conversation: string,
}
