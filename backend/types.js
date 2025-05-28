const zod=require("zod");
const createTodo=(title,description)=>{
    const schema=zod.object({
        title:zod.string(),
        description:zod.string(),
    });
    const validation=schema.safeParse({ title, description });
    if (!validation.success) {
        return { success: false, error: validation.error.errors };
    }
    return { success: true, data: validation.data };
}
const updateTodo=(id)=>{
    const schema=zod.object({
        id:zod.string()
    });
    const validation=schema.safeParse({ id });
    if (!validation.success) {
        return { success: false, error: validation.error.errors };
    }
    return { success: true, data: validation.data };
}
module.exports={ createTodo,updateTodo };