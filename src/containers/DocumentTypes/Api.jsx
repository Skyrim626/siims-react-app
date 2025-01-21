import { getRequest, postRequest } from "../../api/apiHelpers";

export const post = async ({
  payload = {},
  setStates = {},
  resetForm,
  authorizeRole,

  setRows,
}) => {
  // Set Loading State
  setStates.setLoading(true);

  try {
    // Make the POST request
    const response = await postRequest({
      data: payload,
      url: "/api/v1/document-types",
      params: {
        requestedBy: authorizeRole,
      },
    });

    if (response) {
      // console.log(response.data);

      setStates.setRows((prevData) => [...prevData, response.data]);
      setStates.setIsOpen(false);
      setStates.setErrors({});
    }

    // Resets the Form
    if (resetForm) {
      resetForm();
    }
  } catch (error) {
    console.error(error);
  } finally {
    setStates.setLoading(false);
  }
};
