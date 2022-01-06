async function getData() {
const newData = await JSON.parse(data);
return newData;
}

export const dataForRender = await getData();
