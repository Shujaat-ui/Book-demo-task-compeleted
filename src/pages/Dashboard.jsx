import { useEffect, useState } from "react";
import { getBooks, addBook, updateBook, deleteBook } from "../services/api";
import BookForm from "../components/BookForm";
import useIsMobile from "../hooks/useIsMobile"; // 👈 apne hook ko import karo

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const isMobile = useIsMobile(); // 👈 yaha se pata chalega mobile hai ya desktop

  const fetchData = async () => {
    setLoading(true);
    const data = await getBooks();
    setBooks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddBook = async (data) => {
    await addBook(data);
    setShowForm(false);
    fetchData();
  };

  const handleUpdateBook = async (data) => {
    await updateBook(editingBook._id, data);
    setEditingBook(null);
    setShowForm(false);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await deleteBook(id);
      fetchData();
    }
  };

  // filters
  const filteredBooks = books
    .filter(
      (b) =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase())
    )
    .filter((b) => (statusFilter ? b.status === statusFilter : true));

  // pagination
  const totalPages = Math.ceil(filteredBooks.length / pageSize);
  const paginatedBooks = filteredBooks.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 container py-3">
        <div className="d-flex align-items-center mb-3">
          <div className="flex-grow-1 text-center">
            <h2 className="mb-0">📚 Book Dashboard Management System</h2>
          </div>
          <button
            onClick={() => {
              setEditingBook(null);
              setShowForm(true);
            }}
            className="btn btn-primary ms-auto"
          >
            ➕ Add Book
          </button>
        </div>

        {/* Search + Filter */}
        <div className="row mb-3">
          <div className="col-md-8 col-12 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Title/Author"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-4 col-12">
            <select
              className="form-control"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Available">Available</option>
              <option value="Issued">Issued</option>
            </select>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="panel panel-danger mb-4">
            <div className="panel-heading text-center">
              <h3 className="panel-title">
                {editingBook ? "Edit Book" : "Add New Book"}
              </h3>
            </div>
            <div className="panel-body">
              <BookForm
                onSubmit={editingBook ? handleUpdateBook : handleAddBook}
                initialData={editingBook}
                onCancel={() => {
                  setShowForm(false);
                  setEditingBook(null);
                }}
              />
            </div>
          </div>
        )}

        {loading ? (
          <p>Loading books...</p>
        ) : (
          <>
            {/* IF ELSE rendering */}
            {!isMobile ? (
              // ✅ Desktop Table
              <div className="table-responsive">
                <table className="table table-bordered table-striped text-center">
                  <thead className="thead-dark">
                    <tr>
                      <th>Sr No</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Genre</th>
                      <th>Year</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedBooks.length === 0 ? (
                      <tr>
                        <td colSpan="7">No books found</td>
                      </tr>
                    ) : (
                      paginatedBooks.map((book, index) => (
                        <tr key={book._id}>
                          <td>{(page - 1) * pageSize + index + 1}</td>
                          <td>{book.title}</td>
                          <td>{book.author}</td>
                          <td>{book.genre}</td>
                          <td>{book.year}</td>
                          <td>{book.status}</td>
                          <td>
                            <button
                              onClick={() => {
                                setEditingBook(book);
                                setShowForm(true);
                              }}
                              className="btn btn-success btn-sm me-1 mb-1"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(book._id)}
                              className="btn btn-danger btn-sm mb-1"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              // ✅ Mobile Cards
            <div>
  {paginatedBooks.length === 0 ? (
    <p>No books found</p>
  ) : (
    paginatedBooks.map((book, index) => (
      <div
        key={book._id}
        className="card mb-3 border border-dark shadow-sm"
        style={{ backgroundColor: "#f9f9f9" }}
      >
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            {book.title}{" "}
            <span className="badge bg-secondary">{book.status}</span>
          </h5>
          <span className="badge bg-light text-dark">
            Sr No{(page - 1) * pageSize + index + 1}
          </span>
        </div>

        <div className="card-body">
          <p className="card-text mb-2">
            <strong>Author:</strong> {book.author} <br />
            <strong>Genre:</strong> {book.genre} <br />
            <strong>Year:</strong> {book.year}
          </p>

          <div className="d-flex">
            <button
              onClick={() => {
                setEditingBook(book);
                setShowForm(true);
              }}
              className="btn btn-success btn-sm me-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(book._id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ))
  )}
</div>


            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <nav className="d-flex justify-content-center mt-3">
                <ul className="pagination flex-wrap">
                  <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => page > 1 && setPage(page - 1)}
                    >
                      « Prev
                    </button>
                  </li>
                  {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map(
                    (p) => (
                      <li
                        key={p}
                        className={`page-item ${page === p ? "active" : ""}`}
                      >
                        <button className="page-link" onClick={() => setPage(p)}>
                          {p}
                        </button>
                      </li>
                    )
                  )}
                  <li
                    className={`page-item ${
                      page === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => page < totalPages && setPage(page + 1)}
                    >
                      Next »
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}
      </main>
    </div>
  );
}
