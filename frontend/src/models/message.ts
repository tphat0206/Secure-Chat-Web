export default interface Message {
    // "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    uuid: string,
    // "is_owned": "string",
    is_owned: boolean ,
    // "from_member": "string",
    from_member: string,
    // "created_at": "2023-09-10T05:06:58.170Z",
    created_at: Date,
    // "updated_at": "2023-09-10T05:06:58.170Z",
    updated_at: Date,
    // "is_unsent": true,
    is_unsent: boolean
    // "is_removed": true,
    is_removed: boolean,
    // "is_system_message": true,
    is_system_message: boolean,
    // "content": "string",
    content: string,
    // "conversation": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    conversation: string,
}
