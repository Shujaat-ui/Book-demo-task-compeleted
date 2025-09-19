import { useForm } from "react-hook-form";

export default function BookForm({ onSubmit, initialData, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialData || {} });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <input
          {...register("title", { required: "Title is required" })}
          placeholder="Title"
          className="form-control"
        />
        {errors.title && <p className="text-danger">{errors.title.message}</p>}
      </div>

      <div className="form-group">
        <input
          {...register("author", { required: "Author is required" })}
          placeholder="Author"
          className="form-control"
        />
        {errors.author && <p className="text-danger">{errors.author.message}</p>}
      </div>

      <div className="form-group">
        <input
          {...register("genre", { required: "Genre is required" })}
          placeholder="Genre"
          className="form-control"
        />
        {errors.genre && <p className="text-danger">{errors.genre.message}</p>}
      </div>

      <div className="form-group">
        <input
          type="number"
          {...register("year", {
            required: "Year is required",
            min: { value: 1500, message: "Enter valid year" },
          })}
          placeholder="Published Year"
          className="form-control"
        />
        {errors.year && <p className="text-danger">{errors.year.message}</p>}
      </div>

      <div className="form-group">
        <select
          {...register("status", { required: "Status is required" })}
          className="form-control"
        >
          <option value="">Select Status</option>
          <option value="Available">Available</option>
          <option value="Issued">Issued</option>
        </select>
      </div>

      <div className="text-right" style={{ marginTop: "15px" }}>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-default"
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
