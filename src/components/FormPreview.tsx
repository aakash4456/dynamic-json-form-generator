import React from "react";

interface Option {
  value: string;
  label: string;
}

interface Field {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: Option[];
  pattern?: string;
  validation?: {
    message: string;
  };
}

interface FormPreviewProps {
  schema: {
    formTitle: string;
    formDescription: string;
    fields: Field[];
  };
  formData: Record<string, any>; // The data entered by the user
  onFieldChange: (id: string, value: any) => void; // Handler to change field data
  validationErrors: Record<string, string>; // Validation error messages
}

const FormPreview: React.FC<FormPreviewProps> = ({
  schema,
  formData,
  onFieldChange,
  validationErrors,
}) => {
  return (
    <div className="p-4 dark:bg-gray-800 dark:text-white">
  <h2 className="text-2xl font-bold mb-2 text-center md:text-left">{schema.formTitle}</h2>
  <p className="text-lg mb-4 text-center md:text-left">{schema.formDescription}</p>

  <form className="space-y-4">
    {schema.fields.map((field) => {
      const error = validationErrors[field.id];

      switch (field.type) {
        case "text":
        case "email":
        case "textarea":
          return (
            <div key={field.id} className="mb-4">
              <label htmlFor={field.id} className="block text-sm font-medium">
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.id}
                placeholder={field.placeholder}
                value={formData[field.id] || ""}
                required={field.required}
                className="w-full p-2 border rounded-md dark:text-gray-900"
                onChange={(e) => onFieldChange(field.id, e.target.value)}
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
            </div>
          );
        case "select":
          return (
            <div key={field.id} className="mb-4">
              <label htmlFor={field.id} className="block text-sm font-medium">
                {field.label}
              </label>
              <select
                id={field.id}
                value={formData[field.id] || ""}
                required={field.required}
                className="w-full p-2 border rounded-md dark:text-black"
                onChange={(e) => onFieldChange(field.id, e.target.value)}
              >
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {error && <div className="text-red-500 text-sm">{error}</div>}
            </div>
          );
        case "radio":
          return (
            <div key={field.id} className="mb-4">
              <label className="block text-sm font-medium">{field.label}</label>
              <div>
                {field.options?.map((option) => (
                  <label key={option.value} className="inline-flex items-center mr-4">
                    <input
                      type="radio"
                      name={field.id}
                      value={option.value}
                      checked={formData[field.id] === option.value}
                      required={field.required}
                      onChange={(e) => onFieldChange(field.id, e.target.value)}
                      className="mr-2"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
            </div>
          );
        default:
          return null;
      }
    })}
  </form>
</div>

  );
};

export default FormPreview;
