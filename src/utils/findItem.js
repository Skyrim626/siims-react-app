
// Find Itmes by ID 
// Purpose: Only works with array of objects and has an id attribute
const findItemById = (id = "", items = []) => {
  return items.find(item => item.id === id);
}

export default findItemById;