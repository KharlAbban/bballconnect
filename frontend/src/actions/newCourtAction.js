export const newCourtAction = async ({request}) => {
    const formData = await request.formData();
    const items = Object.fromEntries(formData);
    console.log(items);
}