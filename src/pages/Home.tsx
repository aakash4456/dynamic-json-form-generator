import React, { useState } from "react";
import JsonEditor from "../components/JsonEditor";
import FormPreview from "../components/FormPreview";

const defaultSchema = `{
  "formTitle": "Project Requirements Survey",
  "formDescription": "Please fill out this survey about your project needs",
  "fields": [
    {
      "id": "name",
      "type": "text",
      "label": "Full Name",
      "required": true,
      "placeholder": "Enter your full name"
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "pattern": "^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]+$",
      "placeholder": "you@example.com",
      "validation": {
        "message": "Please enter a valid email address"
      }
    },
    {
      "id": "companySize",
      "type": "select",
      "label": "Company Size",
      "required": true,
      "options": [
        {
          "value": "1-50",
          "label": "1-50 employees"
        },
        {
          "value": "51-200",
          "label": "51-200 employees"
        },
        {
          "value": "201-1000",
          "label": "201-1000 employees"
        },
        {
          "value": "1000+",
          "label": "1000+ employees"
        }
      ]
    },
    {
      "id": "industry",
      "type": "radio",
      "label": "Industry",
      "required": true,
      "options": [
        {
          "value": "tech",
          "label": "Technology"
        },
        {
          "value": "healthcare",
          "label": "Healthcare"
        },
        {
          "value": "finance",
          "label": "Finance"
        },
        {
          "value": "retail",
          "label": "Retail"
        },
        {
          "value": "other",
          "label": "Other"
        }
      ]
    },
    {
      "id": "timeline",
      "type": "select",
      "label": "Project Timeline",
      "required": true,
      "options": [
        {
          "value": "immediate",
          "label": "Immediate (within 1 month)"
        },
        {
          "value": "short",
          "label": "Short-term (1-3 months)"
        },
        {
          "value": "medium",
          "label": "Medium-term (3-6 months)"
        },
        {
          "value": "long",
          "label": "Long-term (6+ months)"
        }
      ]
    },
    {
      "id": "comments",
      "type": "textarea",
      "label": "Additional Comments",
      "required": false,
      "placeholder": "Any other details you'd like to share..."
    }
  ]
}`;

const Home: React.FC = () => {
  const [json, setJson] = useState(defaultSchema);
  const [schema, setSchema] = useState<any | null>(JSON.parse(defaultSchema));
  const [formData, setFormData] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<any>({});  // To store validation errors

  // Function to handle JSON changes and validation
  const handleJsonChange = (newJson: string) => {
    setJson(newJson);
    try {
      const parsed = JSON.parse(newJson);  // Try parsing the JSON
      setSchema(parsed);  // Set the parsed JSON as the schema
      setError(null);  // Clear any previous errors
    } catch (err) {
      setError("Invalid JSON format" + err);  // Catch and set error if invalid JSON
    }
  };

  // Function to validate fields
  const validateField = (id: string, value: string) => {
    let error = "";

    if (id === "name") {
      // Full Name should contain only alphabetical characters and spaces
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(value)) {
        error = "Full Name should only contain letters and spaces.";
      }
    } else if (id === "email") {
      // Email should match the general email format or end with "@gmail.com"
      const emailRegex = /^[^\s@]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;  // General email pattern
      if (!emailRegex.test(value) || !value.endsWith('@gmail.com')) {
        error = "Please enter a valid email address (must end with @gmail.com).";
      }
    }

    return error;
  };

  // Function to handle field input changes
  const handleFieldChange = (id: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [id]: value,
    }));

    // Validate the field and update validation errors
    const error = validateField(id, value);
    setValidationErrors((prevErrors: any) => ({
      ...prevErrors,
      [id]: error,
    }));
  };

  // Function to handle form submission
  const handleSubmit = () => {
    console.log("User Input Data:", formData);
    alert("Data has been Submited!");
  };

  // Function to reset the form and JSON
  const handleReset = () => {
    setFormData({});  // Reset user input data
    setValidationErrors({});  // Clear validation errors
  };

  // Function to download only the JSON text (not the entire schema)
  const handleDownloadJson = () => {
    // Filter the formData to only include fields that have user input
    const userInputData = Object.keys(formData).reduce((acc: any, fieldId: string) => {
      // Include only the fields that have non-empty user input
      if (formData[fieldId]) {
        acc[fieldId] = formData[fieldId];
      }
      return acc;
    }, {});
  
    // Check if userInputData is empty
    if (Object.keys(userInputData).length === 0) {
      alert("Please fill out all fields before downloading!");
      return; // Stop further execution
    }
  
    alert("Data has been submitted!");
  
    // Convert the filtered data to a JSON blob
    const blob = new Blob([JSON.stringify(userInputData, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "user-input.json"; // Set the file name for the downloaded JSON file
    link.click(); // Trigger the download
  };

  return (
    <div className="flex flex-col md:flex-row h-screen dark:bg-gray-800 bg-blue-200">
      {/* Left Section */}
        <div className="w-full md:w-1/2 border-r p-4">
          <JsonEditor json={json} onChange={handleJsonChange} error={error} />
            {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 p-4">
        {schema && !error ? (
        <FormPreview
          schema={schema}
          formData={formData}
          onFieldChange={handleFieldChange}
          validationErrors={validationErrors}
      />
        ) : (
        <div className="text-red-500">Invalid JSON, please fix the errors.</div>
        )}

      {/* Buttons */}
        <div className="mt-4 flex flex-wrap gap-4">
          <button
            onClick={handleSubmit}
            className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
          <button
            onClick={handleReset}
            className="w-full md:w-auto px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition duration-200"
          >
            Reset
          </button>
          <button
            onClick={handleDownloadJson}
            className="w-full md:w-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-200"
          >
            Download JSON
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;