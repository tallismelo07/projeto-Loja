export async function fetchUsers() {
    const response = await fetch('https://dummyjson.com/users');
    return (await response.json()).users;
  }
  
  export async function fetchProducts() {
    const response = await fetch('https://dummyjson.com/products');
    return (await response.json()).products;
  } 