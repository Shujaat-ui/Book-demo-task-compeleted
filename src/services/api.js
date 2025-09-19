const BASE_URL = "https://crudcrud.com/api/bfd84f5261854333a23165f925d02541/books"; 
// 👆 apna crudcrud endpoint lagana (24hr valid hota hai)

export const getBooks = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
};

export const addBook = async (book) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error("Failed to add book");
  return res.json();
};

export const updateBook = async (id, book) => {
  const { _id, ...bookWithoutId } = book;
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookWithoutId),
  });
  if (!res.ok) throw new Error("Failed to update book");
};

export const deleteBook = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete book");
};
