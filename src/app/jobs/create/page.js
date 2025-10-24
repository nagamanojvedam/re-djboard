"use client";

import { useState, useTransition } from "react";

const initialForm = { title: "", company: "", location: "", description: "" }; // [web:43]

export default function CreateJob() {
  const [form, setForm] = useState(initialForm); // [web:43]
  const [fieldErrors, setFieldErrors] = useState({}); // name -> message [web:38]
  const [formError, setFormError] = useState(null); // [web:38]
  const [success, setSuccess] = useState(null); // [web:38]
  const [isPending, startTransition] = useTransition(); // [web:39]

  const handleChange = (e) => {
    const { name, value, validity, validationMessage } = e.target; // [web:44][web:52]
    setForm((prev) => ({ ...prev, [name]: value })); // [web:43]
    // Update error for this field using built-in validity
    if (validity.valid) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined })); // [web:44]
    } else {
      setFieldErrors((prev) => ({ ...prev, [name]: validationMessage })); // [web:52]
    }
    setFormError(null); // [web:38]
    setSuccess(null); // [web:38]
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // [web:43]
    setFormError(null);
    setSuccess(null);

    const formEl = e.currentTarget;
    // Use HTML5 validation first
    if (!formEl.checkValidity()) {
      formEl.reportValidity(); // trigger native messages [web:42]
      // Collect messages for custom rendering too
      const newErrors = {};
      for (const element of Array.from(formEl.elements)) {
        if (element.name && element.willValidate && !element.validity.valid) {
          newErrors[element.name] = element.validationMessage; // [web:44][web:52]
        }
      }
      setFieldErrors(newErrors); // [web:38]
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }); // [web:13]

        if (!res.ok) {
          // Handle non-2xx statuses explicitly [web:53]
          let msg = "Failed to post job."; // [web:26]
          try {
            const data = await res.json();
            if (data?.error) msg = data.error; // [web:26]
            if (data?.fieldErrors)
              setFieldErrors((prev) => ({ ...prev, ...data.fieldErrors })); // server-side field errors [web:41]
          } catch {
            // ignore parse errors, keep default message [web:26]
          }
          setFormError(msg); // [web:26]
          return;
        }

        setSuccess("Job posted successfully."); // [web:39]
        setForm(initialForm); // [web:43]
        setFieldErrors({}); // [web:38]
        formEl.reset(); // reset native validity UI [web:38]
      } catch {
        // Network/CORS errors reject the promise [web:13][web:45]
        setFormError("Network error. Please try again."); // [web:26][web:48]
      }
    });
  };

  return (
    <div className="max-w-md mx-auto min-h-screen p-4">
      <h1 className="text-2xl font-semibold mb-4">Post a Job</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-3"
        noValidate
        aria-describedby="form-status"
      >
        {formError && (
          <div
            id="form-status"
            role="alert"
            className="rounded border border-red-300 bg-red-50 text-red-800 p-2"
          >
            {formError}
          </div>
        )}
        {success && (
          <div
            role="status"
            className="rounded border border-green-300 bg-green-50 text-green-800 p-2"
          >
            {success}
          </div>
        )}

        <div>
          <label htmlFor="title" className="sr-only">
            Job Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Job Title"
            value={form.title}
            onChange={handleChange}
            className={`border p-2 rounded w-full ${
              fieldErrors.title ? "border-red-500" : "border-gray-300"
            }`}
            required
            minLength={2}
            maxLength={100}
            aria-invalid={Boolean(fieldErrors.title)}
            aria-describedby={fieldErrors.title ? "title-error" : undefined}
          />
          {fieldErrors.title && (
            <p id="title-error" className="mt-1 text-sm text-red-600">
              {fieldErrors.title}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="sr-only">
            Company Name
          </label>
          <input
            id="company"
            type="text"
            name="company"
            placeholder="Company Name"
            value={form.company}
            onChange={handleChange}
            className={`border p-2 rounded w-full ${
              fieldErrors.company ? "border-red-500" : "border-gray-300"
            }`}
            required
            minLength={2}
            maxLength={100}
            aria-invalid={Boolean(fieldErrors.company)}
            aria-describedby={fieldErrors.company ? "company-error" : undefined}
          />
          {fieldErrors.company && (
            <p id="company-error" className="mt-1 text-sm text-red-600">
              {fieldErrors.company}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="location" className="sr-only">
            Location
          </label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className={`border p-2 rounded w-full ${
              fieldErrors.location ? "border-red-500" : "border-gray-300"
            }`}
            required
            minLength={2}
            maxLength={100}
            aria-invalid={Boolean(fieldErrors.location)}
            aria-describedby={
              fieldErrors.location ? "location-error" : undefined
            }
          />
          {fieldErrors.location && (
            <p id="location-error" className="mt-1 text-sm text-red-600">
              {fieldErrors.location}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="sr-only">
            Job Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Job Description"
            value={form.description}
            onChange={handleChange}
            className={`border p-2 rounded w-full ${
              fieldErrors.description ? "border-red-500" : "border-gray-300"
            }`}
            rows={5}
            required
            minLength={10}
            maxLength={5000}
            aria-invalid={Boolean(fieldErrors.description)}
            aria-describedby={
              fieldErrors.description ? "description-error" : undefined
            }
          />
          {fieldErrors.description && (
            <p id="description-error" className="mt-1 text-sm text-red-600">
              {fieldErrors.description}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`p-2 rounded text-white ${
            isPending
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isPending ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}
